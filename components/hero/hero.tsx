"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Headset, Sparkles, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/section-label";
import { SignalTrace } from "@/components/ui/signal-trace";
import { CONTACT } from "@/lib/content";

const TRUST_BADGES = [
  { icon: Users, label: "Tim Expert" },
  { icon: Sparkles, label: "Teknologi Terbaru" },
  { icon: Headset, label: "Support 24/7" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-32 sm:pt-44 sm:pb-40">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <Container className="relative flex gap-8">
        <SignalTrace className="hidden self-stretch lg:block" />

        <div className="max-w-3xl">
          <motion.div {...fadeUp(0)}>
            <SectionLabel>sekarang menerima proyek baru</SectionLabel>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="mt-8 font-display text-5xl leading-[1.05] tracking-tight text-text-hi sm:text-6xl lg:text-7xl"
          >
            Bangun{" "}
            <span className="bg-gradient-to-r from-circuit to-growth bg-clip-text text-transparent">
              Aplikasi Impian
            </span>{" "}
            Tanpa Batas.
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="mt-8 max-w-lg text-lg leading-relaxed text-text-lo"
          >
            Mitra teknologi terpercaya untuk pembuatan laporan otomatis,
            website modern, dan aplikasi mobile yang membantu bisnis Anda
            berkembang lebih cepat.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="mt-10 flex flex-wrap gap-4">
            <Button asChild variant="primary">
              <Link href="/kontak">
                Konsultasi Gratis
                <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">
                Instagram Kami
              </a>
            </Button>
          </motion.div>

          <motion.div
            {...fadeUp(0.4)}
            className="mt-12 flex flex-wrap gap-x-8 gap-y-2 border-t border-panel-line pt-6"
          >
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-text-lo"
              >
                <Icon size={13} className="text-growth" />
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
