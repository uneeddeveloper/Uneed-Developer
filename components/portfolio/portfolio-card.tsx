"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioItem } from "@/lib/content";

export function PortfolioCard({
  item,
  delay = 0,
}: {
  item: PortfolioItem;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <Link
        href={`/portfolio/${item.slug}`}
        className="group relative block aspect-[16/10] w-full overflow-hidden rounded-2xl bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-circuit focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {/* keeps the caption legible over bright screenshots */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/70 to-transparent" />

        <div className="glass absolute inset-x-2.5 bottom-2.5 flex items-center justify-between gap-3 rounded-xl px-4 py-3">
          <div className="min-w-0">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-circuit">
              {item.type}
            </span>
            <h3 className="mt-0.5 truncate font-display text-sm font-medium text-text-hi">
              {item.title}
            </h3>
          </div>
          <ArrowUpRight
            size={16}
            className="shrink-0 text-text-lo transition-colors duration-200 group-hover:text-growth"
          />
        </div>
      </Link>
    </motion.div>
  );
}
