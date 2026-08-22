"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Blocks } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/section-label";
import { SignalTrace } from "@/components/ui/signal-trace";
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
    <section className="py-32 sm:py-40">
      <Container className="flex gap-8">
        <SignalTrace className="hidden self-stretch lg:block" />
        <div className="min-w-0 flex-1">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionLabel>portfolio</SectionLabel>
            <h1 className="mt-5 max-w-xl font-display text-4xl text-text-hi sm:text-5xl">
              Karya Terbaik Kami
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-text-lo">
              Dikelompokkan berdasarkan layanan yang dikerjakan — pilih
              kategori untuk lihat project sejenis.
            </p>
          </motion.div>

          <div className="mt-10 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => setActiveSlug(null)}
              className={cn(
                "rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors",
                activeSlug === null
                  ? "border-growth bg-growth text-ink"
                  : "border-panel-line text-text-lo hover:border-circuit hover:text-text-hi"
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
                    ? "border-growth bg-growth text-ink"
                    : "border-panel-line text-text-lo hover:border-circuit hover:text-text-hi"
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
                className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
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
                className="mt-16 flex flex-col items-center rounded-2xl border border-dashed border-panel-line px-6 py-20 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-circuit-dim bg-circuit/10 text-circuit">
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
