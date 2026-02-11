import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'media.valorant-api.com',
      },
    ],
    // Explicitly configure qualities to avoid warnings when using non-default qualities
    qualities: [50, 75],
  },
};

export default nextConfig;
