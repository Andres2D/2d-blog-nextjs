/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['contrib.rocks']
  },
}

module.exports = nextConfig;
