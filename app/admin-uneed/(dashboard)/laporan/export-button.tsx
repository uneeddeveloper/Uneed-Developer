"use client";

import { Download } from "lucide-react";

/** Renders the already-fetched report data as a downloadable JSON file —
 * no extra request needed, the page already has everything in props. */
export function ExportButton({ data }: { data: unknown }) {
  function handleExport() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `uneed-laporan-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm font-medium text-text-hi transition-colors hover:border-growth/60 hover:text-growth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-circuit"
    >
      <Download size={15} />
      Export Data (JSON)
    </button>
  );
}
