import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow unoptimized images for static export compatibility
    unoptimized: true,
  },
};

export default nextConfig;
