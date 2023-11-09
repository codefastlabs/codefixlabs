/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@codefixlabs/lib', '@codefixlabs/ui'],
  },
};

module.exports = nextConfig;
