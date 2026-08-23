"use client";

import { useState, useTransition } from "react";
import { Plus, Pencil, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/admin/modal";
import { Field, TextInput, Select } from "@/components/admin/form-field";
import { DeleteButton } from "@/components/admin/delete-button";
import { formatRupiah } from "@/components/admin/chart-theme";
import { createProject, updateProject, deleteProject } from "@/lib/admin/actions/projects";

type Project = {
  id: string;
  name: string;
  category: string;
  status: string;
  value: number;
  deadline: Date | null;
  client: { name: string } | null;
};

export function ProjectsClient({ projects }: { projects: Project[] }) {
  const [editing, setEditing] = useState<Project | "new" | null>(null);
  const [query, setQuery] = useState("");
  const [pending, startTransition] = useTransition();

  const filtered = projects.filter((p) =>
    `${p.name} ${p.category} ${p.client?.name ?? ""}`.toLowerCase().includes(query.toLowerCase())
  );

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      if (editing === "new") {
        await createProject(formData);
      } else if (editing) {
        await updateProject(editing.id, formData);
      }
      setEditing(null);
    });
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari nama project, kategori, atau klien..."
          className="w-full max-w-sm rounded-lg border border-white/10 bg-ink/60 px-3 py-2.5 text-sm text-text-hi placeholder:text-text-lo/60 outline-none focus:border-circuit/70 sm:w-auto"
        />
        <Button variant="primary" onClick={() => setEditing("new")}>
          <Plus size={16} />
          Project Baru
        </Button>
      </div>

      <div className="glass mt-4 overflow-x-auto rounded-2xl">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/5 font-mono text-[11px] uppercase tracking-[0.08em] text-text-lo">
              <th className="px-5 py-3.5 font-normal">Project</th>
              <th className="px-5 py-3.5 font-normal">Klien</th>
              <th className="px-5 py-3.5 font-normal">Status</th>
              <th className="px-5 py-3.5 font-normal">Value</th>
              <th className="px-5 py-3.5 font-normal">Deadline</th>
              <th className="px-5 py-3.5 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-text-lo">
                  Tidak ada project ditemukan.
                </td>
              </tr>
            )}
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-white/5 last:border-0">
                <td className="px-5 py-3.5">
                  <div className="text-text-hi">{p.name}</div>
                  <div className="text-xs text-text-lo">{p.category}</div>
                </td>
                <td className="px-5 py-3.5 text-text-lo">{p.client?.name ?? "—"}</td>
                <td className="px-5 py-3.5">
                  <span
                    className={
                      p.status === "completed"
                        ? "rounded-full bg-growth/15 px-2.5 py-1 font-mono text-[10px] uppercase text-growth"
                        : "rounded-full bg-circuit/15 px-2.5 py-1 font-mono text-[10px] uppercase text-circuit"
                    }
                  >
                    {p.status === "completed" ? "Completed" : "In Progress"}
                  </span>
                </td>
                <td className="px-5 py-3.5 font-medium text-text-hi">{formatRupiah(p.value)}</td>
                <td className="px-5 py-3.5 text-text-lo">
                  {p.deadline ? (
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {new Date(p.deadline).toLocaleDateString("id-ID")}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => setEditing(p)}
                      aria-label="Edit"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-text-lo transition-colors hover:bg-white/5 hover:text-text-hi"
                    >
                      <Pencil size={14} />
                    </button>
                    <DeleteButton action={deleteProject.bind(null, p.id)} />
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
        title={editing === "new" ? "Project Baru" : "Edit Project"}
      >
        <form action={handleSubmit} className="flex flex-col gap-4">
          <Field label="Nama Project">
            <TextInput
              name="name"
              required
              defaultValue={editing !== "new" ? editing?.name : ""}
              placeholder="mis. Website Company Profile"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Kategori">
              <TextInput
                name="category"
                required
                defaultValue={editing !== "new" ? editing?.category : ""}
                placeholder="mis. Web App"
              />
            </Field>
            <Field label="Klien (opsional)">
              <TextInput
                name="clientName"
                defaultValue={editing !== "new" ? editing?.client?.name ?? "" : ""}
                placeholder="Nama klien"
              />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Status">
              <Select name="status" defaultValue={editing !== "new" ? editing?.status : "in_progress"}>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </Select>
            </Field>
            <Field label="Value (Rp)">
              <TextInput
                name="value"
                type="number"
                min={0}
                required
                defaultValue={editing !== "new" ? editing?.value : 0}
              />
            </Field>
          </div>
          <Field label="Deadline (opsional)">
            <TextInput
              name="deadline"
              type="date"
              defaultValue={
                editing !== "new" && editing?.deadline
                  ? new Date(editing.deadline).toISOString().slice(0, 10)
                  : ""
              }
            />
          </Field>
          <Button type="submit" variant="primary" className="mt-2 justify-center" disabled={pending}>
            {pending ? "Menyimpan..." : "Simpan"}
          </Button>
        </form>
      </Modal>
    </>
  );
}
