/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */

const withTM = require("next-transpile-modules")([
  "@blocto/sdk",
  "@solana/wallet-adapter-base",
  "@solana/wallet-adapter-react",
  "@solana/wallet-adapter-wallets",
  "@solana/wallet-adapter-clover",
  "@solana/wallet-adapter-coin98",
  "@solana/wallet-adapter-ledger",
  "@solana/wallet-adapter-phantom",
  "@solana/wallet-adapter-slope",
  "@solana/wallet-adapter-solflare",
  "@solana/wallet-adapter-sollet",
]);

module.exports = withTM(
  withPWA({
    pwa: {
      disable:
        process.env.NODE_ENV === "development" ||
        process.env.NODE_ENV === "preview" ||
        process.env.NODE_ENV === "production",
      // delete two lines above to enable PWA in production deployment
      // add your own icons to public/manifest.json
      // to re-generate manifest.json, you can visit https://tomitm.github.io/appmanifest/
      dest: "public",
      register: true,
    },
    reactStrictMode: true,
    images: {
      domains: ["s3.amazonaws.com"],
    },
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback.fs = false;
      }
      return config;
    },
  })
);
