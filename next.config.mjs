/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      serverComponentsExternalPackages: ["@react-pdf/renderer"],
    },
  },
};

export default nextConfig;
