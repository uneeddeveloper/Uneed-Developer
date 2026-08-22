"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
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
    <section className="relative py-24 sm:py-32">
      <AmbientGlow />
      <Container className="relative">
        <div className="min-w-0 flex-1">
          <SectionHeading
            as="h1"
            label="Katalog layanan"
            title="Pilih Layanan, Langsung Pesan"
            description="Klik salah satu kategori untuk lihat paket & detailnya. Setiap paket bisa langsung dipesan lewat WhatsApp — pesan Anda sudah otomatis terisi, tidak perlu ketik ulang dari awal."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
