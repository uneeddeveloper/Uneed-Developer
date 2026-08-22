"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/section-label";
import { SignalTrace } from "@/components/ui/signal-trace";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { InstagramIcon, WhatsappIcon } from "@/components/ui/social-icons";
import { CONTACT, waLink } from "@/lib/content";

const SERVICE_OPTIONS = [
  "Web Application",
  "Mobile Application",
  "Pelaporan & Data",
  "Sistem Custom",
];

const CONTACT_CHANNELS = [
  {
    label: "WhatsApp",
    value: CONTACT.whatsappDisplay,
    href: waLink("Halo, saya mau tanya-tanya soal project."),
    icon: WhatsappIcon,
  },
  {
    label: "Instagram",
    value: CONTACT.instagramHandle,
    href: CONTACT.instagram,
    icon: InstagramIcon,
  },
  {
    label: "Email Kami",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    icon: Mail,
  },
];

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(SERVICE_OPTIONS[0]);
  const [detail, setDetail] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const message = [
      `Halo Uneed Developer, saya ${name || "-"}.`,
      `Email: ${email || "-"}`,
      `Layanan yang dibutuhkan: ${service}`,
      "",
      `Detail proyek: ${detail || "-"}`,
    ].join("\n");
    window.open(waLink(message), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="kontak" className="relative scroll-mt-24 py-24 sm:py-32">
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
          <SectionLabel>kontak kami</SectionLabel>
          <h2 className="mt-5 max-w-xl font-display text-4xl text-text-hi sm:text-5xl">
            Mulai Proyek Anda Hari Ini
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-text-lo">
            Siap mentransformasi bisnis Anda dengan teknologi? Hubungi kami
            via WhatsApp atau DM Instagram untuk respon cepat.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >
            {CONTACT_CHANNELS.map(({ label, value, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass group flex items-center gap-4 rounded-2xl p-4 transition-colors duration-200 hover:border-circuit/50"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-circuit-dim/60 bg-circuit/10 text-circuit">
                  <Icon width={18} height={18} />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-lo">
                    {label}
                  </div>
                  <div className="truncate text-sm text-text-hi group-hover:text-growth">
                    {value}
                  </div>
                </div>
              </a>
            ))}

            <div className="glass flex items-start gap-4 rounded-2xl p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-circuit-dim/60 bg-circuit/10 text-circuit">
                <MapPin size={18} />
              </div>
              <div className="min-w-0">
                <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-lo">
                  Kantor Studio
                </div>
                <div className="text-sm leading-relaxed text-text-hi">
                  {CONTACT.address}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card>
              <h3 className="font-display text-lg text-text-hi">
                Kirim Pesan Langsung
              </h3>
              <p className="mt-1 text-xs text-text-lo">
                Form ini akan membuka WhatsApp Anda dengan pesan yang sudah
                terisi.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5 text-xs text-text-lo">
                    Nama Lengkap
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nama Anda"
                      className="rounded-lg border border-white/10 bg-ink/60 px-3 py-2.5 text-sm text-text-hi placeholder:text-text-lo/60 outline-none transition-colors focus:border-circuit/70"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5 text-xs text-text-lo">
                    Email
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@anda.com"
                      className="rounded-lg border border-white/10 bg-ink/60 px-3 py-2.5 text-sm text-text-hi placeholder:text-text-lo/60 outline-none transition-colors focus:border-circuit/70"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-1.5 text-xs text-text-lo">
                  Layanan yang Dibutuhkan
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="rounded-lg border border-white/10 bg-ink/60 px-3 py-2.5 text-sm text-text-hi outline-none transition-colors focus:border-circuit/70"
                  >
                    {SERVICE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-1.5 text-xs text-text-lo">
                  Detail Proyek
                  <textarea
                    required
                    rows={4}
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                    placeholder="Ceritakan sedikit tentang project yang ingin Anda buat..."
                    className="resize-none rounded-lg border border-white/10 bg-ink/60 px-3 py-2.5 text-sm text-text-hi placeholder:text-text-lo/60 outline-none transition-colors focus:border-circuit/70"
                  />
                </label>

                <Button type="submit" variant="primary" className="mt-2 justify-center">
                  Kirim via WhatsApp
                  <Send size={15} />
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
        </div>
      </Container>
    </section>
  );
}
