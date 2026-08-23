import { DollarSign, TrendingUp, FolderOpen, Activity } from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { ChartCard } from "@/components/admin/chart-card";
import { RevenueTrendChart } from "@/components/admin/charts/revenue-trend-chart";
import { PerformanceRadar } from "@/components/admin/charts/performance-radar";
import { SimplePieChart } from "@/components/admin/charts/simple-pie-chart";
import { SimpleBarChart } from "@/components/admin/charts/simple-bar-chart";
import { formatRupiah } from "@/components/admin/chart-theme";
import {
  getFinancialSummary,
  getProjectStats,
  getRevenueTrend,
  getTopClients,
  getTeamEarnings,
} from "@/lib/admin/queries";
import { ExportButton } from "./export-button";

export default async function AdminLaporanPage() {
  const [summary, projectStats, trend, topClients, team] = await Promise.all([
    getFinancialSummary(),
    getProjectStats(),
    getRevenueTrend(),
    getTopClients(5),
    getTeamEarnings(),
  ]);

  const performance = [
    { axis: "Revenue", score: Math.min(100, (summary.totalIncome / 10_000_000) * 100) },
    { axis: "Profit", score: Math.min(100, (summary.netProfit / 10_000_000) * 100) },
    { axis: "Projects", score: Math.min(100, (projectStats.total / 20) * 100) },
    { axis: "Active", score: Math.min(100, (projectStats.inProgress / 5) * 100) },
    { axis: "Margin", score: Math.max(0, Math.min(100, summary.marginPct)) },
  ];

  const reportData = { generatedAt: new Date().toISOString(), summary, projectStats, trend, topClients, team };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Laporan Komprehensif"
        subtitle="Ringkasan lengkap performa bisnis & analytics"
        action={<ExportButton data={reportData} />}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={DollarSign} label="Total Revenue" value={formatRupiah(summary.totalIncome)} sublabel="Pendapatan total" tone="growth" />
        <StatCard icon={TrendingUp} label="Net Profit" value={formatRupiah(summary.netProfit)} sublabel={`Margin: ${summary.marginPct.toFixed(1)}%`} tone="circuit" />
        <StatCard icon={FolderOpen} label="Total Projects" value={String(projectStats.total)} sublabel={`${projectStats.completed} selesai`} />
        <StatCard icon={Activity} label="Avg Project Value" value={formatRupiah(projectStats.avgValue)} sublabel="Per project" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <ChartCard title="Revenue & Profit Trend" subtitle="Tren pendapatan bulanan">
          <RevenueTrendChart data={trend} />
        </ChartCard>
        <ChartCard title="Performance Score" subtitle="Overall business metrics">
          <PerformanceRadar data={performance} />
        </ChartCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Project Status" subtitle="Distribusi status project">
          <SimplePieChart
            data={[
              { name: "Completed", value: projectStats.completed },
              { name: "In Progress", value: projectStats.inProgress },
            ]}
          />
        </ChartCard>
        <ChartCard title="Income vs Expense" subtitle="Perbandingan pemasukan & pengeluaran">
          <SimplePieChart
            data={[
              { name: "Income", value: summary.totalIncome },
              { name: "Expense", value: summary.totalExpense },
            ]}
            currency
          />
        </ChartCard>
        <ChartCard title="Top Clients" subtitle="5 klien dengan value tertinggi">
          <SimpleBarChart data={topClients.map((c) => ({ name: c.name, value: c.total }))} layout="horizontal" />
        </ChartCard>
      </div>
    </div>
  );
}
