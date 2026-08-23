"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2, Lock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { Field, TextInput } from "@/components/admin/form-field";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError("Email atau password salah.");
      return;
    }
    router.push("/admin-uneed");
    router.refresh();
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden py-16">
      <AmbientGlow variant="center" />
      <Container className="relative flex justify-center">
        <div className="glass w-full max-w-sm rounded-2xl p-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-circuit to-circuit-dim text-ink shadow-[0_6px_20px_-6px_var(--color-circuit)]">
            <Lock size={18} strokeWidth={2} />
          </div>
          <h1 className="mt-5 font-display text-xl font-bold text-text-hi">
            Uneed Admin
          </h1>
          <p className="mt-1 text-sm text-text-lo">
            Masuk untuk kelola project, pendapatan, dan konten website.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <Field label="Email">
              <TextInput
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@uneed.com"
              />
            </Field>
            <Field label="Password">
              <TextInput
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </Field>

            {error && (
              <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
                {error}
              </p>
            )}

            <Button type="submit" variant="primary" className="mt-2 justify-center" disabled={loading}>
              {loading ? <Loader2 size={16} className="animate-spin" /> : "Masuk"}
            </Button>
          </form>
        </div>
      </Container>
    </main>
  );
}
