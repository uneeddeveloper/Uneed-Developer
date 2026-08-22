/**
 * Circuit-flow diagram echoing the brand mark: blue "process" nodes on the
 * left resolving into green "growth" nodes on the right, with the active
 * path animated. Purely decorative.
 */
const NODES = [
  { id: "a", x: 70, y: 110, r: 5, tone: "circuit" },
  { id: "b", x: 70, y: 250, r: 5, tone: "circuit" },
  { id: "c", x: 165, y: 60, r: 4, tone: "circuit" },
  { id: "d", x: 165, y: 180, r: 7, tone: "circuit" },
  { id: "e", x: 165, y: 300, r: 4, tone: "circuit" },
  { id: "f", x: 265, y: 120, r: 5, tone: "growth" },
  { id: "g", x: 265, y: 245, r: 5, tone: "growth" },
  { id: "h", x: 345, y: 180, r: 9, tone: "growth" },
] as const;

/** [from, to, isActivePath] — active edges get the animated dashed flow. */
const EDGES: readonly (readonly [string, string, boolean?])[] = [
  ["a", "c"],
  ["a", "d", true],
  ["b", "d", true],
  ["b", "e"],
  ["c", "f"],
  ["d", "f", true],
  ["d", "g", true],
  ["e", "g"],
  ["f", "h", true],
  ["g", "h", true],
] as const;

const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));

export function NetworkGraphic() {
  return (
    <svg viewBox="0 0 400 360" className="h-full w-full" aria-hidden="true">
      {EDGES.map(([from, to, active], i) => {
        const a = byId[from];
        const b = byId[to];
        return (
          <line
            key={`${from}-${to}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={active ? "var(--color-growth)" : "var(--color-circuit)"}
            strokeOpacity={active ? 0.55 : 0.22}
            strokeWidth={active ? 1.4 : 1}
            strokeDasharray={active ? "3 7" : undefined}
            style={
              active
                ? { animation: "flow 1.6s linear infinite", animationDelay: `${i * 0.12}s` }
                : undefined
            }
          />
        );
      })}

      {NODES.map((n) => {
        const color = n.tone === "growth" ? "var(--color-growth)" : "var(--color-circuit)";
        return (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={n.r * 2.6} fill={color} opacity={0.12} />
            <circle cx={n.x} cy={n.y} r={n.r} fill={color}>
              <animate
                attributeName="opacity"
                values="0.65;1;0.65"
                dur={`${2.6 + n.r * 0.18}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        );
      })}
    </svg>
  );
}
