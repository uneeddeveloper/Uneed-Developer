import bcrypt from "bcryptjs";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import {
  TEAM,
  SERVICE_CATEGORIES,
  SERVICE_CATALOG,
  PORTFOLIO,
} from "../lib/content";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // Idempotent throughout (upsert keyed on natural unique fields) so this is
  // safe to re-run — `prisma db seed` doesn't reset existing data on its own.

  const passwordHash = await bcrypt.hash("admin123", 10);
  await prisma.admin.upsert({
    where: { email: "admin@uneed.com" },
    update: {},
    create: {
      email: "admin@uneed.com",
      passwordHash,
      name: "Admin",
    },
  });
  console.log("✓ Admin (admin@uneed.com / admin123)");

  for (const member of TEAM) {
    const existing = await prisma.teamMember.findFirst({ where: { name: member.name } });
    if (!existing) {
      await prisma.teamMember.create({ data: member });
    }
  }
  console.log(`✓ TeamMember × ${TEAM.length}`);

  const categoryIdBySlug = new Map<string, string>();
  for (const [i, category] of SERVICE_CATEGORIES.entries()) {
    const row = await prisma.serviceCategory.upsert({
      where: { slug: category.slug },
      update: { name: category.name, description: category.description, order: i },
      create: { ...category, order: i },
    });
    categoryIdBySlug.set(category.slug, row.id);
  }
  console.log(`✓ ServiceCategory × ${SERVICE_CATEGORIES.length}`);

  for (const [i, item] of SERVICE_CATALOG.entries()) {
    const categoryId = categoryIdBySlug.get(item.categorySlug);
    if (!categoryId) throw new Error(`Unknown category slug: ${item.categorySlug}`);
    const existing = await prisma.service.findFirst({
      where: { categoryId, name: item.name },
    });
    const data = {
      categoryId,
      name: item.name,
      description: item.description,
      priceRange: item.priceRange,
      order: i,
    };
    if (existing) {
      await prisma.service.update({ where: { id: existing.id }, data });
    } else {
      await prisma.service.create({ data });
    }
  }
  console.log(`✓ Service × ${SERVICE_CATALOG.length}`);

  for (const [i, item] of PORTFOLIO.entries()) {
    const categoryId = categoryIdBySlug.get(item.categorySlug);
    if (!categoryId) throw new Error(`Unknown category slug: ${item.categorySlug}`);
    await prisma.portfolioItem.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        type: item.type,
        categoryId,
        description: item.description,
        detail: item.detail,
        link: item.link,
        image: item.image,
        order: i,
      },
      create: {
        slug: item.slug,
        title: item.title,
        type: item.type,
        categoryId,
        description: item.description,
        detail: item.detail,
        link: item.link,
        image: item.image,
        order: i,
      },
    });
  }
  console.log(`✓ PortfolioItem × ${PORTFOLIO.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
