/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prevent ESLint config serialization issues during build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

