"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Plus, Pencil, ExternalLink, ImageOff, Camera } from "lucide-react";
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
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [pending, startTransition] = useTransition();

  const filtered = items.filter((i) =>
    `${i.title} ${i.category.name} ${i.description}`.toLowerCase().includes(query.toLowerCase())
  );

  function isValidImage(src: string) {
    return src.startsWith("/") || /^https?:\/\//.test(src);
  }

  function openEdit(item: Item | "new") {
    setError(null);
    setEditing(item);
    setImageUrl(item !== "new" ? item.image : "");
    setLinkUrl(item !== "new" ? item.link ?? "" : "");
  }

  /** Uses WordPress's free mshots service — no API key, no upload backend —
   * to grab a live screenshot of the linked site's homepage as the thumbnail. */
  function screenshotFromLink() {
    if (!linkUrl.trim()) return;
    // `t` busts the browser's own cache so re-clicking re-checks mshots for
    // the real screenshot once it's done generating (see hint text below).
    setImageUrl(`https://s.wordpress.com/mshots/v1/${encodeURIComponent(linkUrl.trim())}?w=1200&h=750&t=${Date.now()}`);
  }

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        if (editing === "new") {
          await createPortfolioItem(formData);
        } else if (editing) {
          await updatePortfolioItem(editing.id, formData);
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
          placeholder="Cari judul, kategori, atau deskripsi..."
          className="w-full max-w-sm rounded-lg border border-white/10 bg-ink/60 px-3 py-2.5 text-sm text-text-hi placeholder:text-text-lo/60 outline-none focus:border-circuit/70 sm:w-auto"
        />
        <Button variant="primary" onClick={() => openEdit("new")} disabled={categories.length === 0}>
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
            <div className="relative flex h-20 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-ink">
              {isValidImage(item.image) ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="112px"
                  unoptimized={!item.image.startsWith("/")}
                  className="object-cover object-top"
                />
              ) : (
                <ImageOff size={20} className="text-text-lo" />
              )}
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
                    onClick={() => openEdit(item)}
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
        onClose={() => {
          setEditing(null);
          setError(null);
        }}
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
          <Field label="Link Website (opsional)">
            <div className="flex gap-2">
              <TextInput
                name="link"
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://..."
                className="flex-1"
              />
              <button
                type="button"
                onClick={screenshotFromLink}
                disabled={!linkUrl.trim()}
                className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-white/10 px-3 text-xs font-medium text-text-hi transition-colors hover:border-circuit/60 hover:text-circuit disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Camera size={13} />
                Ambil Screenshot
              </button>
            </div>
            <p className="mt-1 text-[11px] text-text-lo">
              Screenshot butuh beberapa detik untuk website yang baru pertama kali diambil — klik lagi kalau preview masih kosong/placeholder.
            </p>
          </Field>
          <Field label="URL Gambar">
            <div className="flex gap-3">
              <TextInput
                name="image"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="/portfolio/nama.webp atau klik Ambil Screenshot di atas"
                className="flex-1"
              />
              <div className="relative h-11 w-16 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-ink">
                {isValidImage(imageUrl) ? (
                  <Image
                    src={imageUrl}
                    alt="Preview"
                    fill
                    sizes="64px"
                    unoptimized={!imageUrl.startsWith("/")}
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <ImageOff size={14} className="text-text-lo" />
                  </div>
                )}
              </div>
            </div>
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
