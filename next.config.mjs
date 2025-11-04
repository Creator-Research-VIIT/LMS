/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Environment variable configuration for deployment
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Ensure environment variables are available at runtime
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
  },
}

export default nextConfig
