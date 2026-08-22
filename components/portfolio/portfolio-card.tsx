"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioItem } from "@/lib/content";

/**
 * On hover-capable pointers the caption stays out of the way until you hover,
 * so the screenshot reads at full size. Touch devices have no hover, so there
 * the caption is always visible — hence the `(hover: hover)` guards rather
 * than a plain `group-hover`.
 */
const REVEAL = "[@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100";

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
        className="group relative block aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-ink transition-colors duration-300 hover:border-circuit/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-circuit focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
        />

        {/* Always-on type badge — small enough to leave the screenshot readable. */}
        <span className="glass absolute left-3 top-3 rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-circuit">
          {item.type}
        </span>

        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent transition-opacity duration-300 ${REVEAL}`}
        />

        <div
          className={`absolute inset-x-3 bottom-3 transition-all duration-300 ease-out [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:group-hover:translate-y-0 ${REVEAL}`}
        >
          <div className="glass flex items-center justify-between gap-3 rounded-xl px-4 py-3">
            <div className="min-w-0">
              <h3 className="truncate font-display text-sm font-medium text-text-hi">
                {item.title}
              </h3>
              <p className="mt-0.5 truncate text-xs text-text-lo">
                {item.description}
              </p>
            </div>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-text-hi transition-colors duration-200 group-hover:border-growth/60 group-hover:text-growth">
              <ArrowUpRight size={15} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
