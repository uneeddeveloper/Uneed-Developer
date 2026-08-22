"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
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
      <Container className="relative">
        <SectionHeading
          label="Layanan kami"
          title="Solusi Digital Komprehensif"
          description="Tujuh kategori layanan, dari laporan otomatis sampai maintenance berkelanjutan. Klik untuk lihat paket & detailnya."
          action={
            <Link
              href="/layanan"
              className="group inline-flex items-center gap-3 rounded-full py-2 pl-4 pr-2 text-sm text-text-hi transition-colors duration-200 hover:text-growth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-circuit"
            >
              Lihat semua & pesan
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
          <ScrollRow label="daftar layanan">
            {SERVICE_CATEGORIES.map((category) => (
              <div key={category.slug} className="w-72 shrink-0 snap-start sm:w-80">
                <ServiceCategoryCard category={category} onOpen={setActive} />
              </div>
            ))}
          </ScrollRow>
        </motion.div>
      </Container>

      <ServiceDrawer category={active} onClose={() => setActive(null)} />
    </section>
  );
}
