import { cn } from "@/lib/utils";

/**
 * Eyebrow label used above section headings. Styled like a code comment
 * ("// layanan") since the studio's real vernacular is source code —
 * not a decorative 01/02/03 numbering scheme.
 */
export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-circuit",
        className
      )}
    >
      <span
        className="h-1.5 w-1.5 rounded-full bg-growth"
        style={{ boxShadow: "0 0 8px 1px var(--color-growth)" }}
      />
      <span>// {children}</span>
    </div>
  );
}
