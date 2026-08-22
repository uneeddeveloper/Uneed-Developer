"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { InlineImage } from "@/components/ui/inline-image";
import { PORTFOLIO } from "@/lib/content";

const STATS = [
  { value: "9+", label: "Project rilis" },
  { value: "7", label: "Kategori layanan" },
  { value: "24/7", label: "Support" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 sm:pt-28">
      <AmbientGlow variant="center" />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <Container className="relative">
        <motion.div {...fadeUp(0)} className="flex justify-center">
          <Badge>Sekarang menerima proyek baru</Badge>
        </motion.div>

        <motion.h1
          {...fadeUp(0.1)}
          className="mx-auto mt-8 max-w-5xl text-center font-display text-[3rem] font-bold leading-[0.98] tracking-[-0.03em] text-text-hi sm:text-[4.5rem] lg:text-[6rem]"
        >
          Bangun
          <InlineImage src={PORTFOLIO[0].image} alt="" />
          Aplikasi
          <br />
          Impian{" "}
          <span className="bg-gradient-to-r from-circuit to-growth bg-clip-text text-transparent">
            Tanpa Batas
          </span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className="mx-auto mt-8 max-w-xl text-center text-base leading-relaxed text-text-lo sm:text-lg"
        >
          Mitra teknologi terpercaya untuk pembuatan laporan otomatis, website
          modern, dan aplikasi mobile yang membantu bisnis Anda berkembang
          lebih cepat.
        </motion.p>

        <motion.div
          {...fadeUp(0.3)}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button asChild variant="primary">
            <Link href="/kontak">Konsultasi Gratis</Link>
          </Button>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 rounded-full py-2 pl-4 pr-2 text-sm text-text-hi transition-colors duration-200 hover:text-growth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-circuit"
          >
            Lihat Portfolio
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-colors duration-200 group-hover:border-growth/60">
              <ArrowUpRight size={15} />
            </span>
          </Link>
        </motion.div>
      </Container>

      {/* Stat rail — mirrors the reference's partner strip under the hero. */}
      <motion.div {...fadeUp(0.45)} className="relative mt-20 border-y border-white/5">
        <Container className="flex flex-wrap items-center justify-between gap-6 py-5">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-2">
                <span className="font-display text-lg font-bold text-text-hi">
                  {stat.value}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-lo">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <a
            href="#layanan"
            className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-text-lo transition-colors hover:text-text-hi"
          >
            Scroll
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-colors group-hover:border-growth/60 group-hover:text-growth">
              <ArrowDown size={14} />
            </span>
          </a>
        </Container>
      </motion.div>
    </section>
  );
}
