"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Horizontal snap-scrolling row with prev/next controls. Controls only
 * render once there is actually something to scroll to, and stay disabled
 * at each end so they never look interactive when they aren't.
 */
export function ScrollRow({
  children,
  className,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < max - 8);
  }, []);

  useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [update]);

  function scrollBy(direction: 1 | -1) {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: direction * (el.clientWidth * 0.8), behavior: "smooth" });
  }

  const showControls = canPrev || canNext;

  return (
    <div className={cn("relative", className)}>
      {showControls && (
        <div className="mb-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={!canPrev}
            aria-label={`Geser ${label} ke kiri`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-text-lo transition-colors duration-200 hover:border-circuit/60 hover:text-text-hi disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-circuit"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={!canNext}
            aria-label={`Geser ${label} ke kanan`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-text-lo transition-colors duration-200 hover:border-circuit/60 hover:text-text-hi disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-circuit"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      <div
        ref={ref}
        onScroll={update}
        className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </div>
  );
}
