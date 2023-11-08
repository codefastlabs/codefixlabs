/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@codefixlabs/ui'],
  },
};

module.exports = nextConfig;
