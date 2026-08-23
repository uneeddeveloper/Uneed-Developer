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

export async function createTeamMember(formData: FormData) {
  const name = requireString(formData, "name");
  const role = requireString(formData, "role");
  await prisma.teamMember.create({ data: { name, role } });
  revalidatePath("/admin-uneed/tim");
}

export async function updateTeamMember(id: string, formData: FormData) {
  const name = requireString(formData, "name");
  const role = requireString(formData, "role");
  await prisma.teamMember.update({ where: { id }, data: { name, role } });
  revalidatePath("/admin-uneed/tim");
}

export async function deleteTeamMember(id: string) {
  "use server";
  await prisma.teamMember.delete({ where: { id } });
  revalidatePath("/admin-uneed/tim");
}
