import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const TONES = {
  circuit:
    "bg-gradient-to-br from-circuit to-circuit-dim text-ink shadow-[0_6px_20px_-6px_var(--color-circuit)]",
  growth:
    "bg-gradient-to-br from-growth to-growth-dim text-ink shadow-[0_6px_20px_-6px_var(--color-growth)]",
  neutral:
    "bg-gradient-to-br from-white/12 to-white/[0.03] text-text-hi shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]",
  warn:
    "bg-gradient-to-br from-amber-400 to-amber-600 text-ink shadow-[0_6px_20px_-6px_rgba(245,158,11,0.55)]",
} as const;

const CARD_ACCENT = {
  circuit: "before:bg-gradient-to-r before:from-circuit before:to-transparent",
  growth: "before:bg-gradient-to-r before:from-growth before:to-transparent",
  neutral: "before:bg-gradient-to-r before:from-white/25 before:to-transparent",
  warn: "before:bg-gradient-to-r before:from-amber-500 before:to-transparent",
} as const;

export function StatCard({
  icon: Icon,
  label,
  value,
  sublabel,
  tone = "neutral",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  sublabel?: string;
  tone?: keyof typeof TONES;
}) {
  return (
    <div
      className={cn(
        "glass relative overflow-hidden rounded-2xl p-5",
        "before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:content-['']",
        CARD_ACCENT[tone]
      )}
    >
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl",
          TONES[tone]
        )}
      >
        <Icon size={18} strokeWidth={2} />
      </div>
      <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-text-lo">
        {label}
      </div>
      <div className="mt-1 font-display text-2xl font-bold text-text-hi">
        {value}
      </div>
      {sublabel && <div className="mt-1 text-xs text-text-lo">{sublabel}</div>}
    </div>
  );
}
