"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

function requireString(formData: FormData, key: string) {
  const value = formData.get(key);
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${key} wajib diisi`);
  }
  return value.trim();
}

function readOptional(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

/** Every `split_<memberId>` field with a positive amount becomes a
 * TransactionSplit row — fields left at 0 or blank are simply skipped. */
function readSplits(formData: FormData) {
  const splits: { memberId: string; amount: number }[] = [];
  for (const [key, value] of formData.entries()) {
    if (!key.startsWith("split_")) continue;
    const amount = Number(value);
    if (amount > 0) splits.push({ memberId: key.replace("split_", ""), amount });
  }
  return splits;
}

function revalidateAll() {
  revalidatePath("/admin-uneed/pendapatan");
  revalidatePath("/admin-uneed");
  revalidatePath("/admin-uneed/tim");
  revalidatePath("/admin-uneed/projects");
  revalidatePath("/admin-uneed/laporan");
}

export async function createTransaction(formData: FormData) {
  const type = requireString(formData, "type");
  const description = requireString(formData, "description");
  const amount = Number(requireString(formData, "amount"));
  const date = new Date(requireString(formData, "date"));
  const projectId = readOptional(formData, "projectId");
  const splits = type === "income" ? readSplits(formData) : [];

  await prisma.transaction.create({
    data: {
      type,
      description,
      amount,
      date,
      projectId,
      splits: { create: splits },
    },
  });
  revalidateAll();
}

export async function updateTransaction(id: string, formData: FormData) {
  const type = requireString(formData, "type");
  const description = requireString(formData, "description");
  const amount = Number(requireString(formData, "amount"));
  const date = new Date(requireString(formData, "date"));
  const projectId = readOptional(formData, "projectId");
  const splits = type === "income" ? readSplits(formData) : [];

  await prisma.$transaction([
    prisma.transactionSplit.deleteMany({ where: { transactionId: id } }),
    prisma.transaction.update({
      where: { id },
      data: {
        type,
        description,
        amount,
        date,
        projectId,
        splits: { create: splits },
      },
    }),
  ]);
  revalidateAll();
}

export async function deleteTransaction(id: string) {
  "use server";
  await prisma.transaction.delete({ where: { id } });
  revalidateAll();
}
