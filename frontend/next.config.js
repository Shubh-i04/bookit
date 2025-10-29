/**
 * Next.js config with proxy rewrites so frontend and backend live under one domain.
 * Set BACKEND_ORIGIN to your Render backend service URL, e.g. https://bookit-api.onrender.com
 */
const backend = process.env.BACKEND_ORIGIN || 'http://localhost:5000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: '/experiences', destination: `${backend}/experiences` },
      { source: '/experiences/:path*', destination: `${backend}/experiences/:path*` },
      { source: '/bookings', destination: `${backend}/bookings` },
      { source: '/promo/:path*', destination: `${backend}/promo/:path*` },
      { source: '/payment/:path*', destination: `${backend}/payment/:path*` },
    ]
  },
}

module.exports = nextConfig