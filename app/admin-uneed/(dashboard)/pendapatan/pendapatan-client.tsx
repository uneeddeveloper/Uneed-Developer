"use client";

import { useState, useTransition } from "react";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/admin/modal";
import { Field, TextInput, TextArea, Select } from "@/components/admin/form-field";
import { DeleteButton } from "@/components/admin/delete-button";
import { formatRupiah } from "@/components/admin/chart-theme";
import { createTransaction, updateTransaction, deleteTransaction } from "@/lib/admin/actions/transactions";

type Split = { memberId: string; amount: number; member: { name: string } };
type Transaction = {
  id: string;
  type: string;
  description: string;
  amount: number;
  date: Date;
  projectId: string | null;
  project: { name: string } | null;
  splits: Split[];
};
type Member = { id: string; name: string };
type ProjectOption = { id: string; name: string };

export function PendapatanClient({
  transactions,
  members,
  projects,
}: {
  transactions: Transaction[];
  members: Member[];
  projects: ProjectOption[];
}) {
  const [editing, setEditing] = useState<Transaction | "new" | null>(null);
  const [type, setType] = useState<"income" | "expense">("income");
  const [query, setQuery] = useState("");
  const [pending, startTransition] = useTransition();

  const filtered = transactions.filter((t) =>
    `${t.description} ${t.project?.name ?? ""}`.toLowerCase().includes(query.toLowerCase())
  );

  function openEdit(t: Transaction | "new") {
    setType(t === "new" ? "income" : (t.type as "income" | "expense"));
    setEditing(t);
  }

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      if (editing === "new") {
        await createTransaction(formData);
      } else if (editing) {
        await updateTransaction(editing.id, formData);
      }
      setEditing(null);
    });
  }

  function splitDefault(memberId: string) {
    if (editing === "new" || !editing) return "";
    const existing = editing.splits.find((s) => s.memberId === memberId);
    return existing ? String(existing.amount) : "";
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari transaksi, deskripsi, atau project..."
          className="w-full max-w-sm rounded-lg border border-white/10 bg-ink/60 px-3 py-2.5 text-sm text-text-hi placeholder:text-text-lo/60 outline-none focus:border-circuit/70 sm:w-auto"
        />
        <Button variant="primary" onClick={() => openEdit("new")}>
          <Plus size={16} />
          Catat Transaksi
        </Button>
      </div>

      <div className="glass mt-4 overflow-x-auto rounded-2xl">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/5 font-mono text-[11px] uppercase tracking-[0.08em] text-text-lo">
              <th className="px-5 py-3.5 font-normal">Tanggal</th>
              <th className="px-5 py-3.5 font-normal">Deskripsi</th>
              <th className="px-5 py-3.5 font-normal">Project</th>
              <th className="px-5 py-3.5 font-normal">Pembagian</th>
              <th className="px-5 py-3.5 font-normal">Jumlah</th>
              <th className="px-5 py-3.5 font-normal text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-text-lo">
                  Belum ada transaksi.
                </td>
              </tr>
            )}
            {filtered.map((t) => (
              <tr key={t.id} className="border-b border-white/5 last:border-0 align-top">
                <td className="px-5 py-3.5 text-text-lo">
                  {new Date(t.date).toLocaleDateString("id-ID")}
                </td>
                <td className="px-5 py-3.5 text-text-hi">{t.description}</td>
                <td className="px-5 py-3.5 text-text-lo">{t.project?.name ?? "—"}</td>
                <td className="px-5 py-3.5 text-xs text-text-lo">
                  {t.splits.length === 0
                    ? "—"
                    : t.splits.map((s) => (
                        <div key={s.memberId}>
                          {s.member.name}: {formatRupiah(s.amount)}
                        </div>
                      ))}
                </td>
                <td className="px-5 py-3.5 font-medium">
                  <span className={t.type === "income" ? "text-growth" : "text-red-400"}>
                    {t.type === "income" ? "+ " : "- "}
                    {formatRupiah(t.amount)}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => openEdit(t)}
                      aria-label="Edit"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-text-lo transition-colors hover:bg-white/5 hover:text-text-hi"
                    >
                      <Pencil size={14} />
                    </button>
                    <DeleteButton action={deleteTransaction.bind(null, t.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={editing === "new" ? "Catat Transaksi" : "Edit Transaksi"}
      >
        <form action={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Tipe">
              <Select
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value as "income" | "expense")}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </Select>
            </Field>
            <Field label="Jumlah (Rp)">
              <TextInput
                name="amount"
                type="number"
                min={0}
                required
                defaultValue={editing !== "new" ? editing?.amount : ""}
              />
            </Field>
          </div>
          <Field label="Deskripsi">
            <TextArea
              name="description"
              required
              rows={2}
              defaultValue={editing !== "new" ? editing?.description : ""}
              placeholder="mis. Pelunasan project XYZ"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Tanggal">
              <TextInput
                name="date"
                type="date"
                required
                defaultValue={
                  editing !== "new" && editing
                    ? new Date(editing.date).toISOString().slice(0, 10)
                    : new Date().toISOString().slice(0, 10)
                }
              />
            </Field>
            <Field label="Project (opsional)">
              <Select name="projectId" defaultValue={editing !== "new" ? editing?.projectId ?? "" : ""}>
                <option value="">— Tanpa project —</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          {type === "income" && (
            <div>
              <span className="text-xs text-text-lo">Pembagian per Anggota (opsional)</span>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {members.map((m) => (
                  <label key={m.id} className="flex items-center gap-2 text-xs text-text-lo">
                    <span className="w-28 shrink-0 truncate">{m.name}</span>
                    <TextInput
                      name={`split_${m.id}`}
                      type="number"
                      min={0}
                      defaultValue={splitDefault(m.id)}
                      placeholder="0"
                      className="py-1.5"
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          <Button type="submit" variant="primary" className="mt-2 justify-center" disabled={pending}>
            {pending ? "Menyimpan..." : "Simpan"}
          </Button>
        </form>
      </Modal>
    </>
  );
}
