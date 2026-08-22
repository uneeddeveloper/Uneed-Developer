"use client";

import { ArrowUpRight, Blocks } from "lucide-react";
import { SERVICE_CATALOG, type ServiceCategoryMeta } from "@/lib/content";
import { SERVICE_ICONS } from "./service-icons";

export function ServiceCategoryCard({
  category,
  onOpen,
}: {
  category: ServiceCategoryMeta;
  onOpen: (category: ServiceCategoryMeta) => void;
}) {
  const Icon = SERVICE_ICONS[category.slug] ?? Blocks;
  const packageCount = SERVICE_CATALOG.filter(
    (item) => item.categorySlug === category.slug
  ).length;

  return (
    <button
      type="button"
      onClick={() => onOpen(category)}
      aria-label={`Lihat paket ${category.name}`}
      className="glass group flex h-full w-full flex-col rounded-2xl p-6 text-left transition-colors duration-200 hover:border-circuit/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-circuit focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-circuit-dim/60 bg-circuit/10 text-circuit transition-colors duration-200 group-hover:text-growth">
          <Icon size={20} strokeWidth={1.6} />
        </div>
        <ArrowUpRight
          size={16}
          className="mt-1 shrink-0 text-text-lo transition-colors duration-200 group-hover:text-growth"
        />
      </div>

      <h3 className="mt-5 font-display text-base font-medium text-text-hi">
        {category.name}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-lo">
        {category.description}
      </p>

      <span className="mt-auto border-t border-white/5 pt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-text-lo">
        {packageCount} paket tersedia
      </span>
    </button>
  );
}
