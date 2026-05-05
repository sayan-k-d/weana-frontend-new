import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/product", destination: "/productpage", permanent: false },
      { source: "/products", destination: "/productpage", permanent: false },
      { source: "/products/:path*", destination: "/productpage", permanent: false },
    ];
  },
};

export default nextConfig;
