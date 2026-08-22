"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { SignalTrace } from "@/components/ui/signal-trace";
import { PORTFOLIO } from "@/lib/content";
import { PortfolioCard } from "./portfolio-card";

export function PortfolioSection() {
  return (
    <section id="portfolio" className="scroll-mt-24 py-32 sm:py-40">
      <Container className="flex gap-8">
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

          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {PORTFOLIO.map((item, i) => (
              <PortfolioCard key={item.slug} item={item} delay={(i % 3) * 0.08} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
