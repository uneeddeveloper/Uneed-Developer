import { Trophy, TrendingUp, Users } from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { ChartCard } from "@/components/admin/chart-card";
import { SimpleBarChart } from "@/components/admin/charts/simple-bar-chart";
import { SimplePieChart } from "@/components/admin/charts/simple-pie-chart";
import { formatRupiah } from "@/components/admin/chart-theme";
import { getTeamEarnings } from "@/lib/admin/queries";
import { TimClient } from "./tim-client";

export default async function AdminTimPage() {
  const { members, grandTotal } = await getTeamEarnings();
  const avg = members.length > 0 ? grandTotal / members.length : 0;
  const topPerformer = members[0];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Manajemen Tim"
        subtitle={`Total pendapatan terbagi: ${formatRupiah(grandTotal)}`}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr]">
        <ChartCard title="Pendapatan per Anggota" subtitle="Total split per anggota tim">
          <SimpleBarChart data={members.map((m) => ({ name: m.name, value: m.total }))} />
        </ChartCard>
        <ChartCard title="Distribusi Pendapatan" subtitle="Proporsi antar anggota">
          <SimplePieChart
            data={members.map((m) => ({ name: m.name, value: m.total }))}
            currency
          />
        </ChartCard>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={Trophy}
          label="Top Performer"
          value={topPerformer?.name ?? "—"}
          sublabel={topPerformer ? formatRupiah(topPerformer.total) : "Belum ada data"}
          tone="growth"
        />
        <StatCard icon={TrendingUp} label="Rata-rata Pendapatan" value={formatRupiah(avg)} tone="circuit" />
        <StatCard icon={Users} label="Total Anggota" value={String(members.length)} sublabel="anggota tim aktif" />
      </div>

      <TimClient members={members} />
    </div>
  );
}
