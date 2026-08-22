import { cn } from "@/lib/utils";

/**
 * Large soft blurred color blobs sitting behind glass surfaces — without
 * something colorful to blur, backdrop-filter has nothing to refract and
 * "glass" panels just look like flat dark boxes.
 */
export function AmbientGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="absolute -left-32 -top-32 h-[26rem] w-[26rem] rounded-full bg-circuit/20 blur-[110px]" />
      <div className="absolute -right-24 top-1/3 h-[22rem] w-[22rem] rounded-full bg-growth/15 blur-[110px]" />
    </div>
  );
}
