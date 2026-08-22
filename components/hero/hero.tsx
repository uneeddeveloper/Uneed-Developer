"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Headset, Sparkles, Users, Zap, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/section-label";
import { SignalTrace } from "@/components/ui/signal-trace";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { CONTACT } from "@/lib/content";
import { handleSpotlightMove, spotlightStyle } from "@/lib/utils";
import { NetworkGraphic } from "./network-graphic";

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
    <section
      onMouseMove={handleSpotlightMove}
      className="relative overflow-hidden pt-16 pb-32 sm:pt-20 sm:pb-40"
    >
      <AmbientGlow />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={spotlightStyle("59, 158, 255", 640, 0.06)}
        aria-hidden="true"
      />
      <Container className="relative flex gap-8">
        <SignalTrace className="hidden self-stretch lg:block" />

        <div className="grid w-full items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="max-w-2xl">
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
              className="glass mt-12 inline-flex flex-wrap gap-x-8 gap-y-2 rounded-full px-6 py-3.5"
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

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <div className="glass glass-heavy relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl p-6">
              <NetworkGraphic />
            </div>

            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="glass absolute -left-6 top-8 flex items-center gap-2.5 rounded-2xl px-4 py-3"
            >
              <Zap size={15} className="text-circuit" />
              <span className="text-xs font-medium text-text-hi">Real-time Sync</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass absolute -right-4 bottom-10 flex items-center gap-2.5 rounded-2xl px-4 py-3"
            >
              <ShieldCheck size={15} className="text-growth" />
              <span className="text-xs font-medium text-text-hi">Secure by Design</span>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
