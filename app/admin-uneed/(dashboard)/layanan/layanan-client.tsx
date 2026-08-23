"use client";

import { useState, useTransition } from "react";
import { Plus, Pencil, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/admin/modal";
import { Field, TextInput, TextArea } from "@/components/admin/form-field";
import { DeleteButton } from "@/components/admin/delete-button";
import {
  createServiceCategory,
  updateServiceCategory,
  deleteServiceCategory,
  createService,
  updateService,
  deleteService,
} from "@/lib/admin/actions/services";

type ServiceRow = {
  id: string;
  name: string;
  description: string;
  priceRange: string | null;
};

type CategoryRow = {
  id: string;
  name: string;
  description: string;
  services: ServiceRow[];
};

type CategoryEdit = CategoryRow | "new";
type ServiceEdit = { categoryId: string; service: ServiceRow | "new" };

export function LayananClient({ categories }: { categories: CategoryRow[] }) {
  const [openId, setOpenId] = useState<string | null>(categories[0]?.id ?? null);
  const [editingCategory, setEditingCategory] = useState<CategoryEdit | null>(null);
  const [editingService, setEditingService] = useState<ServiceEdit | null>(null);
  const [pending, startTransition] = useTransition();

  function submitCategory(formData: FormData) {
    startTransition(async () => {
      if (editingCategory === "new") {
        await createServiceCategory(formData);
      } else if (editingCategory) {
        await updateServiceCategory(editingCategory.id, formData);
      }
      setEditingCategory(null);
    });
  }

  function submitService(formData: FormData) {
    if (!editingService) return;
    startTransition(async () => {
      if (editingService.service === "new") {
        await createService(formData);
      } else {
        await updateService(editingService.service.id, formData);
      }
      setEditingService(null);
    });
  }

  return (
    <>
      <div className="flex justify-end">
        <Button variant="primary" onClick={() => setEditingCategory("new")}>
          <Plus size={16} />
          Tambah Kategori
        </Button>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {categories.map((cat) => {
          const open = openId === cat.id;
          return (
            <div key={cat.id} className="glass overflow-hidden rounded-2xl">
              <div className="flex items-start justify-between gap-4 p-5">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : cat.id)}
                  className="flex flex-1 items-start gap-3 text-left focus-visible:outline-none"
                >
                  <ChevronDown
                    size={16}
                    className={`mt-1 shrink-0 text-text-lo transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  />
                  <div>
                    <h3 className="font-display text-base font-bold text-text-hi">
                      {cat.name}
                    </h3>
                    <p className="mt-1 text-sm text-text-lo">{cat.description}</p>
                    <span className="mt-2 inline-block font-mono text-[10px] uppercase tracking-[0.1em] text-text-lo">
                      {cat.services.length} paket
                    </span>
                  </div>
                </button>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setEditingCategory(cat)}
                    aria-label="Edit kategori"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-text-lo transition-colors hover:bg-white/5 hover:text-text-hi"
                  >
                    <Pencil size={14} />
                  </button>
                  <DeleteButton
                    action={deleteServiceCategory.bind(null, cat.id)}
                    confirmText={`Hapus kategori "${cat.name}"? Semua paket di dalamnya ikut terhapus.`}
                  />
                </div>
              </div>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="divide-y divide-white/5 border-t border-white/5 px-5">
                      {cat.services.map((s) => (
                        <div key={s.id} className="flex items-center justify-between gap-4 py-3.5">
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-text-hi">{s.name}</div>
                            <div className="mt-0.5 line-clamp-1 text-xs text-text-lo">
                              {s.description}
                            </div>
                          </div>
                          <div className="flex shrink-0 items-center gap-1">
                            <span className="font-mono text-[10px] text-text-lo">
                              {s.priceRange ?? "—"}
                            </span>
                            <button
                              type="button"
                              onClick={() => setEditingService({ categoryId: cat.id, service: s })}
                              aria-label="Edit paket"
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-text-lo transition-colors hover:bg-white/5 hover:text-text-hi"
                            >
                              <Pencil size={13} />
                            </button>
                            <DeleteButton action={deleteService.bind(null, s.id)} />
                          </div>
                        </div>
                      ))}
                      {cat.services.length === 0 && (
                        <p className="py-4 text-sm text-text-lo">Belum ada paket.</p>
                      )}
                    </div>
                    <div className="p-5 pt-3">
                      <button
                        type="button"
                        onClick={() => setEditingService({ categoryId: cat.id, service: "new" })}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-text-hi transition-colors hover:border-growth/60 hover:text-growth"
                      >
                        <Plus size={13} />
                        Tambah Paket
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <Modal
        open={editingCategory !== null}
        onClose={() => setEditingCategory(null)}
        title={editingCategory === "new" ? "Tambah Kategori" : "Edit Kategori"}
      >
        <form action={submitCategory} className="flex flex-col gap-4">
          <Field label="Nama Kategori">
            <TextInput
              name="name"
              required
              defaultValue={editingCategory !== "new" ? editingCategory?.name : ""}
              placeholder="mis. Web Application"
            />
          </Field>
          <Field label="Deskripsi">
            <TextArea
              name="description"
              required
              rows={3}
              defaultValue={editingCategory !== "new" ? editingCategory?.description : ""}
              placeholder="Deskripsi singkat kategori ini"
            />
          </Field>
          <Button type="submit" variant="primary" className="mt-2 justify-center" disabled={pending}>
            {pending ? "Menyimpan..." : "Simpan"}
          </Button>
        </form>
      </Modal>

      <Modal
        open={editingService !== null}
        onClose={() => setEditingService(null)}
        title={editingService?.service === "new" ? "Tambah Paket" : "Edit Paket"}
      >
        <form action={submitService} className="flex flex-col gap-4">
          <input type="hidden" name="categoryId" value={editingService?.categoryId ?? ""} />
          <Field label="Nama Paket">
            <TextInput
              name="name"
              required
              defaultValue={
                editingService?.service !== "new" ? editingService?.service.name : ""
              }
              placeholder="mis. Company Profile"
            />
          </Field>
          <Field label="Deskripsi">
            <TextArea
              name="description"
              required
              rows={3}
              defaultValue={
                editingService?.service !== "new" ? editingService?.service.description : ""
              }
              placeholder="Deskripsi singkat paket ini"
            />
          </Field>
          <Field label="Harga (opsional)">
            <TextInput
              name="priceRange"
              defaultValue={
                editingService?.service !== "new" ? editingService?.service.priceRange ?? "" : ""
              }
              placeholder="mis. Mulai Rp 2.000.000"
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
