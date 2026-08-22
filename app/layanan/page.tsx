import type { Metadata } from "next";
import { Suspense } from "react";
import { ServicesCatalog } from "@/components/services/services-catalog";
import { CtaStrip } from "@/components/layout/cta-strip";

export const metadata: Metadata = {
  title: "Layanan — Uneed Developer",
  description:
    "Katalog layanan pengembangan web, mobile, dashboard, hingga sistem custom dari Uneed Developer — pesan langsung lewat WhatsApp.",
};

export default function LayananPage() {
  return (
    <main>
      <Suspense>
        <ServicesCatalog />
      </Suspense>
      <CtaStrip />
    </main>
  );
}
