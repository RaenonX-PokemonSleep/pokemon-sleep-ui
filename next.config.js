const childProcess = require('child_process');


const buildId = childProcess
  .execSync('git show -s --format="%h-%cI"')
  .toString()
  .trim()
  .replaceAll(':', '-');

/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId: () => buildId,
  env: {
    NEXT_PUBLIC_BUILD_ID: buildId,
  },
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development',
  },
  pageExtensions: ['ts', 'tsx'],
};

/** @type {import('@types/next-pwa').PWAConfig} */
const pwaConfig = {
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
};

const withNextI18n = require('next-intl/plugin')();
const withPWA = require('next-pwa')(pwaConfig);


module.exports = withNextI18n(withPWA(nextConfig));
