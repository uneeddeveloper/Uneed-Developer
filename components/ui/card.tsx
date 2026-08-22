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
        "glass relative overflow-hidden rounded-2xl p-6 transition-colors duration-200",
        className
      )}
    >
      {children}
    </div>
  );
}
