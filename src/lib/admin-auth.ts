import { cookies } from "next/headers";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const SESSION_COOKIE = "admin_session";
const SESSION_DURATION_SEC = 60 * 60 * 24 * 7; // 7일

async function getAdminPassword(): Promise<string> {
  const { env } = await getCloudflareContext({ async: true });
  return env.ADMIN_PASSWORD;
}

// 비밀번호 자체를 HMAC키로 사용 — env 비밀번호 변경 시 모든 세션 자동 무효화
async function sign(payload: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

export async function verifyPassword(input: string): Promise<boolean> {
  const expected = await getAdminPassword();
  if (!expected) return false;
  // timing-safe 비교
  if (input.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < input.length; i++) {
    mismatch |= input.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function createSession(): Promise<void> {
  const password = await getAdminPassword();
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION_SEC;
  const payload = `admin.${expiresAt}`;
  const sig = await sign(payload, password);
  const token = `${payload}.${sig}`;
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SEC,
  });
}

export async function destroySession(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [, expiresStr, sig] = parts;
  const expiresAt = Number(expiresStr);
  if (!Number.isFinite(expiresAt) || expiresAt < Math.floor(Date.now() / 1000)) {
    return false;
  }
  const password = await getAdminPassword();
  if (!password) return false;
  const expectedSig = await sign(`admin.${expiresStr}`, password);
  return sig === expectedSig;
}
