const { createContentlayerPlugin } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/resume',
        has: [
          {
            type: 'host',
            value: 'resume.qextory.com',
          },
        ],
        destination: '/',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/',
          has: [
            {
              type: 'host',
              value: 'resume.qextory.com',
            },
          ],
          destination: '/resume',
        },
      ],
    };
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

const withContentlayer = createContentlayerPlugin();

module.exports = withContentlayer(nextConfig);
