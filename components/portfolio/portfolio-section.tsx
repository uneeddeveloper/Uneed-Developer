"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { Marquee } from "@/components/ui/marquee";
import { PORTFOLIO } from "@/lib/content";
import { PortfolioCard } from "./portfolio-card";

// Split into two rows that travel opposite ways — the counter-motion reads as
// a showcase rather than a list, and shows more work per screen.
const ROW_ONE = PORTFOLIO.slice(0, Math.ceil(PORTFOLIO.length / 2));
const ROW_TWO = PORTFOLIO.slice(Math.ceil(PORTFOLIO.length / 2));

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
      </Container>

      {/* Full-bleed: the rows should run past the container edges. */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mt-14 flex flex-col gap-5"
      >
        <Marquee direction="left" speed={70}>
          {ROW_ONE.map((item) => (
            <PortfolioCard
              key={item.slug}
              item={item}
              className="aspect-[16/10] w-[19rem] sm:w-[23rem]"
              sizes="368px"
            />
          ))}
        </Marquee>

        <Marquee direction="right" speed={85}>
          {ROW_TWO.map((item) => (
            <PortfolioCard
              key={item.slug}
              item={item}
              className="aspect-[16/10] w-[19rem] sm:w-[23rem]"
              sizes="368px"
            />
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}
