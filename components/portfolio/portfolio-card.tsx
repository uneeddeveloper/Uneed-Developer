"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { PortfolioItem } from "@/lib/content";
import { handleSpotlightMove, spotlightStyle } from "@/lib/utils";

export function PortfolioCard({
  item,
  delay = 0,
}: {
  item: PortfolioItem;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/portfolio/${item.slug}`}
        onMouseMove={handleSpotlightMove}
        className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-ink"
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-100"
          style={spotlightStyle("255, 255, 255", 280, 0.5)}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/50 to-transparent" />

        <div className="glass absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-xl px-4 py-3">
          <div className="min-w-0">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-circuit">
              {item.type}
            </span>
            <h3 className="mt-0.5 truncate font-display text-sm font-medium text-text-hi">
              {item.title}
            </h3>
          </div>
          <ArrowRight
            size={16}
            className="shrink-0 text-text-lo transition-all duration-300 group-hover:translate-x-1 group-hover:text-growth"
          />
        </div>
      </Link>
    </motion.div>
  );
}
