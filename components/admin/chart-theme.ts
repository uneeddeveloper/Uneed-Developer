/**
 * Recharts renders into SVG attributes that don't reliably resolve CSS custom
 * properties across every chart primitive, so the palette is duplicated here
 * as literal hex — keep in sync with the `@theme` tokens in app/globals.css.
 */
export const CHART = {
  circuit: "#3b9eff",
  circuitDim: "#1c4e7d",
  growth: "#3ddc84",
  growthDim: "#1f7a4e",
  panelLine: "#17222f",
  textHi: "#eaf2ff",
  textLo: "#7c8ca6",
  panel: "#0d1622",
  amber: "#f59e0b",
  pink: "#ec4899",
} as const;

/** Rotate through for series that need more than two colors (bars, pies). */
export const CHART_SERIES = [
  CHART.circuit,
  CHART.growth,
  CHART.amber,
  CHART.pink,
  CHART.circuitDim,
];

export const chartTooltipStyle = {
  contentStyle: {
    background: CHART.panel,
    border: `1px solid ${CHART.panelLine}`,
    borderRadius: 12,
    fontSize: 12,
    color: CHART.textHi,
  },
  labelStyle: { color: CHART.textLo },
  itemStyle: { color: CHART.textHi },
};

export const chartAxisProps = {
  stroke: CHART.textLo,
  fontSize: 11,
  tickLine: false,
  axisLine: { stroke: CHART.panelLine },
};

export function formatRupiah(value: number) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

export function formatRupiahShort(value: number) {
  if (Math.abs(value) >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}jt`;
  if (Math.abs(value) >= 1_000) return `${Math.round(value / 1_000)}rb`;
  return `${value}`;
}
