// @ts-check
const childProcess = require('child_process');

const {default: withPWAInit, runtimeCaching} = require('@ducanh2912/next-pwa');
const {PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD} = require('next/constants');


const buildId = childProcess
  .execSync('git show -s --format="%h-%cI"')
  .toString()
  .trim()
  .replaceAll(':', '-');

const isProd = process.env.NODE_ENV !== 'development';

/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId: () => buildId,
  env: {
    NEXT_PUBLIC_BUILD_ID: buildId,
  },
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: isProd,
  },
  pageExtensions: ['ts', 'tsx'],
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
};

/** @type {import('@ducanh2912/next-pwa').PluginOptions} */
const pwaConfig = {
  dest: 'public',
  disable: !isProd,
  register: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: isProd,
    runtimeCaching: runtimeCaching.map((option) => {
      if ('function' === typeof option.urlPattern) {
        return {
          ...option,
          options: {
            ...option.options,
            cacheableResponse: {
              statuses: [200, 302],
            },
          },
        };
      }
      return option;
    }),
  },
};

module.exports = (phase) => {
  const withNextI18n = require('next-intl/plugin')();
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = withPWAInit(pwaConfig);
    return withNextI18n(withPWA(nextConfig));
  }
  return withNextI18n(nextConfig);
};
