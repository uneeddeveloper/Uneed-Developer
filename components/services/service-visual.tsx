import { Blocks } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/content";
import { SERVICE_ICONS } from "./service-icons";

/**
 * Stands in for a photo on service cards. Each category gets its own point
 * along the brand's circuit(blue) -> growth(green) ramp, so the seven cards
 * read as one family without any two looking identical.
 */
export function ServiceVisual({ slug }: { slug: string }) {
  const Icon = SERVICE_ICONS[slug] ?? Blocks;
  const index = Math.max(0, SERVICE_CATEGORIES.findIndex((c) => c.slug === slug));
  const ramp = SERVICE_CATEGORIES.length > 1 ? index / (SERVICE_CATEGORIES.length - 1) : 0;
  const accent = `color-mix(in srgb, var(--color-growth) ${Math.round(ramp * 100)}%, var(--color-circuit))`;

  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/5"
      style={{
        background: `
          radial-gradient(120% 90% at 18% 0%, color-mix(in srgb, ${accent} 32%, transparent) 0%, transparent 62%),
          radial-gradient(90% 80% at 100% 100%, color-mix(in srgb, ${accent} 20%, transparent) 0%, transparent 60%),
          var(--color-ink)
        `,
      }}
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />

      {/* concentric rings radiating from the icon */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {[1, 1.75, 2.6].map((scale, i) => (
          <div
            key={scale}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{
              width: `${4.5 * scale}rem`,
              height: `${4.5 * scale}rem`,
              borderColor: `color-mix(in srgb, ${accent} ${20 - i * 6}%, transparent)`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 transition-transform duration-300 group-hover:scale-105"
          style={{
            background: `linear-gradient(140deg, color-mix(in srgb, ${accent} 28%, transparent), color-mix(in srgb, var(--color-panel) 80%, transparent))`,
            boxShadow: `inset 0 1px 0 rgba(234,242,255,0.16), 0 8px 24px -12px ${accent}`,
            color: accent,
          }}
        >
          <Icon size={24} strokeWidth={1.7} />
        </div>
      </div>
    </div>
  );
}
