import { TrendingUp, TrendingDown, Wallet, Percent } from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { ChartCard } from "@/components/admin/chart-card";
import { SimpleBarChart } from "@/components/admin/charts/simple-bar-chart";
import { formatRupiah } from "@/components/admin/chart-theme";
import { prisma } from "@/lib/prisma";
import { getFinancialSummary, getRevenueByProject, getTopExpenses } from "@/lib/admin/queries";
import { PendapatanClient } from "./pendapatan-client";

export default async function AdminPendapatanPage() {
  const [transactions, members, projects, summary, revenueByProject, topExpenses] = await Promise.all([
    prisma.transaction.findMany({
      orderBy: { date: "desc" },
      include: {
        project: { select: { name: true } },
        splits: { include: { member: { select: { name: true } } } },
      },
    }),
    prisma.teamMember.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
    prisma.project.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
    getFinancialSummary(),
    getRevenueByProject(5),
    getTopExpenses(5),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Manajemen Pendapatan"
        subtitle={`${transactions.length} transaksi • Net: ${formatRupiah(summary.netProfit)}`}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={TrendingUp} label="Total Income" value={formatRupiah(summary.totalIncome)} sublabel="Pemasukan" tone="growth" />
        <StatCard icon={TrendingDown} label="Total Expense" value={formatRupiah(summary.totalExpense)} sublabel="Pengeluaran" tone="warn" />
        <StatCard icon={Wallet} label="Net Revenue" value={formatRupiah(summary.netProfit)} sublabel="Keuntungan bersih" tone="circuit" />
        <StatCard icon={Percent} label="Profit Margin" value={`${summary.marginPct.toFixed(1)}%`} sublabel="Margin keuntungan" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Revenue by Project" subtitle="Top 5 project penghasil revenue">
          <SimpleBarChart data={revenueByProject.map((p) => ({ name: p.name, value: p.total }))} />
        </ChartCard>
        <ChartCard title="Top Expenses" subtitle="5 kategori pengeluaran terbesar">
          <SimpleBarChart
            data={topExpenses.map((e) => ({ name: e.description, value: e.total }))}
            layout="horizontal"
          />
        </ChartCard>
      </div>

      <PendapatanClient transactions={transactions} members={members} projects={projects} />
    </div>
  );
}
