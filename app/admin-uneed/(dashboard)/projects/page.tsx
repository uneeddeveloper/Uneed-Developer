import { CheckCircle2, Clock, DollarSign, Gauge } from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { ChartCard, ChartEmpty } from "@/components/admin/chart-card";
import { SimplePieChart } from "@/components/admin/charts/simple-pie-chart";
import { SimpleBarChart } from "@/components/admin/charts/simple-bar-chart";
import { formatRupiah } from "@/components/admin/chart-theme";
import { prisma } from "@/lib/prisma";
import { getProjectStats, getTopProjects, getTopClients, getUpcomingDeadlines } from "@/lib/admin/queries";
import { ProjectsClient } from "./projects-client";

export default async function AdminProjectsPage() {
  const [projects, stats, topProjects, topClients, deadlines] = await Promise.all([
    prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      include: { client: { select: { name: true } } },
    }),
    getProjectStats(),
    getTopProjects(5),
    getTopClients(5),
    getUpcomingDeadlines(30),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Manajemen Project"
        subtitle={`Total: ${stats.total} project • Value: ${formatRupiah(stats.totalValue)}`}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={CheckCircle2}
          label="Completed"
          value={String(stats.completed)}
          sublabel={formatRupiah(stats.completedValue)}
          tone="growth"
        />
        <StatCard
          icon={Clock}
          label="In Progress"
          value={String(stats.inProgress)}
          sublabel={formatRupiah(stats.inProgressValue)}
          tone="circuit"
        />
        <StatCard icon={DollarSign} label="Total Value" value={formatRupiah(stats.totalValue)} sublabel="All projects" />
        <StatCard icon={Gauge} label="Avg Value" value={formatRupiah(stats.avgValue)} sublabel="Per project" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Project Status" subtitle="Distribusi status project">
          <SimplePieChart
            data={[
              { name: "Completed", value: stats.completed },
              { name: "In Progress", value: stats.inProgress },
            ]}
          />
        </ChartCard>
        <ChartCard title="Top Projects" subtitle="5 project dengan value tertinggi">
          <SimpleBarChart data={topProjects.map((p) => ({ name: p.name, value: p.value }))} />
        </ChartCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Top Clients" subtitle="Klien dengan project bernilai tertinggi">
          <SimpleBarChart
            data={topClients.map((c) => ({ name: c.name, value: c.total }))}
            layout="horizontal"
          />
        </ChartCard>
        <ChartCard title="Upcoming Deadlines" subtitle="Deadline dalam 30 hari ke depan">
          {deadlines.length === 0 ? (
            <ChartEmpty label="Tidak ada deadline mendekati" />
          ) : (
            <div className="flex flex-col gap-2">
              {deadlines.map((d) => (
                <div key={d.id} className="flex items-center justify-between rounded-lg border border-white/8 bg-ink/40 px-3 py-2.5 text-sm">
                  <span className="text-text-hi">{d.name}</span>
                  <span className="text-xs text-text-lo">
                    {d.deadline && new Date(d.deadline).toLocaleDateString("id-ID")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </ChartCard>
      </div>

      <ProjectsClient projects={projects} />
    </div>
  );
}
