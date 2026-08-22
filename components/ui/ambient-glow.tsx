import { cn } from "@/lib/utils";

/**
 * Soft color blobs behind glass surfaces — the site's atmospheric backdrop.
 * Without something colorful to blur, backdrop-filter has nothing to refract
 * and "glass" panels just look like flat dark boxes. Kept low-contrast and
 * static so it stays background, never foreground.
 */
export function AmbientGlow({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "center" | "bottom";
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {variant === "default" && (
        <>
          <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-circuit/12 blur-[130px]" />
          <div className="absolute -right-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-growth/8 blur-[130px]" />
        </>
      )}
      {variant === "center" && (
        <div className="absolute left-1/2 top-0 h-[32rem] w-[48rem] -translate-x-1/2 rounded-full bg-circuit/10 blur-[140px]" />
      )}
      {variant === "bottom" && (
        <>
          <div className="absolute -left-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-growth/10 blur-[130px]" />
          <div className="absolute -right-24 bottom-1/4 h-[22rem] w-[22rem] rounded-full bg-circuit/10 blur-[130px]" />
        </>
      )}
    </div>
  );
}
