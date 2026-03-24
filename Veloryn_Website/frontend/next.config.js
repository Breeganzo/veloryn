/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com'],
  },
  async rewrites() {
    return [
      {
      source: '/api/:path*',
      destination: 'https://veloryn.up.railway.app/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;

