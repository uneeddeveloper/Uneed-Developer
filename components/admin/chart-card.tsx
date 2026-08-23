import { cn } from "@/lib/utils";

export function ChartCard({
  title,
  subtitle,
  children,
  className,
  action,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className={cn("glass rounded-2xl p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-base font-bold text-text-hi">
            {title}
          </h3>
          {subtitle && <p className="mt-0.5 text-xs text-text-lo">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

/** Shared empty state for charts/lists with no data yet — keeps copy consistent. */
export function ChartEmpty({ label = "Belum ada data" }: { label?: string }) {
  return (
    <div className="flex h-48 items-center justify-center text-sm text-text-lo">
      {label}
    </div>
  );
}
