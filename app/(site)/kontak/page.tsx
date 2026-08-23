import type { Metadata } from "next";
import { ContactSection } from "@/components/contact/contact-section";

export const metadata: Metadata = {
  title: "Kontak — Uneed Developer",
  description: "Hubungi Uneed Developer via WhatsApp, Instagram, atau email untuk mulai proyek Anda.",
};

export default function KontakPage() {
  return (
    <main>
      <ContactSection />
    </main>
  );
}
