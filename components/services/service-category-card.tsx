"use client";

import { ArrowUpRight, Layers } from "lucide-react";
import { SERVICE_CATALOG, type ServiceCategoryMeta } from "@/lib/content";
import { ServiceVisual } from "./service-visual";

export function ServiceCategoryCard({
  category,
  onOpen,
}: {
  category: ServiceCategoryMeta;
  onOpen: (category: ServiceCategoryMeta) => void;
}) {
  const packageCount = SERVICE_CATALOG.filter(
    (item) => item.categorySlug === category.slug
  ).length;

  return (
    <button
      type="button"
      onClick={() => onOpen(category)}
      aria-label={`Lihat ${packageCount} paket ${category.name}`}
      className="glass group flex h-full w-full flex-col overflow-hidden rounded-2xl p-3 text-left transition-colors duration-200 hover:border-circuit/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-circuit focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
    >
      <ServiceVisual slug={category.slug} />

      <div className="flex flex-1 flex-col px-3 pb-2 pt-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-base font-medium text-text-hi">
            {category.name}
          </h3>
          <ArrowUpRight
            size={16}
            className="mt-0.5 shrink-0 text-text-lo transition-colors duration-200 group-hover:text-growth"
          />
        </div>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text-lo">
          {category.description}
        </p>

        <div className="mt-auto flex items-center gap-1.5 pt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-text-lo">
          <Layers size={12} className="text-circuit" />
          {packageCount} paket
        </div>
      </div>
    </button>
  );
}
