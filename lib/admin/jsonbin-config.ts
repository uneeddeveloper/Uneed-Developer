import { prisma } from "@/lib/prisma";

export async function getJsonBinConfig() {
  return prisma.jsonBinConfig.findUnique({ where: { id: 1 } });
}

export async function saveJsonBinConfig({
  masterKey,
  binId,
}: {
  masterKey?: string;
  binId: string;
}) {
  await prisma.jsonBinConfig.upsert({
    where: { id: 1 },
    update: { binId, ...(masterKey ? { masterKey } : {}) },
    create: { id: 1, binId, masterKey: masterKey ?? null },
  });
}

export async function touchLastSync() {
  await prisma.jsonBinConfig.update({ where: { id: 1 }, data: { lastSyncAt: new Date() } });
}
