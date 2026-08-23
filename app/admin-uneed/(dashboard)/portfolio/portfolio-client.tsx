"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Plus, Pencil, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/admin/modal";
import { Field, TextInput, TextArea, Select } from "@/components/admin/form-field";
import { DeleteButton } from "@/components/admin/delete-button";
import {
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} from "@/lib/admin/actions/portfolio";

type Category = { id: string; name: string };

type Item = {
  id: string;
  slug: string;
  title: string;
  type: string;
  categoryId: string;
  category: { name: string };
  description: string;
  detail: string;
  link: string | null;
  image: string;
};

export function PortfolioClient({
  items,
  categories,
}: {
  items: Item[];
  categories: Category[];
}) {
  const [editing, setEditing] = useState<Item | "new" | null>(null);
  const [query, setQuery] = useState("");
  const [pending, startTransition] = useTransition();

  const filtered = items.filter((i) =>
    `${i.title} ${i.category.name} ${i.description}`.toLowerCase().includes(query.toLowerCase())
  );

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      if (editing === "new") {
        await createPortfolioItem(formData);
      } else if (editing) {
        await updatePortfolioItem(editing.id, formData);
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
          placeholder="Cari judul, kategori, atau deskripsi..."
          className="w-full max-w-sm rounded-lg border border-white/10 bg-ink/60 px-3 py-2.5 text-sm text-text-hi placeholder:text-text-lo/60 outline-none focus:border-circuit/70 sm:w-auto"
        />
        <Button variant="primary" onClick={() => setEditing("new")} disabled={categories.length === 0}>
          <Plus size={16} />
          Tambah Portfolio
        </Button>
      </div>

      {categories.length === 0 && (
        <p className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-400">
          Belum ada kategori layanan. Buat kategori dulu di halaman Layanan sebelum menambah portfolio.
        </p>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {filtered.map((item) => (
          <div key={item.id} className="glass flex min-w-0 gap-4 rounded-2xl p-4">
            <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-ink">
              <Image src={item.image} alt={item.title} fill sizes="112px" className="object-cover object-top" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-circuit">
                    {item.type} · {item.category.name}
                  </span>
                  <h3 className="truncate font-display text-sm font-bold text-text-hi">
                    {item.title}
                  </h3>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setEditing(item)}
                    aria-label="Edit"
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-text-lo transition-colors hover:bg-white/5 hover:text-text-hi"
                  >
                    <Pencil size={13} />
                  </button>
                  <DeleteButton action={deletePortfolioItem.bind(null, item.id)} />
                </div>
              </div>
              <p className="mt-1 line-clamp-2 text-xs text-text-lo">{item.description}</p>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 flex w-full min-w-0 items-center gap-1 text-[11px] text-circuit hover:text-growth"
                >
                  <ExternalLink size={11} className="shrink-0" />
                  <span className="min-w-0 truncate">{item.link}</span>
                </a>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-10 text-center text-sm text-text-lo">
            Tidak ada portfolio ditemukan.
          </p>
        )}
      </div>

      <Modal
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={editing === "new" ? "Tambah Portfolio" : "Edit Portfolio"}
      >
        <form action={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Judul">
              <TextInput
                name="title"
                required
                defaultValue={editing !== "new" ? editing?.title : ""}
                placeholder="Nama project"
              />
            </Field>
            <Field label="Tipe">
              <TextInput
                name="type"
                required
                defaultValue={editing !== "new" ? editing?.type : "WEB APP"}
                placeholder="WEB APP"
              />
            </Field>
          </div>
          <Field label="Kategori">
            <Select
              name="categoryId"
              required
              defaultValue={editing !== "new" ? editing?.categoryId : categories[0]?.id}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Deskripsi Singkat">
            <TextInput
              name="description"
              required
              defaultValue={editing !== "new" ? editing?.description : ""}
              placeholder="Tampil di kartu portfolio"
            />
          </Field>
          <Field label="Detail Lengkap">
            <TextArea
              name="detail"
              required
              rows={4}
              defaultValue={editing !== "new" ? editing?.detail : ""}
              placeholder="Tampil di halaman detail project"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="URL Gambar">
              <TextInput
                name="image"
                required
                defaultValue={editing !== "new" ? editing?.image : ""}
                placeholder="/portfolio/nama.webp"
              />
            </Field>
            <Field label="Link Website (opsional)">
              <TextInput
                name="link"
                type="url"
                defaultValue={editing !== "new" ? editing?.link ?? "" : ""}
                placeholder="https://..."
              />
            </Field>
          </div>
          <Button type="submit" variant="primary" className="mt-2 justify-center" disabled={pending}>
            {pending ? "Menyimpan..." : "Simpan"}
          </Button>
        </form>
      </Modal>
    </>
  );
}
