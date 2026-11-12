import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "img-res.pitchero.com" },
      { hostname: "images.pitchero.com" },
    ],
  },
};

export default nextConfig;
