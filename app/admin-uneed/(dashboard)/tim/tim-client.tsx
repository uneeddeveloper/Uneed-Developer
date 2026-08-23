"use client";

import { useState, useTransition } from "react";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/admin/modal";
import { Field, TextInput } from "@/components/admin/form-field";
import { DeleteButton } from "@/components/admin/delete-button";
import { formatRupiah } from "@/components/admin/chart-theme";
import { createTeamMember, updateTeamMember, deleteTeamMember } from "@/lib/admin/actions/team";

type Member = {
  id: string;
  name: string;
  role: string;
  total: number;
};

export function TimClient({ members }: { members: Member[] }) {
  const [editing, setEditing] = useState<Member | "new" | null>(null);
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const filtered = members.filter((m) =>
    `${m.name} ${m.role}`.toLowerCase().includes(query.toLowerCase())
  );

  function openEdit(member: Member | "new") {
    setError(null);
    setEditing(member);
  }

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        if (editing === "new") {
          await createTeamMember(formData);
        } else if (editing) {
          await updateTeamMember(editing.id, formData);
        }
        setEditing(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Gagal menyimpan.");
      }
    });
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari nama atau role anggota..."
          className="w-full max-w-sm rounded-lg border border-white/10 bg-ink/60 px-3 py-2.5 text-sm text-text-hi placeholder:text-text-lo/60 outline-none focus:border-circuit/70 sm:w-auto"
        />
        <Button variant="primary" onClick={() => openEdit("new")}>
          <Plus size={16} />
          Tambah Anggota
        </Button>
      </div>

      <div className="glass mt-4 overflow-hidden rounded-2xl">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/5 font-mono text-[11px] uppercase tracking-[0.08em] text-text-lo">
              <th className="px-5 py-3.5 font-normal">Nama</th>
              <th className="px-5 py-3.5 font-normal">Role</th>
              <th className="px-5 py-3.5 font-normal">Total Pendapatan</th>
              <th className="px-5 py-3.5 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-text-lo">
                  Tidak ada anggota ditemukan.
                </td>
              </tr>
            )}
            {filtered.map((m) => (
              <tr key={m.id} className="border-b border-white/5 last:border-0">
                <td className="px-5 py-3.5 text-text-hi">{m.name}</td>
                <td className="px-5 py-3.5">
                  <span className="rounded-full border border-circuit-dim/50 bg-circuit/10 px-2.5 py-1 font-mono text-[10px] uppercase text-circuit">
                    {m.role}
                  </span>
                </td>
                <td className="px-5 py-3.5 font-medium text-growth">
                  {formatRupiah(m.total)}
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => openEdit(m)}
                      aria-label="Edit"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-text-lo transition-colors hover:bg-white/5 hover:text-text-hi"
                    >
                      <Pencil size={14} />
                    </button>
                    <DeleteButton action={deleteTeamMember.bind(null, m.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={editing !== null}
        onClose={() => {
          setEditing(null);
          setError(null);
        }}
        title={editing === "new" ? "Tambah Anggota" : "Edit Anggota"}
      >
        <form action={handleSubmit} className="flex flex-col gap-4">
          <Field label="Nama Lengkap">
            <TextInput
              name="name"
              required
              defaultValue={editing !== "new" ? editing?.name : ""}
              placeholder="Nama anggota"
            />
          </Field>
          <Field label="Role">
            <TextInput
              name="role"
              required
              defaultValue={editing !== "new" ? editing?.role ?? "Developer" : "Developer"}
              placeholder="Developer"
            />
          </Field>
          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
              {error}
            </p>
          )}
          <Button type="submit" variant="primary" className="mt-2 justify-center" disabled={pending}>
            {pending ? "Menyimpan..." : "Simpan"}
          </Button>
        </form>
      </Modal>
    </>
  );
}
