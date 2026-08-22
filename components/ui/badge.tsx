import { cn } from "@/lib/utils";

/**
 * Small pill label that sits above a section heading — the reference's
 * "What We Do" chip, adapted to the dark palette.
 */
export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-text-lo",
        className
      )}
    >
      <span
        className="h-1.5 w-1.5 rounded-full bg-growth"
        style={{ boxShadow: "0 0 8px 1px var(--color-growth)" }}
      />
      {children}
    </span>
  );
}
