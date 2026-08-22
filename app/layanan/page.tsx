import type { Metadata } from "next";
import { ServicesCatalog } from "@/components/services/services-catalog";

export const metadata: Metadata = {
  title: "Layanan — Uneed Developer",
  description:
    "Katalog layanan pengembangan web, mobile, dashboard, hingga sistem custom dari Uneed Developer — pesan langsung lewat WhatsApp.",
};

export default function LayananPage() {
  return (
    <main>
      <ServicesCatalog />
    </main>
  );
}
