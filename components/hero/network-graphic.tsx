const NODES = [
  { id: "a", x: 60, y: 80, r: 6, color: "circuit" },
  { id: "b", x: 180, y: 50, r: 5, color: "circuit" },
  { id: "c", x: 300, y: 100, r: 7, color: "circuit" },
  { id: "d", x: 110, y: 200, r: 8, color: "circuit" },
  { id: "e", x: 260, y: 230, r: 6, color: "growth" },
  { id: "f", x: 340, y: 300, r: 9, color: "growth" },
  { id: "g", x: 150, y: 320, r: 5, color: "growth" },
];

const EDGES: [string, string, boolean?][] = [
  ["a", "b"],
  ["b", "c"],
  ["a", "d"],
  ["b", "d"],
  ["c", "e", true],
  ["d", "e"],
  ["d", "g"],
  ["e", "f", true],
  ["g", "f"],
];

const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));

export function NetworkGraphic() {
  return (
    <svg viewBox="0 0 400 380" className="h-full w-full" aria-hidden="true">
      {EDGES.map(([from, to, animated], i) => {
        const a = byId[from];
        const b = byId[to];
        return (
          <line
            key={`${from}-${to}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={animated ? "var(--color-growth)" : "var(--color-panel-line)"}
            strokeWidth={animated ? 1.5 : 1}
            strokeDasharray={animated ? "4 6" : undefined}
            style={
              animated
                ? { animation: `flow 1.4s linear infinite`, animationDelay: `${i * 0.15}s` }
                : undefined
            }
            opacity={animated ? 0.8 : 0.5}
          />
        );
      })}
      {NODES.map((n) => (
        <circle
          key={n.id}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill={n.color === "growth" ? "var(--color-growth)" : "var(--color-circuit)"}
          opacity={0.9}
        >
          <animate
            attributeName="opacity"
            values="0.6;1;0.6"
            dur={`${2.4 + n.r * 0.2}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}
