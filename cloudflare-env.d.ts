// Cloudflare bindings/env typing — `wrangler types`로 자동 생성도 가능하지만
// 우리가 직접 정의하는 바인딩만 명시.
interface CloudflareEnv {
  DB: D1Database;
  BUCKET: R2Bucket;
  ADMIN_PASSWORD: string;
}
