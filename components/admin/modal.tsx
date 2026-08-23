"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

/** Centered glass modal, portalled to <body> — same reasoning as ServiceDrawer:
 * a modal belongs on <body>, not inside whatever transformed ancestor happens
 * to be rendering the page. */
export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-ink/70 backdrop-blur-sm"
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              key="panel"
              role="dialog"
              aria-modal="true"
              aria-label={title}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="glass glass-heavy max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl"
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/5 px-6 py-5">
                <h2 className="font-display text-lg font-bold text-text-hi">
                  {title}
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Tutup"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-text-lo transition-colors hover:bg-white/5 hover:text-text-hi focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-circuit"
                >
                  <X size={15} />
                </button>
              </div>
              <div className="p-6">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
