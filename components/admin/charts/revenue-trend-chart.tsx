"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { CHART, chartAxisProps, chartTooltipStyle, formatRupiah, formatRupiahShort } from "../chart-theme";
import { ChartEmpty } from "../chart-card";

export function RevenueTrendChart({
  data,
}: {
  data: { label: string; monthly: number; cumulative: number }[];
}) {
  const hasData = data.some((d) => d.monthly > 0);
  if (!hasData) return <ChartEmpty label="Belum ada transaksi income tercatat" />;

  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ left: -12, right: 12, top: 8 }}>
        <defs>
          <linearGradient id="monthlyFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={CHART.circuit} stopOpacity={0.35} />
            <stop offset="100%" stopColor={CHART.circuit} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={CHART.panelLine} vertical={false} />
        <XAxis dataKey="label" {...chartAxisProps} />
        <YAxis {...chartAxisProps} tickFormatter={formatRupiahShort} width={56} />
        <Tooltip {...chartTooltipStyle} formatter={(v) => formatRupiah(Number(v))} />
        <Legend wrapperStyle={{ fontSize: 12, color: CHART.textLo }} />
        <Area
          type="monotone"
          dataKey="cumulative"
          name="Kumulatif"
          stroke={CHART.growth}
          strokeWidth={2}
          fill="transparent"
          dot={{ r: 3, fill: CHART.growth, strokeWidth: 0 }}
        />
        <Area
          type="monotone"
          dataKey="monthly"
          name="Bulanan"
          stroke={CHART.circuit}
          strokeWidth={2}
          fill="url(#monthlyFill)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
