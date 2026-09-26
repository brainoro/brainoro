/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/v2/:path*',
        destination: 'http://127.0.0.1:8000/api/v2/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
