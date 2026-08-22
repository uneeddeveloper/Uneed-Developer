import { cn } from "@/lib/utils";

/**
 * Large, saturated, slow-drifting color blobs behind glass surfaces —
 * the site's atmospheric backdrop. Without something colorful to blur,
 * backdrop-filter has nothing to refract and "glass" panels just look
 * like flat dark boxes.
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
          <div
            className="absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-circuit/25 blur-[130px]"
            style={{ animation: "drift 16s ease-in-out infinite" }}
          />
          <div
            className="absolute -right-32 top-1/4 h-[30rem] w-[30rem] rounded-full bg-growth/20 blur-[130px]"
            style={{ animation: "drift 20s ease-in-out infinite reverse" }}
          />
        </>
      )}
      {variant === "center" && (
        <div
          className="absolute left-1/2 top-0 h-[34rem] w-[50rem] -translate-x-1/2 rounded-full bg-circuit/15 blur-[140px]"
          style={{ animation: "drift 18s ease-in-out infinite" }}
        />
      )}
      {variant === "bottom" && (
        <>
          <div
            className="absolute -left-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-growth/20 blur-[130px]"
            style={{ animation: "drift 17s ease-in-out infinite" }}
          />
          <div
            className="absolute -right-24 bottom-1/4 h-[24rem] w-[24rem] rounded-full bg-circuit/20 blur-[130px]"
            style={{ animation: "drift 22s ease-in-out infinite reverse" }}
          />
        </>
      )}
    </div>
  );
}
