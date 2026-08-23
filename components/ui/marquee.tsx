"use client";

import { useReducedMotion } from "framer-motion";
import { Children, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Continuously scrolling row. The children are rendered twice back-to-back and
 * the track is translated by exactly -50%, so the second copy lands where the
 * first started and the loop is seamless.
 *
 * Falls back to a normal scrollable row when the visitor prefers reduced
 * motion — the content stays reachable, it just doesn't move on its own.
 */
export function Marquee({
  children,
  direction = "left",
  speed = 60,
  className,
}: {
  children: ReactNode;
  direction?: "left" | "right";
  /** Seconds for one full pass. Higher = slower. */
  speed?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const items = Children.toArray(children);

  if (reduceMotion) {
    return (
      <div
        className={cn(
          "flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          className
        )}
      >
        {items}
      </div>
    );
  }

  return (
    <div
      className={cn("marquee group relative overflow-hidden", className)}
      // Edges fade out so cards enter and leave instead of being chopped off.
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
    >
      <div
        className="marquee-track flex w-max gap-5"
        // Longhand on purpose: the `animation` shorthand also sets
        // animation-play-state inline, which would outrank the CSS rule that
        // pauses the loop on hover.
        style={{
          animationName: `marquee-${direction}`,
          animationDuration: `${speed}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {items.map((child, i) => (
          <div key={`a-${i}`} className="shrink-0">
            {child}
          </div>
        ))}
        {items.map((child, i) => (
          <div key={`b-${i}`} className="shrink-0" aria-hidden="true">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
