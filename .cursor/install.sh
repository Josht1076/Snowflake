#!/usr/bin/env bash
#
# Cloud Agent environment install script for the Snowflake Novel Planner.
#
# This runs once after checkout (and, for environment builds, bakes its result
# into the base snapshot). It must be idempotent and terminate successfully.
#
# What it prepares:
#   * Docker Engine + fuse-overlayfs (required because Supabase runs as local
#     containers and this VM is a nested container that cannot use the default
#     overlay2 storage driver).
#   * The Supabase CLI (pinned version).
#   * JavaScript dependencies via pnpm.
#   * Pre-pulled Supabase Docker images and a validated database migration, so
#     that per-boot startup is fast and offline-safe.
set -euo pipefail

SUPABASE_CLI_VERSION="2.114.0"
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_DIR"

echo "[install] Installing system packages (docker, fuse-overlayfs, iptables)..."
export DEBIAN_FRONTEND=noninteractive
sudo apt-get update -qq
# --force-conf* keeps existing config files without an interactive prompt; the
# fuse3 postinst otherwise blocks on a conffile question under a nested VM.
sudo apt-get install -y -qq \
  -o Dpkg::Options::=--force-confdef \
  -o Dpkg::Options::=--force-confold \
  docker.io fuse-overlayfs iptables uidmap || true

echo "[install] Configuring Docker to use the fuse-overlayfs storage driver..."
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json >/dev/null <<'JSON'
{
  "storage-driver": "fuse-overlayfs",
  "features": { "containerd-snapshotter": false }
}
JSON

echo "[install] Installing Supabase CLI v${SUPABASE_CLI_VERSION}..."
if ! command -v supabase >/dev/null 2>&1 || [ "$(supabase --version 2>/dev/null || true)" != "$SUPABASE_CLI_VERSION" ]; then
  tmp="$(mktemp -d)"
  curl -fsSL "https://github.com/supabase/cli/releases/download/v${SUPABASE_CLI_VERSION}/supabase_linux_amd64.tar.gz" -o "$tmp/supabase.tar.gz"
  tar -xzf "$tmp/supabase.tar.gz" -C "$tmp"
  sudo mv "$tmp/supabase" /usr/local/bin/supabase
  rm -rf "$tmp"
fi
echo "[install] Supabase CLI: $(supabase --version)"

echo "[install] Installing JavaScript dependencies with pnpm..."
corepack enable
corepack pnpm install --frozen-lockfile

echo "[install] Pre-pulling Supabase images and validating the database migration..."
# Bring Docker up just long enough to cache the Supabase images and run the
# migration once, so the resulting snapshot boots quickly. The stack is torn
# down again at the end; per-boot startup happens in .cursor/start.sh.
DOCKERD_LOG="/var/log/cursor-dockerd.log"
if ! sudo docker info >/dev/null 2>&1; then
  sudo rm -f /var/run/docker.pid
  sudo bash -c "nohup dockerd >${DOCKERD_LOG} 2>&1 &"
  for _ in $(seq 1 30); do
    sudo docker info >/dev/null 2>&1 && break
    sleep 1
  done
fi
sudo docker info >/dev/null 2>&1 || { echo "[install] Docker failed to start"; sudo tail -n 40 "${DOCKERD_LOG}"; exit 1; }

# Same-bridge container traffic must bypass iptables in this nested VM,
# otherwise the Supabase services cannot reach the database container.
sudo sysctl -w net.bridge.bridge-nf-call-iptables=0 >/dev/null 2>&1 || true
sudo sysctl -w net.bridge.bridge-nf-call-ip6tables=0 >/dev/null 2>&1 || true
sudo chmod 666 /var/run/docker.sock || true

# Clear any stale stack from a previous run before validating a clean start.
supabase stop --no-backup >/dev/null 2>&1 || true
supabase start
supabase stop --no-backup || true

echo "[install] Done."
