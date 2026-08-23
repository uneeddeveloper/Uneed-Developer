"use client";

import { useActionState, useState } from "react";
import { KeyRound, ShieldCheck, ShieldAlert, Copy, Check, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, TextInput } from "@/components/admin/form-field";
import { generateMasterKey, unlockDevice, lockThisDevice } from "@/lib/admin/actions/security";

function formatDate(date: Date | null) {
  if (!date) return null;
  return new Date(date).toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" });
}

export function KeamananClient({
  isSet,
  updatedAt,
  unlockedHere,
}: {
  isSet: boolean;
  updatedAt: Date | null;
  unlockedHere: boolean;
}) {
  const [generatedKey, generateAction, generating] = useActionState(async () => {
    return await generateMasterKey();
  }, null as string | null);
  const [copied, setCopied] = useState(false);

  function copyKey() {
    if (!generatedKey) return;
    navigator.clipboard.writeText(generatedKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (generatedKey) {
    return (
      <div className="glass rounded-2xl p-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-growth to-growth-dim text-ink shadow-[0_6px_20px_-6px_var(--color-growth)]">
          <ShieldCheck size={20} strokeWidth={2} />
        </div>
        <h2 className="mt-4 font-display text-lg font-bold text-text-hi">Master Key dibuat</h2>
        <p className="mt-1 max-w-lg text-sm text-text-lo">
          Simpan key ini sekarang — key hanya ditampilkan sekali. Perangkat lain butuh key ini untuk
          bisa melihat data admin setelah login.
        </p>
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-growth-dim/50 bg-growth/5 p-3">
          <code className="flex-1 overflow-x-auto whitespace-nowrap font-mono text-sm text-growth">
            {generatedKey}
          </code>
          <button
            type="button"
            onClick={copyKey}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-text-lo transition-colors hover:bg-white/5 hover:text-text-hi"
            aria-label="Salin"
          >
            {copied ? <Check size={15} className="text-growth" /> : <Copy size={15} />}
          </button>
        </div>
        <Button variant="primary" className="mt-5" onClick={() => window.location.assign("/admin-uneed")}>
          Saya sudah simpan, lanjutkan
        </Button>
      </div>
    );
  }

  if (!isSet) {
    return (
      <div className="glass rounded-2xl p-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-circuit to-circuit-dim text-ink shadow-[0_6px_20px_-6px_var(--color-circuit)]">
          <KeyRound size={20} strokeWidth={2} />
        </div>
        <h2 className="mt-4 font-display text-lg font-bold text-text-hi">Belum ada Master Key</h2>
        <p className="mt-1 max-w-lg text-sm text-text-lo">
          Buat master key sekali di sini. Setelah itu, setiap perangkat baru yang login harus
          memasukkan key yang sama sebelum data project, pendapatan, dan lainnya bisa dilihat —
          walau email &amp; password sudah benar.
        </p>
        <form action={generateAction}>
          <Button type="submit" variant="primary" className="mt-5" disabled={generating}>
            {generating ? "Membuat..." : "Buat Master Key Sekarang"}
          </Button>
        </form>
      </div>
    );
  }

  if (!unlockedHere) {
    return (
      <div className="glass mx-auto w-full max-w-sm rounded-2xl p-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-ink shadow-[0_6px_20px_-6px_rgba(245,158,11,0.55)]">
          <ShieldAlert size={20} strokeWidth={2} />
        </div>
        <h2 className="mt-4 font-display text-lg font-bold text-text-hi">Masukkan Master Key</h2>
        <p className="mt-1 text-sm text-text-lo">
          Perangkat ini belum pernah membuka data admin. Masukkan master key untuk melanjutkan.
        </p>
        <UnlockForm />
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-growth to-growth-dim text-ink shadow-[0_6px_20px_-6px_var(--color-growth)]">
        <ShieldCheck size={20} strokeWidth={2} />
      </div>
      <h2 className="mt-4 font-display text-lg font-bold text-text-hi">Master key aktif</h2>
      <p className="mt-1 text-sm text-text-lo">
        Perangkat ini sudah terbuka.
        {updatedAt && ` Key terakhir diubah ${formatDate(updatedAt)}.`}
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <form action={lockThisDevice}>
          <Button type="submit" variant="secondary">
            <LockKeyhole size={15} />
            Kunci Perangkat Ini
          </Button>
        </form>
        <form
          action={generateAction}
          onSubmit={(e) => {
            if (
              !confirm(
                "Buat master key baru? Perangkat lain yang belum memasukkan key baru tidak akan bisa unlock lagi."
              )
            )
              e.preventDefault();
          }}
        >
          <Button type="submit" variant="secondary" disabled={generating}>
            {generating ? "Membuat..." : "Buat Master Key Baru"}
          </Button>
        </form>
      </div>
    </div>
  );
}

function UnlockForm() {
  const [state, formAction, pending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) => unlockDevice(formData),
    null
  );

  return (
    <form action={formAction} className="mt-4 flex flex-col gap-4">
      <Field label="Master Key">
        <TextInput name="masterKey" required autoFocus placeholder="Tempel master key di sini" />
      </Field>
      {state?.error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
          {state.error}
        </p>
      )}
      <Button type="submit" variant="primary" className="justify-center" disabled={pending}>
        {pending ? "Memeriksa..." : "Unlock"}
      </Button>
    </form>
  );
}
