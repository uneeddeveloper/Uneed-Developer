import { prisma } from "@/lib/prisma";

/**
 * Data the public site reads from the database — the CMS-backed
 * counterpart to the static CONTACT/TEAM constants in lib/content.ts.
 * Centralized here so every public page/component shares one query shape
 * instead of each writing its own `include`.
 */

export async function getServiceCategories() {
  return prisma.serviceCategory.findMany({
    orderBy: { order: "asc" },
    include: { services: { orderBy: { order: "asc" } } },
  });
}

export type ServiceCategoryWithServices = Awaited<
  ReturnType<typeof getServiceCategories>
>[number];

export async function getPortfolioItems() {
  return prisma.portfolioItem.findMany({
    orderBy: { order: "asc" },
    include: { category: { select: { id: true, slug: true, name: true } } },
  });
}

export type PortfolioItemWithCategory = Awaited<
  ReturnType<typeof getPortfolioItems>
>[number];

export async function getPortfolioItemBySlug(slug: string) {
  return prisma.portfolioItem.findUnique({
    where: { slug },
    include: { category: { select: { name: true } } },
  });
}
