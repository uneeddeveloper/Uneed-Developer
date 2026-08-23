import type { Metadata } from "next";
import { Suspense } from "react";
import { ServicesCatalog } from "@/components/services/services-catalog";
import { CtaStrip } from "@/components/layout/cta-strip";
import { getServiceCategories } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Layanan — Uneed Developer",
  description:
    "Katalog layanan pengembangan web, mobile, dashboard, hingga sistem custom dari Uneed Developer — pesan langsung lewat WhatsApp.",
};

export default async function LayananPage() {
  const categories = await getServiceCategories();

  return (
    <main>
      <Suspense>
        <ServicesCatalog categories={categories} />
      </Suspense>
      <CtaStrip />
    </main>
  );
}
