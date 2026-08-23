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

/** Clients aren't managed on their own screen — typing a name that doesn't
 * exist yet just creates it, matching how the old admin implicitly tracked
 * clients through the project list. */
async function resolveClientId(clientName: string | null) {
  if (!clientName) return null;
  const existing = await prisma.client.findFirst({ where: { name: clientName } });
  if (existing) return existing.id;
  const created = await prisma.client.create({ data: { name: clientName } });
  return created.id;
}

export async function createProject(formData: FormData) {
  const name = requireString(formData, "name");
  const category = requireString(formData, "category");
  const status = requireString(formData, "status");
  const value = Number(requireString(formData, "value"));
  const deadlineRaw = readOptional(formData, "deadline");
  const clientId = await resolveClientId(readOptional(formData, "clientName"));

  await prisma.project.create({
    data: {
      name,
      category,
      status,
      value,
      clientId,
      deadline: deadlineRaw ? new Date(deadlineRaw) : null,
    },
  });
  revalidatePath("/admin-uneed/projects");
  revalidatePath("/admin-uneed");
  revalidatePath("/admin-uneed/laporan");
}

export async function updateProject(id: string, formData: FormData) {
  const name = requireString(formData, "name");
  const category = requireString(formData, "category");
  const status = requireString(formData, "status");
  const value = Number(requireString(formData, "value"));
  const deadlineRaw = readOptional(formData, "deadline");
  const clientId = await resolveClientId(readOptional(formData, "clientName"));

  await prisma.project.update({
    where: { id },
    data: {
      name,
      category,
      status,
      value,
      clientId,
      deadline: deadlineRaw ? new Date(deadlineRaw) : null,
    },
  });
  revalidatePath("/admin-uneed/projects");
  revalidatePath("/admin-uneed");
  revalidatePath("/admin-uneed/laporan");
}

export async function deleteProject(id: string) {
  "use server";
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin-uneed/projects");
  revalidatePath("/admin-uneed");
  revalidatePath("/admin-uneed/laporan");
}
