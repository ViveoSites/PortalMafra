/** @type {import('next').NextConfig} */
const { defaultLocale, locales } = require('./config/i18n.json')

const cmsBaseUrl = process.env.CMS_BASE_URL
const cmsHostName = new URL(cmsBaseUrl).hostname

const nextConfig = {
  reactStrictMode: true,
  env: {
    siteUrl: process.env.SITE_URL,
    cmsBaseUrl,
    apiBaseUrl: process.env.API_BASE_URL,
    defaultLanguage: defaultLocale,
    nodeEnv: process.env.NODE_ENV,
  },
  i18n: {
    localeDetection: false,
    locales,
    defaultLocale,
  },
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: [cmsHostName, 'picsum.photos', 'futurebrand.dev'],
    deviceSizes: [480, 640, 768, 1024, 1280, 1366, 1440, 1920],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

module.exports = nextConfig
