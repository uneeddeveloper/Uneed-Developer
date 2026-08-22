"use client";

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
          className="glass glass-heavy relative flex flex-col items-center overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16"
        >
          <AmbientGlow variant="center" className="opacity-70" />
          <div className="relative">
            <h2 className="max-w-xl font-display text-3xl text-text-hi sm:text-4xl">
              Punya ide project? Mari kita wujudkan bersama.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-text-lo">
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
        </motion.div>
      </Container>
    </section>
  );
}
