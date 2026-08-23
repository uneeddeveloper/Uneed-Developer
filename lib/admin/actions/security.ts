"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { setMasterKey, verifyMasterKey, generateRandomKey } from "@/lib/admin/master-key";
import { createUnlockToken, UNLOCK_COOKIE, UNLOCK_MAX_AGE } from "@/lib/admin/unlock-token";

async function unlockThisDevice() {
  const token = await createUnlockToken();
  const store = await cookies();
  store.set(UNLOCK_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: UNLOCK_MAX_AGE,
    path: "/",
  });
}

/** First-time setup or rotation — generates a new key, invalidates every
 * device that hasn't re-entered it yet, and unlocks the device doing this. */
export async function generateMasterKey() {
  const rawKey = generateRandomKey();
  await setMasterKey(rawKey);
  await unlockThisDevice();
  return rawKey;
}

export async function unlockDevice(formData: FormData) {
  const rawKey = formData.get("masterKey");
  if (typeof rawKey !== "string" || !rawKey.trim()) {
    return { error: "Master key wajib diisi." };
  }
  const valid = await verifyMasterKey(rawKey.trim());
  if (!valid) {
    return { error: "Master key salah." };
  }
  await unlockThisDevice();
  redirect("/admin-uneed");
}

export async function lockThisDevice() {
  const store = await cookies();
  store.delete(UNLOCK_COOKIE);
  redirect("/admin-uneed/keamanan");
}
