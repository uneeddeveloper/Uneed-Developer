import type { Metadata } from "next";
import { PortfolioCatalog } from "@/components/portfolio/portfolio-catalog";

export const metadata: Metadata = {
  title: "Portfolio — Uneed Developer",
  description: "Kumpulan project yang sudah dikerjakan tim Uneed Developer, dikelompokkan per kategori layanan.",
};

export default function PortfolioPage() {
  return (
    <main>
      <PortfolioCatalog />
    </main>
  );
}
