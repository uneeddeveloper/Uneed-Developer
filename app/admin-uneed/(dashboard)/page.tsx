import { DollarSign, TrendingUp, FolderOpen, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { ChartCard } from "@/components/admin/chart-card";
import { RevenueTrendChart } from "@/components/admin/charts/revenue-trend-chart";
import { PerformanceRadar } from "@/components/admin/charts/performance-radar";
import { formatRupiah } from "@/components/admin/chart-theme";
import {
  getFinancialSummary,
  getProjectStats,
  getRevenueTrend,
  getRecentTransactions,
} from "@/lib/admin/queries";

export default async function AdminOverviewPage() {
  const [summary, projectStats, trend, recent] = await Promise.all([
    getFinancialSummary(),
    getProjectStats(),
    getRevenueTrend(),
    getRecentTransactions(4),
  ]);

  const performance = [
    { axis: "Revenue", score: Math.min(100, (summary.totalIncome / 10_000_000) * 100) },
    { axis: "Projects", score: Math.min(100, (projectStats.total / 20) * 100) },
    { axis: "Active", score: Math.min(100, (projectStats.inProgress / 5) * 100) },
    { axis: "Avg Deal", score: Math.min(100, (projectStats.avgValue / 2_000_000) * 100) },
    { axis: "Margin", score: Math.max(0, Math.min(100, summary.marginPct)) },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Dashboard Overview" subtitle="Ringkasan performa bisnis real-time" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={DollarSign}
          label="Total Revenue"
          value={formatRupiah(summary.totalIncome)}
          sublabel="Pendapatan keseluruhan"
          tone="circuit"
        />
        <StatCard
          icon={TrendingUp}
          label="Net Profit"
          value={formatRupiah(summary.netProfit)}
          sublabel="Keuntungan bersih"
          tone="growth"
        />
        <StatCard
          icon={FolderOpen}
          label="Active Projects"
          value={String(projectStats.inProgress)}
          sublabel="Sedang dikerjakan"
          tone="neutral"
        />
        <StatCard
          icon={CheckCircle2}
          label="Completed"
          value={String(projectStats.completed)}
          sublabel="Project selesai"
          tone="neutral"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <ChartCard title="Revenue Trend" subtitle="Pendapatan bulanan & kumulatif">
          <RevenueTrendChart data={trend} />
        </ChartCard>
        <ChartCard title="Performance Score" subtitle="Analisis performa bisnis">
          <PerformanceRadar data={performance} />
        </ChartCard>
      </div>

      <ChartCard title="Recent Transactions" subtitle={`${recent.length} transaksi terbaru`}>
        {recent.length === 0 ? (
          <p className="py-8 text-center text-sm text-text-lo">Belum ada transaksi tercatat.</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {recent.map((t) => (
              <div key={t.id} className="rounded-xl border border-white/8 bg-ink/40 p-4">
                <span
                  className={
                    t.type === "income"
                      ? "rounded-full bg-growth/15 px-2 py-0.5 font-mono text-[10px] uppercase text-growth"
                      : "rounded-full bg-red-500/15 px-2 py-0.5 font-mono text-[10px] uppercase text-red-400"
                  }
                >
                  {t.type === "income" ? "Income" : "Expense"}
                </span>
                <div className="mt-2 text-sm font-medium text-text-hi">{t.description}</div>
                {t.project && <div className="text-xs text-text-lo">{t.project.name}</div>}
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-text-lo">
                    {t.date.toLocaleDateString("id-ID")}
                  </span>
                  <span className={t.type === "income" ? "text-sm font-medium text-growth" : "text-sm font-medium text-red-400"}>
                    {t.type === "income" ? "+" : "-"}
                    {formatRupiah(t.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </ChartCard>
    </div>
  );
}
