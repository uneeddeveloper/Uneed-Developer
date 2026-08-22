import type { Metadata } from "next";
import { PortfolioSection } from "@/components/portfolio/portfolio-section";

export const metadata: Metadata = {
  title: "Portfolio — Uneed Developer",
  description: "Kumpulan project yang sudah dikerjakan tim Uneed Developer.",
};

export default function PortfolioPage() {
  return (
    <main>
      <PortfolioSection />
    </main>
  );
}
