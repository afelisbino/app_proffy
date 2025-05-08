/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false }
    return config
  },
  skipTrailingSlashRedirect: true,
  output: 'standalone',
}

module.exports = nextConfig
