"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Blocks } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { cn } from "@/lib/utils";
import { PORTFOLIO, SERVICE_CATEGORIES } from "@/lib/content";
import { SERVICE_ICONS } from "@/components/services/service-icons";
import { PortfolioCard } from "./portfolio-card";

export function PortfolioCatalog() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const activeCategory = activeSlug
    ? SERVICE_CATEGORIES.find((c) => c.slug === activeSlug)
    : null;

  const items = activeSlug
    ? PORTFOLIO.filter((item) => item.categorySlug === activeSlug)
    : PORTFOLIO;

  const EmptyIcon = activeCategory ? (SERVICE_ICONS[activeCategory.slug] ?? Blocks) : Blocks;

  return (
    <section className="relative py-24 sm:py-32">
      <AmbientGlow className="opacity-50" />
      <Container className="relative">
        <div className="min-w-0 flex-1">
          <SectionHeading
            as="h1"
            label="Portfolio"
            title="Karya Terbaik Kami"
            description="Dikelompokkan berdasarkan layanan yang dikerjakan — pilih kategori untuk lihat project sejenis."
          />

          <div className="mt-12 flex flex-wrap justify-center gap-2.5">
            <button
              type="button"
              onClick={() => setActiveSlug(null)}
              className={cn(
                "rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors",
                activeSlug === null
                  ? "border-growth/60 bg-growth/15 text-growth"
                  : "border-white/10 text-text-lo hover:border-circuit/50 hover:text-text-hi"
              )}
            >
              Semua
            </button>
            {SERVICE_CATEGORIES.map((category) => (
              <button
                key={category.slug}
                type="button"
                onClick={() => setActiveSlug(category.slug)}
                className={cn(
                  "rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors",
                  activeSlug === category.slug
                    ? "border-growth/60 bg-growth/15 text-growth"
                    : "border-white/10 text-text-lo hover:border-circuit/50 hover:text-text-hi"
                )}
              >
                {category.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {items.length > 0 ? (
              <motion.div
                key={activeSlug ?? "all"}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-12 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {items.map((item, i) => (
                  <PortfolioCard key={item.slug} item={item} delay={(i % 3) * 0.06} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={activeSlug ?? "all"}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-16 flex flex-col items-center rounded-2xl border border-dashed border-white/10 px-6 py-20 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-circuit-dim/60 bg-circuit/10 text-circuit">
                  <EmptyIcon size={24} />
                </div>
                <h3 className="mt-6 font-display text-lg text-text-hi">
                  Belum ada project {activeCategory?.name} yang tampil di sini
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-text-lo">
                  Tapi tim kami sudah siap kerjakan project di kategori ini —
                  pesan sekarang dan jadi salah satu yang pertama tampil di
                  portfolio.
                </p>
                <Button asChild variant="primary" className="mt-6">
                  <Link href={`/layanan?kategori=${activeCategory?.slug}`}>
                    Pesan Layanan Ini
                    <ArrowRight size={16} />
                  </Link>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
