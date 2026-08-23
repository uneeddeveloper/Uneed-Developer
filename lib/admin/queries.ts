import { prisma } from "@/lib/prisma";

const MONTH_LABEL = new Intl.DateTimeFormat("id-ID", { month: "short", year: "2-digit" });

export async function getFinancialSummary() {
  const [income, expense] = await Promise.all([
    prisma.transaction.aggregate({ where: { type: "income" }, _sum: { amount: true } }),
    prisma.transaction.aggregate({ where: { type: "expense" }, _sum: { amount: true } }),
  ]);
  const totalIncome = income._sum.amount ?? 0;
  const totalExpense = expense._sum.amount ?? 0;
  const netProfit = totalIncome - totalExpense;
  const marginPct = totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0;
  return { totalIncome, totalExpense, netProfit, marginPct };
}

export async function getProjectStats() {
  const projects = await prisma.project.findMany({ select: { status: true, value: true } });
  const completed = projects.filter((p) => p.status === "completed");
  const inProgress = projects.filter((p) => p.status === "in_progress");
  const totalValue = projects.reduce((sum, p) => sum + p.value, 0);
  return {
    total: projects.length,
    completed: completed.length,
    inProgress: inProgress.length,
    completedValue: completed.reduce((sum, p) => sum + p.value, 0),
    inProgressValue: inProgress.reduce((sum, p) => sum + p.value, 0),
    totalValue,
    avgValue: projects.length > 0 ? totalValue / projects.length : 0,
  };
}

/** Monthly income for the last N months, plus a running cumulative total. */
export async function getRevenueTrend(months = 7) {
  const since = new Date();
  since.setMonth(since.getMonth() - (months - 1));
  since.setDate(1);
  since.setHours(0, 0, 0, 0);

  const transactions = await prisma.transaction.findMany({
    where: { type: "income", date: { gte: since } },
    select: { amount: true, date: true },
    orderBy: { date: "asc" },
  });

  const buckets = new Map<string, number>();
  for (let i = 0; i < months; i++) {
    const d = new Date(since);
    d.setMonth(d.getMonth() + i);
    buckets.set(`${d.getFullYear()}-${d.getMonth()}`, 0);
  }
  for (const t of transactions) {
    const key = `${t.date.getFullYear()}-${t.date.getMonth()}`;
    if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + t.amount);
  }

  let cumulative = 0;
  return [...buckets.entries()].map(([key, monthly]) => {
    const [year, month] = key.split("-").map(Number);
    cumulative += monthly;
    return {
      label: MONTH_LABEL.format(new Date(year, month, 1)),
      monthly,
      cumulative,
    };
  });
}

export async function getRecentTransactions(limit = 5) {
  return prisma.transaction.findMany({
    orderBy: { date: "desc" },
    take: limit,
    include: { project: { select: { name: true } } },
  });
}

export async function getTopProjects(limit = 5) {
  return prisma.project.findMany({
    orderBy: { value: "desc" },
    take: limit,
    select: { id: true, name: true, value: true },
  });
}

export async function getTopClients(limit = 5) {
  const clients = await prisma.client.findMany({
    include: { projects: { select: { value: true } } },
  });
  return clients
    .map((c) => ({
      id: c.id,
      name: c.name,
      total: c.projects.reduce((sum, p) => sum + p.value, 0),
      count: c.projects.length,
    }))
    .filter((c) => c.total > 0)
    .sort((a, b) => b.total - a.total)
    .slice(0, limit);
}

export async function getTeamEarnings() {
  const members = await prisma.teamMember.findMany({
    include: { splits: { select: { amount: true } } },
  });
  const withTotals = members
    .map((m) => ({
      id: m.id,
      name: m.name,
      role: m.role,
      total: m.splits.reduce((sum, s) => sum + s.amount, 0),
    }))
    .sort((a, b) => b.total - a.total);
  const grandTotal = withTotals.reduce((sum, m) => sum + m.total, 0);
  return { members: withTotals, grandTotal };
}

export async function getUpcomingDeadlines(withinDays = 30) {
  const now = new Date();
  const until = new Date();
  until.setDate(now.getDate() + withinDays);
  return prisma.project.findMany({
    where: { deadline: { gte: now, lte: until }, status: { not: "completed" } },
    orderBy: { deadline: "asc" },
    select: { id: true, name: true, deadline: true, value: true },
  });
}

export async function getTopExpenses(limit = 5) {
  const expenses = await prisma.transaction.groupBy({
    by: ["description"],
    where: { type: "expense" },
    _sum: { amount: true },
    orderBy: { _sum: { amount: "desc" } },
    take: limit,
  });
  return expenses.map((e) => ({ description: e.description, total: e._sum.amount ?? 0 }));
}

export async function getRevenueByProject(limit = 5) {
  const projects = await prisma.project.findMany({
    include: { transactions: { where: { type: "income" }, select: { amount: true } } },
  });
  return projects
    .map((p) => ({
      id: p.id,
      name: p.name,
      total: p.transactions.reduce((sum, t) => sum + t.amount, 0),
    }))
    .filter((p) => p.total > 0)
    .sort((a, b) => b.total - a.total)
    .slice(0, limit);
}
