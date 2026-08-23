"use client";

import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts";
import { CHART, chartTooltipStyle } from "../chart-theme";

export type PerformanceMetric = { axis: string; score: number };

export function PerformanceRadar({ data }: { data: PerformanceMetric[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <RadarChart data={data} outerRadius="72%">
        <PolarGrid stroke={CHART.panelLine} />
        <PolarAngleAxis dataKey="axis" tick={{ fill: CHART.textLo, fontSize: 11 }} />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 100]}
          tick={{ fill: CHART.textLo, fontSize: 9 }}
          axisLine={false}
        />
        <Tooltip {...chartTooltipStyle} />
        <Radar
          dataKey="score"
          stroke={CHART.circuit}
          fill={CHART.circuit}
          fillOpacity={0.28}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
