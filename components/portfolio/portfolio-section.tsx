"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { ScrollRow } from "@/components/ui/scroll-row";
import { PORTFOLIO } from "@/lib/content";
import { PortfolioCard } from "./portfolio-card";

export function PortfolioSection() {
  return (
    <section id="portfolio" className="relative scroll-mt-24 py-24 sm:py-32">
      <AmbientGlow variant="bottom" className="opacity-60" />
      <Container className="relative">
        <SectionHeading
          label="Portfolio"
          title="Karya Terbaik Kami"
          description="Sembilan project yang sudah rilis dan dipakai klien — dari company profile sampai sistem ujian daring."
          action={
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-3 rounded-full py-2 pl-4 pr-2 text-sm text-text-hi transition-colors duration-200 hover:text-growth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-circuit"
            >
              Lihat semua portfolio
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-colors duration-200 group-hover:border-growth/60">
                <ArrowUpRight size={15} />
              </span>
            </Link>
          }
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-14"
        >
          <ScrollRow label="daftar portfolio">
            {PORTFOLIO.map((item, i) => (
              <div key={item.slug} className="w-72 shrink-0 snap-start sm:w-80">
                <PortfolioCard item={item} delay={(i % 3) * 0.06} />
              </div>
            ))}
          </ScrollRow>
        </motion.div>
      </Container>
    </section>
  );
}
