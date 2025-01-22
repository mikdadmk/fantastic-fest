/** @type {import('next').NextConfig} */
require('dotenv').config(); // Import and configure dotenv

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'], // Add Cloudinary domain here
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL, // Expose your environment variables
    API_KEY: process.env.API_KEY,
  },
};

module.exports = nextConfig;
