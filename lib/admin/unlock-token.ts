/**
 * Signs/verifies the "this device entered the master key" cookie.
 * Uses Web Crypto (not Node's `crypto` module) so it also runs in the Edge
 * middleware — same edge-safety constraint that split auth.config.ts/auth.ts.
 */
export const UNLOCK_COOKIE = "admin_unlocked";
export const UNLOCK_MAX_AGE = 60 * 60 * 24 * 180; // 180 days

async function hmacKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is not set");
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
}

function toHex(buf: ArrayBuffer) {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createUnlockToken() {
  const payload = String(Date.now());
  const key = await hmacKey();
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return `${payload}.${toHex(sig)}`;
}

export async function verifyUnlockToken(token: string | undefined | null) {
  if (!token) return false;
  const [payload, sigHex] = token.split(".");
  if (!payload || !sigHex) return false;
  const key = await hmacKey();
  const expected = toHex(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload)));
  if (expected.length !== sigHex.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ sigHex.charCodeAt(i);
  return diff === 0;
}
