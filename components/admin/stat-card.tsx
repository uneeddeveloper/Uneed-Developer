import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const TONES = {
  circuit: "border-circuit-dim/50 bg-circuit/10 text-circuit",
  growth: "border-growth-dim/50 bg-growth/10 text-growth",
  neutral: "border-white/10 bg-white/5 text-text-hi",
  warn: "border-amber-500/30 bg-amber-500/10 text-amber-400",
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
    <div className="glass rounded-2xl p-5">
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl border",
          TONES[tone]
        )}
      >
        <Icon size={18} strokeWidth={1.8} />
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
