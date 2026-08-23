import { PageHeader } from "@/components/admin/page-header";
import { prisma } from "@/lib/prisma";
import { PortfolioClient } from "./portfolio-client";

export default async function AdminPortfolioPage() {
  const [items, categories] = await Promise.all([
    prisma.portfolioItem.findMany({
      orderBy: { order: "asc" },
      include: { category: { select: { name: true } } },
    }),
    prisma.serviceCategory.findMany({ orderBy: { order: "asc" }, select: { id: true, name: true } }),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Manajemen Portfolio"
        subtitle="Kelola karya terbaik yang ditampilkan di halaman depan website."
      />
      <PortfolioClient items={items} categories={categories} />
    </div>
  );
}
