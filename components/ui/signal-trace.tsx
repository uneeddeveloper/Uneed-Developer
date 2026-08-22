"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * The site's signature element: a vertical "circuit trace" with a pulsing
 * node of light, echoing the logo's blue-circuit-into-green-arrow motif.
 * The node's position tracks scroll progress through its own section, so
 * the signal visibly "travels" down the trace as the section scrolls by.
 */
export function SignalTrace({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.15"],
  });
  const top = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className={cn("relative w-px shrink-0", className)}>
      <div className="absolute inset-0 bg-gradient-to-b from-circuit-dim via-panel-line to-growth-dim" />
      <motion.div
        className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-growth"
        style={{
          top,
          boxShadow: "0 0 12px 2px var(--color-growth)",
          animation: "pulse-node 2.4s ease-in-out infinite",
        }}
      />
    </div>
  );
}
