"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { SignalTrace } from "@/components/ui/signal-trace";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { SERVICE_CATEGORIES, type ServiceCategoryMeta } from "@/lib/content";
import { ServiceCategoryCard } from "./service-category-card";
import { ServiceDrawer } from "./service-drawer";

export function ServicesCatalog() {
  const [active, setActive] = useState<ServiceCategoryMeta | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const slug = searchParams.get("kategori");
    if (!slug) return;
    const category = SERVICE_CATEGORIES.find((c) => c.slug === slug);
    if (category) setActive(category);
    // Only run once on mount — the drawer's own state owns things after that.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative py-32 sm:py-40">
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
            <SectionLabel>katalog layanan</SectionLabel>
            <h1 className="mt-5 max-w-xl font-display text-4xl text-text-hi sm:text-5xl">
              Pilih Layanan, Langsung Pesan
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-text-lo">
              Klik salah satu kategori untuk lihat paket & detailnya. Setiap
              paket bisa langsung dipesan lewat WhatsApp — pesan Anda sudah
              otomatis terisi, tidak perlu ketik ulang dari awal.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_CATEGORIES.map((category, i) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: (i % 3) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <ServiceCategoryCard category={category} onOpen={setActive} />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>

      <ServiceDrawer category={active} onClose={() => setActive(null)} />
    </section>
  );
}
