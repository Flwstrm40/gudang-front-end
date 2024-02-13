// next.config.js
/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './'),
    };

    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    // API: "http://localhost:5050",
    // API: "http://localhost:42879",
    API: "https://gudang-back-end.vercel.app",
    API2: "https://kasir-belakang.vercel.app"
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https' || 'http',
        hostname: 'localhost' || 'gudang-back-end.vercel.app',
        port: '' || '5050',
        pathname: '/src/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
