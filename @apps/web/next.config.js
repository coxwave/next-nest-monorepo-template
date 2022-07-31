const withTM = require('next-transpile-modules')([
  '@packages/ui',
  '@packages/vectors',
  '@packages/hooks',
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  async rewrites() {
    return [];
  },
};

module.exports = withTM(nextConfig);
