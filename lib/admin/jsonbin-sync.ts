import { prisma } from "@/lib/prisma";

/**
 * Mirrors the old admin's exact JSON shape — flat top-level `transactions[]`
 * referencing `projectId`/`memberId`, `status` as "Completed"/"In Progress" —
 * so a bin this writes stays fully readable by the old live site too, if it's
 * still pointed at the same bin. PortfolioItems are included for that same
 * reason (the old site reads them), but Force Download never writes them
 * back into this app's own Portfolio CMS — that data has its own admin page
 * with real foreign keys a wholesale restore here could break.
 */
export async function exportSnapshot() {
  const [teamMembers, portfolioItems, projects] = await Promise.all([
    prisma.teamMember.findMany({ orderBy: { name: "asc" } }),
    prisma.portfolioItem.findMany({ include: { category: true }, orderBy: { order: "asc" } }),
    prisma.project.findMany({
      include: { client: true, transactions: { include: { splits: true } } },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  return {
    projects: projects.map((p) => ({
      id: p.id,
      name: p.name,
      client: p.client?.name ?? "",
      value: p.value,
      status: p.status === "completed" ? "Completed" : "In Progress",
      deadline: p.deadline ? p.deadline.toISOString().slice(0, 10) : null,
    })),
    transactions: projects.flatMap((p) =>
      p.transactions.map((t) => ({
        id: t.id,
        date: t.date.toISOString().slice(0, 10),
        description: t.description,
        amount: t.amount,
        projectId: p.id,
        type: t.type === "income" ? "Income" : "Expense",
        splits: t.splits.map((s) => ({ memberId: s.memberId, amount: s.amount })),
      }))
    ),
    teamMembers: teamMembers.map((m) => ({ id: m.id, name: m.name, role: m.role })),
    portfolioItems: portfolioItems.map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category.name,
      description: p.description,
      link: p.link ?? "",
    })),
    lastUpdated: new Date().toISOString(),
  };
}

type SnapshotSplit = { memberName?: string; memberId?: string; amount: number };
type SnapshotTransaction = {
  id?: string;
  type?: string;
  description?: string;
  amount: number;
  date?: string;
  projectId?: string; // old admin's flat shape: references a project's old id
  splits?: SnapshotSplit[];
};
type SnapshotProject = {
  id?: string; // old admin's shape carries its own id here
  name: string;
  category?: string;
  client?: string | null;
  value: number;
  status?: string;
  deadline?: string | null;
  transactions?: SnapshotTransaction[]; // our own export nests them here
};
type Snapshot = {
  teamMembers?: { id?: string; name: string; role?: string }[];
  projects?: SnapshotProject[];
  transactions?: SnapshotTransaction[]; // old admin's shape: flat, top-level
};

function mapStatus(status: string | undefined) {
  if (!status) return "in_progress";
  const s = status.toLowerCase();
  return s.includes("complete") ? "completed" : "in_progress";
}

/** Replaces all Projects/Transactions/Clients with the snapshot's data.
 * TeamMembers are upserted by name (never deleted — split history elsewhere
 * may still reference them). Understands both the old admin's flat shape
 * (top-level `transactions[]` referencing `projectId`/`memberId` by old id)
 * and this app's own nested-export shape. */
export async function importSnapshot(data: Snapshot) {
  const memberIdByOldId = new Map<string, string>();
  const memberIdByName = new Map<string, string>();
  for (const m of data.teamMembers ?? []) {
    let member = await prisma.teamMember.findFirst({ where: { name: m.name } });
    if (!member) {
      member = await prisma.teamMember.create({ data: { name: m.name, role: m.role || "Developer" } });
    }
    memberIdByName.set(m.name, member.id);
    if (m.id) memberIdByOldId.set(m.id, member.id);
  }
  function resolveMemberId(s: SnapshotSplit) {
    if (s.memberId && memberIdByOldId.has(s.memberId)) return memberIdByOldId.get(s.memberId);
    if (s.memberName && memberIdByName.has(s.memberName)) return memberIdByName.get(s.memberName);
    return undefined;
  }

  await prisma.transactionSplit.deleteMany({});
  await prisma.transaction.deleteMany({});
  await prisma.project.deleteMany({});

  const clientIdByName = new Map<string, string>();
  async function resolveClientId(name: string | null | undefined) {
    if (!name) return null;
    if (clientIdByName.has(name)) return clientIdByName.get(name)!;
    let client = await prisma.client.findFirst({ where: { name } });
    if (!client) client = await prisma.client.create({ data: { name } });
    clientIdByName.set(name, client.id);
    return client.id;
  }

  const oldProjectIdToNewId = new Map<string, string>();
  let transactionCount = 0;

  for (const p of data.projects ?? []) {
    const clientId = await resolveClientId(p.client);
    const created = await prisma.project.create({
      data: {
        name: p.name,
        category: p.category || "Lainnya",
        status: mapStatus(p.status),
        value: p.value,
        clientId,
        deadline: p.deadline ? new Date(p.deadline) : null,
        transactions: {
          create: (p.transactions ?? []).map((t) => ({
            type: (t.type || "income").toLowerCase(),
            description: t.description || "Pelunasan",
            amount: t.amount,
            date: t.date ? new Date(t.date) : new Date(),
            splits: {
              create: (t.splits ?? [])
                .map((s) => ({ memberId: resolveMemberId(s), amount: s.amount }))
                .filter((s): s is { memberId: string; amount: number } => !!s.memberId && s.amount > 0),
            },
          })),
        },
      },
    });
    if (p.id) oldProjectIdToNewId.set(p.id, created.id);
    transactionCount += p.transactions?.length ?? 0;
  }

  // old admin's flat shape: a separate top-level transactions[] array
  for (const t of data.transactions ?? []) {
    const projectId = t.projectId ? oldProjectIdToNewId.get(t.projectId) : undefined;
    if (!projectId) continue;
    await prisma.transaction.create({
      data: {
        type: (t.type || "income").toLowerCase(),
        description: t.description || "Pelunasan",
        amount: t.amount,
        date: t.date ? new Date(t.date) : new Date(),
        projectId,
        splits: {
          create: (t.splits ?? [])
            .map((s) => ({ memberId: resolveMemberId(s), amount: s.amount }))
            .filter((s): s is { memberId: string; amount: number } => !!s.memberId && s.amount > 0),
        },
      },
    });
    transactionCount += 1;
  }

  return { projects: data.projects?.length ?? 0, transactions: transactionCount };
}
