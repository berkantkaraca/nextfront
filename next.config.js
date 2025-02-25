/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Enable static image optimization
  images: {
    unoptimized: true,
    domains: ['51.20.77.242'],
  },
  async rewrites() {
    return [
      {
        source: '/api/weather',
        destination: 'http://51.20.77.242:5000/WeatherForecast',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' }
        ],
      },
    ]
  },
}

module.exports = nextConfig 