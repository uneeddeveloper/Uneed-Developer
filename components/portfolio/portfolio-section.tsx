"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/section-label";
import { SignalTrace } from "@/components/ui/signal-trace";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { PORTFOLIO } from "@/lib/content";
import { PortfolioCard } from "./portfolio-card";

export function PortfolioSection() {
  return (
    <section id="portfolio" className="relative scroll-mt-24 py-32 sm:py-40">
      <AmbientGlow variant="bottom" className="opacity-60" />
      <Container className="relative flex gap-8">
        <SignalTrace className="hidden self-stretch lg:block" />
        <div className="min-w-0 flex-1">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionLabel>portfolio</SectionLabel>
            <h2 className="mt-5 max-w-xl font-display text-4xl text-text-hi sm:text-5xl">
              Karya Terbaik Kami
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mt-14 -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {PORTFOLIO.map((item, i) => (
              <div key={item.slug} className="w-72 shrink-0 snap-start sm:w-80">
                <PortfolioCard item={item} delay={(i % 3) * 0.08} />
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4"
          >
            <Button asChild variant="secondary">
              <Link href="/portfolio">
                Lihat Semua Portfolio
                <ArrowRight size={16} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
