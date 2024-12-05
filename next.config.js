/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverComponentsExternalPackages: ["@node-rs/argon2"],
};

module.exports = nextConfig;
