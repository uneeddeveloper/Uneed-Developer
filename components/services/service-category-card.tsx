"use client";

import { ArrowUpRight, Blocks, Layers } from "lucide-react";
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
  const items = SERVICE_CATALOG.filter((i) => i.categorySlug === category.slug);

  return (
    <button
      type="button"
      onClick={() => onOpen(category)}
      aria-label={`Lihat ${items.length} paket ${category.name}`}
      className="glass group flex h-full w-full flex-col rounded-2xl p-6 text-left transition-colors duration-200 hover:border-circuit/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-circuit focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-circuit transition-colors duration-200 group-hover:text-growth">
        <Icon size={19} strokeWidth={1.7} />
      </div>

      <h3 className="mt-6 font-display text-lg font-bold tracking-[-0.01em] text-text-hi">
        {category.name}
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-text-lo">
        {category.description}
      </p>

      <div className="mt-auto flex items-center justify-between gap-4 pt-6">
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-text-lo">
          <Layers size={12} className="text-circuit" />
          {items.length} paket
        </span>

        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-text-hi transition-colors duration-200 group-hover:border-growth/60 group-hover:text-growth">
          <ArrowUpRight size={15} />
        </span>
      </div>
    </button>
  );
}
