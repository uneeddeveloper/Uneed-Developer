import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function getSecurityStatus() {
  const row = await prisma.appSecurity.findUnique({ where: { id: 1 } });
  return {
    isSet: !!row?.masterKeyHash,
    updatedAt: row?.updatedAt ?? null,
  };
}

export async function setMasterKey(rawKey: string) {
  const masterKeyHash = await bcrypt.hash(rawKey, 10);
  await prisma.appSecurity.upsert({
    where: { id: 1 },
    update: { masterKeyHash },
    create: { id: 1, masterKeyHash },
  });
}

export async function verifyMasterKey(rawKey: string) {
  const row = await prisma.appSecurity.findUnique({ where: { id: 1 } });
  if (!row?.masterKeyHash) return false;
  return bcrypt.compare(rawKey, row.masterKeyHash);
}

export function generateRandomKey() {
  return crypto.getRandomValues(new Uint8Array(24)).reduce((s, b) => s + b.toString(16).padStart(2, "0"), "");
}
