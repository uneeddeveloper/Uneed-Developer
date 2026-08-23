"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "./sidebar";

export function AdminShell({ adminName }: { adminName: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="glass sticky top-4 z-30 mb-4 flex items-center justify-between rounded-2xl px-4 py-3 lg:hidden">
        <span className="font-mono text-circuit">{"</>"}</span>
        <span className="font-display text-sm font-medium text-text-hi">
          Uneed<span className="text-growth">Admin</span>
        </span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Buka menu"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-text-lo transition-colors hover:bg-white/5 hover:text-text-hi focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-circuit"
        >
          <Menu size={18} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="relative h-full w-72 max-w-[80vw]">
            <Sidebar adminName={adminName} variant="drawer" onNavigate={() => setOpen(false)} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Tutup menu"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-text-lo transition-colors hover:bg-white/5 hover:text-text-hi focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-circuit"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="hidden lg:block">
        <Sidebar adminName={adminName} />
      </div>
    </>
  );
}
