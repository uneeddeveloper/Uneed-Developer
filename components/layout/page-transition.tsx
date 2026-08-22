"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

/** Travel direction follows the nav order; routes outside it just fade. */
const NAV_ORDER = ["/", "/layanan", "/portfolio", "/kontak"];

/**
 * Module-scoped because `template.tsx` remounts on every navigation, so a
 * ref would be wiped before we could compare against it.
 */
let previousPath: string | null = null;

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const offset = useMemo(() => {
    if (previousPath === null || previousPath === pathname) return 0;
    const from = NAV_ORDER.indexOf(previousPath);
    const to = NAV_ORDER.indexOf(pathname);
    if (from === -1 || to === -1) return 0;
    return to > from ? 40 : -40;
  }, [pathname]);

  useEffect(() => {
    previousPath = pathname;
  }, [pathname]);

  if (reduceMotion) return <>{children}</>;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: offset }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      // Clear the transform once settled — a lingering one would make this the
      // containing block for any position:fixed descendant.
      onAnimationComplete={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
      className="overflow-x-clip"
    >
      {children}
    </motion.div>
  );
}
