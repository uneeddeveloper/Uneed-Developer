import type { Metadata } from "next";
import { PortfolioCatalog } from "@/components/portfolio/portfolio-catalog";
import { CtaStrip } from "@/components/layout/cta-strip";
import { getPortfolioItems, getServiceCategories } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Portfolio — Uneed Developer",
  description: "Kumpulan project yang sudah dikerjakan tim Uneed Developer, dikelompokkan per kategori layanan.",
};

export default async function PortfolioPage() {
  const [items, categories] = await Promise.all([
    getPortfolioItems(),
    getServiceCategories(),
  ]);

  return (
    <main>
      <PortfolioCatalog items={items} categories={categories} />
      <CtaStrip />
    </main>
  );
}
