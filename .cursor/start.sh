#!/usr/bin/env bash
#
# Cloud Agent per-boot start script for the Snowflake Novel Planner.
#
# Runs on every boot (system dependencies and images are already prepared by
# .cursor/install.sh). It must tolerate restarts, avoid duplicate processes,
# reach a ready state, and then return. The Next.js dev server itself runs as a
# long-lived terminal (see .cursor/environment.json), not here.
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_DIR"

DOCKERD_LOG="/var/log/cursor-dockerd.log"
echo "[start] Ensuring the Docker daemon is running..."
if ! sudo docker info >/dev/null 2>&1; then
  sudo rm -f /var/run/docker.pid
  sudo bash -c "nohup dockerd >${DOCKERD_LOG} 2>&1 &"
  for _ in $(seq 1 30); do
    sudo docker info >/dev/null 2>&1 && break
    sleep 1
  done
fi
sudo docker info >/dev/null 2>&1 || { echo "[start] Docker failed to start"; sudo tail -n 40 "${DOCKERD_LOG}"; exit 1; }

# In this nested VM, container-to-container traffic on a user-defined bridge is
# dropped unless same-bridge frames bypass iptables. Without this the Supabase
# auth/rest services time out connecting to the database container.
sudo sysctl -w net.bridge.bridge-nf-call-iptables=0 >/dev/null 2>&1 || true
sudo sysctl -w net.bridge.bridge-nf-call-ip6tables=0 >/dev/null 2>&1 || true

# Allow the agent user to talk to Docker (and thus the Supabase CLI) without sudo.
sudo chmod 666 /var/run/docker.sock || true

echo "[start] Ensuring the Supabase local stack is running..."
if supabase status >/dev/null 2>&1; then
  echo "[start] Supabase already running."
else
  # Clear any stale/half-started containers from a previous boot, then start.
  supabase stop --no-backup >/dev/null 2>&1 || true
  supabase start
fi

echo "[start] Writing .env.local from the local Supabase credentials..."
status_env="$(supabase status -o env)"
api_url="$(printf '%s\n' "$status_env" | grep '^API_URL=' | cut -d'"' -f2)"
pub_key="$(printf '%s\n' "$status_env" | grep '^PUBLISHABLE_KEY=' | cut -d'"' -f2)"
cat > .env.local <<EOF
NEXT_PUBLIC_SUPABASE_URL=${api_url}
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=${pub_key}
EOF

echo "[start] Ready. Supabase API: ${api_url} | Studio: http://127.0.0.1:54323"
