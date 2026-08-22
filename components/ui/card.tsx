"use client";

import { cn, handleSpotlightMove, spotlightStyle } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      onMouseMove={handleSpotlightMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-panel-line bg-panel p-6 transition-all duration-300 hover:-translate-y-1 hover:border-circuit/60",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={spotlightStyle()}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
