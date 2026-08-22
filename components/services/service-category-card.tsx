"use client";

import { ArrowRight, Blocks } from "lucide-react";
import type { ServiceCategoryMeta } from "@/lib/content";
import { handleSpotlightMove, spotlightStyle } from "@/lib/utils";
import { SERVICE_ICONS } from "./service-icons";

export function ServiceCategoryCard({
  category,
  onOpen,
}: {
  category: ServiceCategoryMeta;
  onOpen: (category: ServiceCategoryMeta) => void;
}) {
  const Icon = SERVICE_ICONS[category.slug] ?? Blocks;

  return (
    <button
      type="button"
      onClick={() => onOpen(category)}
      className="group block w-full text-left"
    >
      <div
        onMouseMove={handleSpotlightMove}
        className="glass relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-xl transition-colors duration-300 group-hover:border-circuit/60"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={spotlightStyle()}
        />
        <Icon
          size={40}
          strokeWidth={1.4}
          className="relative text-circuit transition-transform duration-500 group-hover:scale-110 group-hover:text-growth"
        />
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-base font-medium text-text-hi">
            {category.name}
          </h3>
          <p className="mt-1 line-clamp-1 text-sm leading-relaxed text-text-lo">
            {category.description}
          </p>
        </div>
        <ArrowRight
          size={16}
          className="mt-1 shrink-0 text-text-lo transition-all duration-300 group-hover:translate-x-1 group-hover:text-growth"
        />
      </div>
    </button>
  );
}
