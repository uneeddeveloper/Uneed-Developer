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
        className="glass group flex h-full flex-col overflow-hidden rounded-2xl transition-colors duration-200 hover:border-circuit/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-circuit focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
      >
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-ink">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-1 items-start justify-between gap-4 p-5">
          <div className="min-w-0">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-circuit">
              {item.type}
            </span>
            <h3 className="mt-1.5 font-display text-base font-medium text-text-hi">
              {item.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-text-lo">
              {item.description}
            </p>
          </div>
          <ArrowUpRight
            size={16}
            className="mt-1 shrink-0 text-text-lo transition-colors duration-200 group-hover:text-growth"
          />
        </div>
      </Link>
    </motion.div>
  );
}
