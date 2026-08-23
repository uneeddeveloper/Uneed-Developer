"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { AmbientGlow } from "@/components/ui/ambient-glow";

export function CtaStrip() {
  return (
    <section className="relative py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="glass glass-heavy relative grid items-center gap-10 overflow-hidden rounded-3xl px-8 py-14 sm:px-12 lg:grid-cols-[1fr_0.85fr] lg:px-16"
        >
          <AmbientGlow variant="center" className="opacity-70" />

          <div className="relative text-center lg:text-left">
            <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-text-hi sm:text-4xl">
              Punya ide project? Mari kita wujudkan bersama.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-text-lo lg:mx-0">
              Konsultasi gratis, respon cepat lewat WhatsApp — tanpa komitmen
              di awal.
            </p>
            <div className="mt-8">
              <Button asChild variant="primary">
                <Link href="/kontak">
                  Mulai Project Sekarang
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </div>

          {/* Circuit resolving into an upward arrow — the brand mark's metaphor. */}
          <div className="relative hidden aspect-[16/10] w-full lg:block">
            <Image
              src="/visuals/growth-arrow.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 0px"
              className="object-contain mix-blend-screen [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_92%)]"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
