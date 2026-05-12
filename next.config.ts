import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // Cloudflare Pages 환경에선 Next.js Image Optimizer가 동작하지 않음.
    // R2/Cloudflare Images 로더는 Phase 3에서 도입.
    unoptimized: true,
  },
};

export default nextConfig;
