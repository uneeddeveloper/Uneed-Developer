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
import type { PortfolioItemWithCategory } from "@/lib/public-data";
import { SERVICE_ICONS } from "@/components/services/service-icons";
import { PortfolioCard } from "./portfolio-card";

const EASE = [0.16, 1, 0.3, 1] as const;

type CategoryOption = { id: string; slug: string; name: string };

/**
 * Bento rhythm: every 4th tile (0, 4, 8 …) becomes a 2×2 feature so the grid
 * has focal points instead of nine identical boxes. Only applied once there
 * are enough tiles to fill the wider slot without leaving a hole.
 *
 * Sizing comes from column + row spans rather than aspect-ratio: with
 * aspect-ratio a double-width tile is also double-height, so it never lines
 * up with the single tiles beside it and the grid ends up full of gaps.
 */
function spanFor(index: number, total: number) {
  return total >= 3 && index % 4 === 0 ? "sm:col-span-2 sm:row-span-2" : "";
}

export function PortfolioCatalog({
  items,
  categories,
}: {
  items: PortfolioItemWithCategory[];
  categories: CategoryOption[];
}) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const activeCategory = activeSlug ? categories.find((c) => c.slug === activeSlug) : null;

  const filtered = activeSlug
    ? items.filter((item) => item.category.slug === activeSlug)
    : items;

  const EmptyIcon = activeCategory ? (SERVICE_ICONS[activeCategory.slug] ?? Blocks) : Blocks;

  return (
    <section className="relative py-24 sm:py-32">
      <AmbientGlow className="opacity-50" />
      <Container className="relative">
        <SectionHeading
          as="h1"
          label="Portfolio"
          title="Karya Terbaik Kami"
          description="Dikelompokkan berdasarkan layanan yang dikerjakan — pilih kategori untuk lihat project sejenis."
        />

        <div className="mt-12 flex flex-wrap justify-center gap-2.5">
          {[{ id: "all", slug: null, name: "Semua" }, ...categories].map((category) => {
            const active = activeSlug === category.slug;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveSlug(category.slug)}
                className={cn(
                  "relative rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-circuit",
                  active
                    ? "border-transparent text-growth"
                    : "border-white/10 text-text-lo hover:border-circuit/50 hover:text-text-hi"
                )}
              >
                {/* Shared element: the pill slides between filters instead of blinking. */}
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    transition={{ duration: 0.4, ease: EASE }}
                    className="absolute inset-0 rounded-full border border-growth/60 bg-growth/15"
                  />
                )}
                <span className="relative">{category.name}</span>
              </button>
            );
          })}
        </div>

        {filtered.length > 0 ? (
          <motion.div
            layout
            transition={{ duration: 0.5, ease: EASE }}
            // dense flow lets single tiles backfill the gaps a 2×2 feature leaves
            className="mt-12 grid auto-rows-[200px] grid-flow-row-dense grid-cols-1 gap-5 sm:grid-cols-2 lg:auto-rows-[220px] lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(i, 6) * 0.045,
                    ease: EASE,
                  }}
                  className={spanFor(i, filtered.length)}
                >
                  <PortfolioCard
                    item={item}
                    priority={i < 3}
                    sizes={
                      i % 4 === 0 && filtered.length >= 3
                        ? "(min-width: 640px) 66vw, 100vw"
                        : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    }
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-16 flex flex-col items-center rounded-2xl border border-dashed border-white/10 px-6 py-20 text-center"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-circuit-dim/60 bg-circuit/10 text-circuit">
              <EmptyIcon size={24} />
            </div>
            <h3 className="mt-6 font-display text-lg font-bold text-text-hi">
              Belum ada project {activeCategory?.name} yang tampil di sini
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-text-lo">
              Tapi tim kami sudah siap kerjakan project di kategori ini — pesan
              sekarang dan jadi salah satu yang pertama tampil di portfolio.
            </p>
            <Button asChild variant="primary" className="mt-6">
              <Link href={`/layanan?kategori=${activeCategory?.slug}`}>
                Pesan Layanan Ini
                <ArrowRight size={16} />
              </Link>
            </Button>
          </motion.div>
        )}
      </Container>
    </section>
  );
}
