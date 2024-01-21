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
    API: "http://localhost:42879",
  },
};

module.exports = nextConfig;
