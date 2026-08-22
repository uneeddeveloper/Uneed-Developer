import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SignalTrace } from "@/components/ui/signal-trace";

const swatches = [
  { name: "ink", hex: "#060B14", className: "bg-ink border border-panel-line" },
  { name: "panel", hex: "#0D1622", className: "bg-panel" },
  { name: "circuit", hex: "#3B9EFF", className: "bg-circuit" },
  { name: "circuit-dim", hex: "#1C4E7D", className: "bg-circuit-dim" },
  { name: "growth", hex: "#3DDC84", className: "bg-growth" },
  { name: "growth-dim", hex: "#1F7A4E", className: "bg-growth-dim" },
  { name: "signal", hex: "#CFFCE8", className: "bg-signal" },
];

export default function DesignSystemPage() {
  return (
    <main className="relative pb-32 pt-20">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="Uneed Developer" width={56} height={56} />
          <div>
            <h1 className="font-display text-2xl font-medium text-text-hi">
              Uneed Developer — design system
            </h1>
            <p className="font-mono text-xs text-text-lo">
              tokens, komponen, dan signature element
            </p>
          </div>
        </div>
      </Container>

      <div className="mt-16 flex">
        <div className="hidden pl-2 lg:block">
          <SignalTrace className="h-full" />
        </div>

        <div className="flex-1 space-y-24">
          {/* Colors */}
          <Container>
            <SectionLabel>warna</SectionLabel>
            <h2 className="mt-3 font-display text-xl text-text-hi">
              Circuit (proses) → Growth (hasil)
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {swatches.map((s) => (
                <div key={s.name}>
                  <div className={`h-20 w-full rounded-xl ${s.className}`} />
                  <p className="mt-2 font-mono text-xs text-text-hi">{s.name}</p>
                  <p className="font-mono text-xs text-text-lo">{s.hex}</p>
                </div>
              ))}
            </div>
          </Container>

          {/* Typography */}
          <Container>
            <SectionLabel>tipografi</SectionLabel>
            <div className="mt-8 space-y-6">
              <div>
                <p className="font-mono text-xs text-text-lo">
                  display / Space Grotesk / 500-700
                </p>
                <p className="font-display text-4xl text-text-hi">
                  Kami bangun software, kamu fokus bisnis
                </p>
              </div>
              <div>
                <p className="font-mono text-xs text-text-lo">
                  body / Plus Jakarta Sans / 400-600
                </p>
                <p className="max-w-xl font-body text-base text-text-hi">
                  Uneed Developer mengerjakan web app, company profile, hingga
                  platform internal untuk bisnis yang ingin bergerak cepat
                  tanpa kompromi di kualitas.
                </p>
              </div>
              <div>
                <p className="font-mono text-xs text-text-lo">
                  mono / JetBrains Mono / 400-500
                </p>
                <p className="font-mono text-sm text-circuit">
                  status: in_progress · stack: next.js, prisma
                </p>
              </div>
            </div>
          </Container>

          {/* Buttons */}
          <Container>
            <SectionLabel>tombol</SectionLabel>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="primary">Mulai project</Button>
              <Button variant="secondary">Lihat portfolio</Button>
              <Button variant="ghost">Pelajari lebih lanjut →</Button>
            </div>
          </Container>

          {/* Cards */}
          <Container>
            <SectionLabel>kartu</SectionLabel>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Card>
                <p className="font-mono text-xs text-growth">web app</p>
                <h3 className="mt-2 font-display text-lg text-text-hi">
                  Company profile
                </h3>
                <p className="mt-2 text-sm text-text-lo">
                  Website resmi bisnis kamu, cepat dan mudah dikelola.
                </p>
              </Card>
              <Card>
                <p className="font-mono text-xs text-growth">portfolio</p>
                <h3 className="mt-2 font-display text-lg text-text-hi">
                  Smart Recruitment
                </h3>
                <p className="mt-2 text-sm text-text-lo">
                  Platform penerimaan karyawan terintegrasi AI.
                </p>
              </Card>
            </div>
          </Container>
        </div>
      </div>
    </main>
  );
}
