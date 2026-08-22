import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "group relative rounded-2xl border border-panel-line bg-panel p-6 transition-all duration-300 hover:-translate-y-1 hover:border-circuit/60",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-circuit/0 to-growth/0 opacity-0 transition-opacity duration-300 group-hover:from-circuit/5 group-hover:to-growth/5 group-hover:opacity-100" />
      <div className="relative">{children}</div>
    </div>
  );
}
