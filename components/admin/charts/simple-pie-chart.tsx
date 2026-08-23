"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { CHART_SERIES, chartTooltipStyle, formatRupiah } from "../chart-theme";
import { ChartEmpty } from "../chart-card";

export function SimplePieChart({
  data,
  currency = false,
}: {
  data: { name: string; value: number }[];
  currency?: boolean;
}) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  if (total === 0) return <ChartEmpty />;

  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={2}
          strokeWidth={0}
          label={({ percent }) => `${Math.round((percent ?? 0) * 100)}%`}
          labelLine={false}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={CHART_SERIES[i % CHART_SERIES.length]} />
          ))}
        </Pie>
        <Tooltip {...chartTooltipStyle} formatter={(v) => (currency ? formatRupiah(Number(v)) : Number(v))} />
        <Legend
          wrapperStyle={{ fontSize: 11 }}
          formatter={(value) => <span style={{ color: "#7c8ca6" }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
