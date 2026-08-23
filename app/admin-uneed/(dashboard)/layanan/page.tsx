import { PageHeader } from "@/components/admin/page-header";
import { prisma } from "@/lib/prisma";
import { LayananClient } from "./layanan-client";

export default async function AdminLayananPage() {
  const categories = await prisma.serviceCategory.findMany({
    orderBy: { order: "asc" },
    include: { services: { orderBy: { order: "asc" } } },
  });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Manajemen Layanan"
        subtitle="Kategori & paket yang tampil di /layanan — kategori yang sama dipakai untuk mengelompokkan Portfolio."
      />
      <LayananClient categories={categories} />
    </div>
  );
}
