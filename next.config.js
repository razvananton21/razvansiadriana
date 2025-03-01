/** @type {import('next').NextConfig} */
const nextConfig = {
  // Basic configuration for Next.js
  reactStrictMode: true,
  swcMinify: true,
  
  // Configure webpack to handle PDF files
  webpack: (config) => {
    config.module.rules.push({
      test: /\.pdf$/,
      type: 'asset/resource',
    });
    
    return config;
  },
  
  // GitHub Pages configuration
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  
  // Enable static exports
  output: 'export',
  
  // Images configuration for static export
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig; 