import type { NextConfig } from "next";
import path from "node:path";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// 로컬 dev에서 D1·KV·R2 등 Cloudflare 바인딩에 접근하기 위한 초기화.
// 운영 빌드(opennextjs-cloudflare build)에서는 영향 없음.
initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // Cloudflare Workers 환경에선 Next.js Image Optimizer가 동작하지 않음.
    unoptimized: true,
  },
};

export default nextConfig;
