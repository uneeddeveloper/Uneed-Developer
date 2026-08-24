"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioItemWithCategory } from "@/lib/public-data";
import { cn } from "@/lib/utils";

/**
 * Reveal is gated on `(hover: hover)` rather than plain group-hover: touch
 * devices never hover, so there the caption has to stay visible.
 */
const ON_HOVER = "[@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100";

export function PortfolioCard({
  item,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  item: PortfolioItemWithCategory;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Link
      href={`/portfolio/${item.slug}`}
      className={cn(
        "group relative block h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-ink",
        "transition-[border-color,transform,box-shadow] duration-500 ease-out",
        "hover:-translate-y-1 hover:border-circuit/50 hover:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.9)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-circuit focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
        className
      )}
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        priority={priority}
        sizes={sizes}
        unoptimized={!item.image.startsWith("/")}
        className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
      />

      {/* Category chip — always visible, small enough to keep the shot readable. */}
      <span className="glass absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-circuit">
        {item.category.name}
      </span>

      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent transition-opacity duration-500",
          ON_HOVER
        )}
      />

      {/* A hairline that draws itself across the card on hover. */}
      <span
        className="pointer-events-none absolute inset-x-5 bottom-[4.75rem] z-10 h-px origin-left scale-x-0 bg-gradient-to-r from-circuit via-growth to-transparent transition-transform duration-700 ease-out group-hover:scale-x-100"
        aria-hidden="true"
      />

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-10 p-5 transition-all duration-500 ease-out",
          "[@media(hover:hover)]:translate-y-3 [@media(hover:hover)]:group-hover:translate-y-0",
          ON_HOVER
        )}
      >
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <h3 className="truncate font-display text-lg font-bold tracking-[-0.01em] text-text-hi">
              {item.title}
            </h3>
            <p className="mt-1 line-clamp-1 text-sm text-text-lo">
              {item.description}
            </p>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-text-hi transition-colors duration-300 group-hover:border-growth/60 group-hover:text-growth">
            <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
