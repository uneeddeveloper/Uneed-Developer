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

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Categories feed both /layanan and the Portfolio filter pills — revalidate both. */
function revalidatePublicServicePages() {
  revalidatePath("/layanan");
  revalidatePath("/portfolio");
  revalidatePath("/", "layout");
}

export async function createServiceCategory(formData: FormData) {
  const name = requireString(formData, "name");
  const description = requireString(formData, "description");
  const slug = slugify(name);
  const count = await prisma.serviceCategory.count();
  await prisma.serviceCategory.create({ data: { slug, name, description, order: count } });
  revalidatePath("/admin-uneed/layanan");
  revalidatePublicServicePages();
}

export async function updateServiceCategory(id: string, formData: FormData) {
  const name = requireString(formData, "name");
  const description = requireString(formData, "description");
  await prisma.serviceCategory.update({ where: { id }, data: { name, description } });
  revalidatePath("/admin-uneed/layanan");
  revalidatePublicServicePages();
}

export async function deleteServiceCategory(id: string) {
  "use server";
  // onDelete: Cascade on Service, but PortfolioItem.category is a required
  // relation — block the delete rather than orphaning portfolio rows.
  const inUse = await prisma.portfolioItem.count({ where: { categoryId: id } });
  if (inUse > 0) {
    throw new Error(
      `Kategori ini dipakai oleh ${inUse} item portfolio. Pindahkan kategorinya dulu sebelum menghapus.`
    );
  }
  await prisma.serviceCategory.delete({ where: { id } });
  revalidatePath("/admin-uneed/layanan");
  revalidatePublicServicePages();
}

export async function createService(formData: FormData) {
  const categoryId = requireString(formData, "categoryId");
  const name = requireString(formData, "name");
  const description = requireString(formData, "description");
  const priceRange = formData.get("priceRange");
  const count = await prisma.service.count({ where: { categoryId } });
  await prisma.service.create({
    data: {
      categoryId,
      name,
      description,
      priceRange: typeof priceRange === "string" && priceRange.trim() ? priceRange.trim() : null,
      order: count,
    },
  });
  revalidatePath("/admin-uneed/layanan");
  revalidatePublicServicePages();
}

export async function updateService(id: string, formData: FormData) {
  const categoryId = requireString(formData, "categoryId");
  const name = requireString(formData, "name");
  const description = requireString(formData, "description");
  const priceRange = formData.get("priceRange");
  await prisma.service.update({
    where: { id },
    data: {
      categoryId,
      name,
      description,
      priceRange: typeof priceRange === "string" && priceRange.trim() ? priceRange.trim() : null,
    },
  });
  revalidatePath("/admin-uneed/layanan");
  revalidatePublicServicePages();
}

export async function deleteService(id: string) {
  "use server";
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin-uneed/layanan");
  revalidatePublicServicePages();
}
