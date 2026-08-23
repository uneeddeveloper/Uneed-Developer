"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { CHART, CHART_SERIES, chartAxisProps, chartTooltipStyle, formatRupiah, formatRupiahShort } from "../chart-theme";
import { ChartEmpty } from "../chart-card";

export function SimpleBarChart({
  data,
  valueFormatter = formatRupiah,
  layout = "vertical",
}: {
  data: { name: string; value: number }[];
  valueFormatter?: (v: number) => string;
  /** "vertical" = bars stand up (categories on X); "horizontal" = bars lie flat (categories on Y). */
  layout?: "vertical" | "horizontal";
}) {
  if (data.length === 0) return <ChartEmpty />;

  if (layout === "horizontal") {
    return (
      <ResponsiveContainer width="100%" height={Math.max(180, data.length * 44)}>
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 24 }}>
          <CartesianGrid stroke={CHART.panelLine} horizontal={false} />
          <XAxis type="number" {...chartAxisProps} tickFormatter={formatRupiahShort} />
          <YAxis type="category" dataKey="name" {...chartAxisProps} width={90} />
          <Tooltip {...chartTooltipStyle} formatter={(v) => valueFormatter(Number(v))} />
          <Bar dataKey="value" radius={[0, 6, 6, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={CHART_SERIES[i % CHART_SERIES.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ left: -12, right: 12 }}>
        <CartesianGrid stroke={CHART.panelLine} vertical={false} />
        <XAxis dataKey="name" {...chartAxisProps} interval={0} angle={-20} textAnchor="end" height={50} />
        <YAxis {...chartAxisProps} tickFormatter={formatRupiahShort} width={56} />
        <Tooltip {...chartTooltipStyle} formatter={(v) => valueFormatter(Number(v))} />
        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={CHART_SERIES[i % CHART_SERIES.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
