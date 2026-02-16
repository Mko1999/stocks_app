import type { NextConfig } from 'next';

const nextConfig = {
  reactCompiler: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
} satisfies NextConfig & Record<string, unknown>;

export default nextConfig;
