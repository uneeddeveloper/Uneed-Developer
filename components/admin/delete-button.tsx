"use client";

import { Trash2 } from "lucide-react";

/** Wraps a server action in a native confirm() — no need for a second modal
 * just to ask "are you sure?" for a destructive one-row delete. */
export function DeleteButton({
  action,
  confirmText = "Hapus data ini? Tindakan ini tidak bisa dibatalkan.",
  label,
}: {
  action: () => Promise<void>;
  confirmText?: string;
  label?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
    >
      <button
        type="submit"
        aria-label={label ?? "Hapus"}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-text-lo transition-colors hover:bg-red-500/10 hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-circuit"
      >
        <Trash2 size={14} />
      </button>
    </form>
  );
}
