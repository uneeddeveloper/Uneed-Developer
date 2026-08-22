"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/section-label";
import { SignalTrace } from "@/components/ui/signal-trace";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { ScrollRow } from "@/components/ui/scroll-row";
import { SERVICE_CATEGORIES, type ServiceCategoryMeta } from "@/lib/content";
import { ServiceCategoryCard } from "./service-category-card";
import { ServiceDrawer } from "./service-drawer";

export function ServicesSection() {
  const [active, setActive] = useState<ServiceCategoryMeta | null>(null);

  return (
    <section id="layanan" className="relative scroll-mt-24 py-24 sm:py-32">
      <AmbientGlow />
      <Container className="relative flex gap-8">
        <SignalTrace className="hidden self-stretch lg:block" />
        <div className="min-w-0 flex-1">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionLabel>layanan kami</SectionLabel>
            <h2 className="mt-5 max-w-xl font-display text-4xl text-text-hi sm:text-5xl">
              Solusi Digital Komprehensif
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-text-lo">
              Tujuh kategori layanan, dari laporan otomatis sampai maintenance
              berkelanjutan. Klik untuk lihat paket & detailnya.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <ScrollRow label="daftar layanan">
              {SERVICE_CATEGORIES.map((category) => (
                <div key={category.slug} className="w-72 shrink-0 snap-start sm:w-80">
                  <ServiceCategoryCard category={category} onOpen={setActive} />
                </div>
              ))}
            </ScrollRow>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12"
          >
            <Button asChild variant="primary">
              <Link href="/layanan">
                Lihat Semua Layanan & Pesan
                <ArrowRight size={16} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </Container>

      <ServiceDrawer category={active} onClose={() => setActive(null)} />
    </section>
  );
}
