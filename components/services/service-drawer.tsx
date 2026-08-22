"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Blocks, Check, MessageCircle, X } from "lucide-react";
import { SERVICE_CATALOG, waLinkForService, type ServiceCategoryMeta } from "@/lib/content";
import { SERVICE_ICONS } from "./service-icons";

export function ServiceDrawer({
  category,
  onClose,
}: {
  category: ServiceCategoryMeta | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!category) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [category, onClose]);

  const Icon = category ? (SERVICE_ICONS[category.slug] ?? Blocks) : Blocks;
  const items = category
    ? SERVICE_CATALOG.filter((item) => item.categorySlug === category.slug)
    : [];

  return (
    <AnimatePresence>
      {category && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-ink/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label={category.name}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="glass glass-heavy fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col sm:inset-y-3 sm:right-3 sm:rounded-[1.75rem]"
          >
            <header className="relative shrink-0 overflow-hidden px-6 pb-6 pt-7 sm:rounded-t-[1.75rem]">
              <div
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  background:
                    "radial-gradient(120% 100% at 0% 0%, color-mix(in srgb, var(--color-circuit) 22%, transparent), transparent 65%)",
                }}
                aria-hidden="true"
              />
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-circuit/10 text-circuit shadow-[inset_0_1px_0_rgba(234,242,255,0.14)]">
                    <Icon size={22} strokeWidth={1.7} />
                  </div>
                  <div>
                    <h2 className="font-display text-xl text-text-hi">
                      {category.name}
                    </h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-lo">
                      {category.description}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Tutup"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-text-lo transition-colors duration-200 hover:bg-white/5 hover:text-text-hi focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-circuit"
                >
                  <X size={17} />
                </button>
              </div>

              <p className="relative mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-text-lo">
                {items.length} paket tersedia
              </p>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto px-6 pb-6">
              {items.map((item, i) => (
                <article
                  key={item.name}
                  className="rounded-2xl border border-white/10 bg-ink/40 p-5 transition-colors duration-200 hover:border-circuit/40"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] text-text-lo">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-base font-medium text-text-hi">
                      {item.name}
                    </h3>
                  </div>

                  <p className="mt-2.5 text-sm leading-relaxed text-text-lo">
                    {item.description}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-4">
                    <span className="flex items-center gap-1.5 text-xs text-text-lo">
                      <Check size={13} className="shrink-0 text-growth" />
                      {item.priceRange ?? "Penawaran sesuai kebutuhan"}
                    </span>
                    <a
                      href={waLinkForService(item, category.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-text-hi transition-colors duration-200 hover:border-growth/60 hover:text-growth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-circuit"
                    >
                      <MessageCircle size={14} />
                      Pesan via WhatsApp
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
