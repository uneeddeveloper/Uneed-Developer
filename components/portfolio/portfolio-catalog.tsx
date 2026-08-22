"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { SignalTrace } from "@/components/ui/signal-trace";
import { cn } from "@/lib/utils";
import { PORTFOLIO, SERVICE_CATEGORIES } from "@/lib/content";
import { PortfolioCard } from "./portfolio-card";

export function PortfolioCatalog() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const categories = useMemo(
    () =>
      SERVICE_CATEGORIES.filter((category) =>
        PORTFOLIO.some((item) => item.categorySlug === category.slug)
      ),
    []
  );

  const items = activeSlug
    ? PORTFOLIO.filter((item) => item.categorySlug === activeSlug)
    : PORTFOLIO;

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
            {categories.map((category) => (
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
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
