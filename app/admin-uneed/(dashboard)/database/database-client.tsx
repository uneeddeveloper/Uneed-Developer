"use client";

import { useActionState, useEffect, useState } from "react";
import { Save, Plus, Upload, Download, Info } from "lucide-react";
import { Field, TextInput } from "@/components/admin/form-field";
import {
  saveConfigAndLoad,
  createNewBin,
  forceUpload,
  forceDownload,
} from "@/lib/admin/actions/jsonbin";

type ActionResult = { error?: string; success?: boolean; imported?: { projects: number; transactions?: number }; binId?: string } | null;

function formatDate(date: Date | null) {
  if (!date) return null;
  return new Date(date).toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" });
}

export function DatabaseClient({
  binId,
  hasMasterKey,
  lastSyncAt,
}: {
  binId: string;
  hasMasterKey: boolean;
  lastSyncAt: Date | null;
}) {
  const [saveState, saveAction, savePending] = useActionState<ActionResult, FormData>(
    (_prev, fd) => saveConfigAndLoad(fd),
    null
  );
  const [createState, createAction, createPending] = useActionState<ActionResult, FormData>(
    (_prev, fd) => createNewBin(fd),
    null
  );
  const [uploadState, uploadAction, uploadPending] = useActionState<ActionResult, FormData>(
    () => forceUpload(),
    null
  );
  const [downloadState, downloadAction, downloadPending] = useActionState<ActionResult, FormData>(
    () => forceDownload(),
    null
  );

  const [binIdValue, setBinIdValue] = useState(binId);
  useEffect(() => {
    if (createState?.success && createState.binId) setBinIdValue(createState.binId);
  }, [createState]);

  return (
    <>
      <div className="glass flex items-start gap-3 rounded-2xl border-circuit-dim/40 bg-circuit/5 p-4 text-sm text-text-lo">
        <Info size={16} className="mt-0.5 shrink-0 text-circuit" />
        <div>
          <p className="font-medium text-text-hi">Agar data muncul di perangkat lain:</p>
          <ol className="mt-1 list-decimal space-y-0.5 pl-4">
            <li>Copy Master Key dan Bin ID dari perangkat ini.</li>
            <li>Buka admin ini di perangkat baru, login, lalu buka menu Database.</li>
            <li>Paste Master Key dan Bin ID, lalu klik &quot;Simpan &amp; Load Data&quot;.</li>
            <li>Data Projects, Pendapatan, dan Tim otomatis ter-download.</li>
          </ol>
        </div>
      </div>

      <form className="glass mt-4 flex flex-col gap-4 rounded-2xl p-6">
        <h3 className="font-display text-base font-bold text-text-hi">Konfigurasi</h3>

        <Field label="JSONBin Master Key (X-Master-Key)">
          <TextInput
            name="masterKey"
            type="password"
            placeholder={hasMasterKey ? "Sudah diatur — kosongkan untuk tetap pakai yang lama" : "Tempel Master Key dari JSONBin.io"}
          />
        </Field>
        <p className="-mt-2 text-xs text-text-lo">Dapatkan key dari dashboard JSONBin.io</p>

        <Field label="Bin ID">
          <div className="flex gap-2">
            <TextInput
              name="binId"
              value={binIdValue}
              onChange={(e) => setBinIdValue(e.target.value)}
              placeholder="mis. 697f12d5ae596e708f08b8e7"
              className="flex-1"
            />
            <button
              type="submit"
              formAction={createAction}
              disabled={createPending}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-white/10 px-4 text-sm font-medium text-text-hi transition-colors hover:border-circuit/60 hover:text-circuit disabled:opacity-50"
            >
              <Plus size={14} />
              {createPending ? "Membuat..." : "Buat Baru (Auto)"}
            </button>
          </div>
        </Field>

        {(saveState?.error || createState?.error) && (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
            {saveState?.error || createState?.error}
          </p>
        )}
        {saveState?.success && (
          <p className="rounded-lg border border-growth-dim/40 bg-growth/10 px-3 py-2 text-xs text-growth">
            Berhasil load {saveState.imported?.projects ?? 0} project, {saveState.imported?.transactions ?? 0} transaksi.
          </p>
        )}
        {createState?.success && (
          <p className="rounded-lg border border-growth-dim/40 bg-growth/10 px-3 py-2 text-xs text-growth">
            Bin baru dibuat: {createState.binId}
          </p>
        )}
        {lastSyncAt && (
          <p className="text-xs text-text-lo">Sinkronisasi terakhir: {formatDate(lastSyncAt)}</p>
        )}

        <button
          type="submit"
          formAction={saveAction}
          disabled={savePending}
          className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-circuit to-growth px-6 py-3 text-sm font-semibold text-ink shadow-[0_2px_20px_-6px_var(--color-growth)] transition-[filter] hover:brightness-105 disabled:opacity-50"
        >
          <Save size={16} />
          {savePending ? "Menyimpan..." : "Simpan & Load Data"}
        </button>
      </form>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="glass rounded-2xl p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-circuit to-circuit-dim text-ink shadow-[0_6px_20px_-6px_var(--color-circuit)]">
            <Upload size={17} strokeWidth={2} />
          </div>
          <h3 className="mt-3 font-display text-base font-bold text-text-hi">Force Upload</h3>
          <p className="mt-1 text-sm text-text-lo">
            Paksa upload data Projects, Pendapatan &amp; Tim saat ini ke cloud (menimpa data di bin).
          </p>
          {uploadState?.error && (
            <p className="mt-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
              {uploadState.error}
            </p>
          )}
          {uploadState?.success && (
            <p className="mt-2 rounded-lg border border-growth-dim/40 bg-growth/10 px-3 py-2 text-xs text-growth">
              Berhasil upload ke cloud.
            </p>
          )}
          <form
            action={uploadAction}
            onSubmit={(e) => {
              if (!confirm("Timpa data di cloud dengan data lokal saat ini?")) e.preventDefault();
            }}
          >
            <button
              type="submit"
              disabled={uploadPending}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm font-medium text-text-hi transition-colors hover:border-circuit/60 hover:text-circuit disabled:opacity-50"
            >
              {uploadPending ? "Mengupload..." : "Upload Manual"}
            </button>
          </form>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-growth to-growth-dim text-ink shadow-[0_6px_20px_-6px_var(--color-growth)]">
            <Download size={17} strokeWidth={2} />
          </div>
          <h3 className="mt-3 font-display text-base font-bold text-text-hi">Force Download</h3>
          <p className="mt-1 text-sm text-text-lo">
            Paksa ambil data dari cloud (menimpa Projects, Pendapatan &amp; Tim lokal).
          </p>
          {downloadState?.error && (
            <p className="mt-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
              {downloadState.error}
            </p>
          )}
          {downloadState?.success && (
            <p className="mt-2 rounded-lg border border-growth-dim/40 bg-growth/10 px-3 py-2 text-xs text-growth">
              Berhasil download {downloadState.imported?.projects ?? 0} project, {downloadState.imported?.transactions ?? 0} transaksi.
            </p>
          )}
          <form
            action={downloadAction}
            onSubmit={(e) => {
              if (!confirm("Timpa data lokal dengan data dari cloud?")) e.preventDefault();
            }}
          >
            <button
              type="submit"
              disabled={downloadPending}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm font-medium text-text-hi transition-colors hover:border-growth/60 hover:text-growth disabled:opacity-50"
            >
              {downloadPending ? "Mendownload..." : "Download Manual"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
