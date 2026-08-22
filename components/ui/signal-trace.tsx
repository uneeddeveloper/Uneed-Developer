import { cn } from "@/lib/utils";

/**
 * The site's signature element: a vertical "circuit trace" with a pulsing
 * node of light, echoing the logo's blue-circuit-into-green-arrow motif.
 * Meant to run down the margin connecting Hero -> Layanan -> Portfolio -> Kontak.
 */
export function SignalTrace({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-px shrink-0", className)}>
      <div className="absolute inset-0 bg-gradient-to-b from-circuit-dim via-panel-line to-growth-dim" />
      <div
        className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-growth"
        style={{
          boxShadow: "0 0 12px 2px var(--color-growth)",
          animation: "pulse-node 2.4s ease-in-out infinite",
        }}
      />
    </div>
  );
}
