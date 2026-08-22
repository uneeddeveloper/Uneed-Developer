"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { SignalTrace } from "@/components/ui/signal-trace";
import { PORTFOLIO } from "@/lib/content";

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
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: (i % 3) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link href={`/portfolio/${item.slug}`} className="group block">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-ink">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-circuit">
                        {item.type}
                      </span>
                      <h3 className="mt-1.5 font-display text-base font-medium text-text-hi">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-text-lo">
                        {item.description}
                      </p>
                    </div>
                    <ArrowRight
                      size={16}
                      className="mt-1 shrink-0 text-text-lo transition-all duration-300 group-hover:translate-x-1 group-hover:text-growth"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
