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

function revalidatePublicPortfolioPages() {
  revalidatePath("/portfolio");
  revalidatePath("/", "layout");
}

function readOptional(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export async function createPortfolioItem(formData: FormData) {
  const title = requireString(formData, "title");
  const type = requireString(formData, "type");
  const categoryId = requireString(formData, "categoryId");
  const description = requireString(formData, "description");
  const detail = requireString(formData, "detail");
  const image = requireString(formData, "image");
  const link = readOptional(formData, "link");

  let slug = slugify(title);
  const clash = await prisma.portfolioItem.findUnique({ where: { slug } });
  if (clash) slug = `${slug}-${Date.now().toString(36)}`;

  const count = await prisma.portfolioItem.count();
  await prisma.portfolioItem.create({
    data: { slug, title, type, categoryId, description, detail, image, link, order: count },
  });
  revalidatePath("/admin-uneed/portfolio");
  revalidatePublicPortfolioPages();
}

export async function updatePortfolioItem(id: string, formData: FormData) {
  const title = requireString(formData, "title");
  const type = requireString(formData, "type");
  const categoryId = requireString(formData, "categoryId");
  const description = requireString(formData, "description");
  const detail = requireString(formData, "detail");
  const image = requireString(formData, "image");
  const link = readOptional(formData, "link");

  const updated = await prisma.portfolioItem.update({
    where: { id },
    data: { title, type, categoryId, description, detail, image, link },
  });
  revalidatePath("/admin-uneed/portfolio");
  revalidatePath(`/portfolio/${updated.slug}`);
  revalidatePublicPortfolioPages();
}

export async function deletePortfolioItem(id: string) {
  "use server";
  await prisma.portfolioItem.delete({ where: { id } });
  revalidatePath("/admin-uneed/portfolio");
  revalidatePublicPortfolioPages();
}
