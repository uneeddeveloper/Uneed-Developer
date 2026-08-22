"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Blocks, MessageCircle, X } from "lucide-react";
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
            className="glass fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/5 px-6 py-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-circuit-dim bg-circuit/10 text-circuit">
                  <Icon size={20} />
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
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-text-lo transition-colors hover:bg-panel-line hover:text-text-hi"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-2">
              <div className="divide-y divide-panel-line">
                {items.map((item) => (
                  <div key={item.name} className="flex flex-col gap-3 py-6">
                    <div>
                      <h3 className="text-sm font-medium text-text-hi">
                        {item.name}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-text-lo">
                        {item.description}
                      </p>
                      <span className="mt-2 block font-mono text-[11px] text-text-lo">
                        {item.priceRange ?? "Hubungi kami untuk penawaran"}
                      </span>
                    </div>
                    <a
                      href={waLinkForService(item, category.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-fit items-center gap-2 rounded-full border border-circuit-dim px-4 py-2 text-xs font-medium text-text-hi transition-colors hover:border-growth hover:text-growth"
                    >
                      <MessageCircle size={14} />
                      Pesan via WhatsApp
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
