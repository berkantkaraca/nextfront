/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Enable static image optimization
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig 