import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { InstagramIcon, WhatsappIcon } from "@/components/ui/social-icons";
import { CONTACT, waLink } from "@/lib/content";

const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/layanan", label: "Layanan" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/kontak", label: "Kontak" },
];

const SOCIAL_LINKS = [
  { href: waLink("Halo, saya mau tanya-tanya soal project."), label: "WhatsApp", icon: WhatsappIcon },
  { href: CONTACT.instagram, label: "Instagram", icon: InstagramIcon },
  { href: `mailto:${CONTACT.email}`, label: "Email", icon: Mail },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-panel-line">
      <Container className="flex flex-col gap-10 py-14">
        <div className="flex flex-col justify-between gap-10 sm:flex-row">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="" width={26} height={26} />
              <span className="font-display text-sm font-medium text-text-hi">
                Uneed<span className="text-growth">Developer</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-text-lo">
              Studio pengembangan web &amp; aplikasi. Kami bangun software,
              kamu fokus bisnis.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-lo">
                Navigasi
              </span>
              <ul className="mt-4 flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-lo transition-colors hover:text-growth"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-lo">
                Sosial
              </span>
              <ul className="mt-4 flex gap-3">
                {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-panel-line text-text-lo transition-colors hover:border-growth hover:text-growth"
                    >
                      <Icon width={16} height={16} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-panel-line pt-6 text-xs text-text-lo sm:flex-row sm:items-center">
          <span>© {year} Uneed Developer. Seluruh hak cipta dilindungi.</span>
          <span className="font-mono">// built with next.js</span>
        </div>
      </Container>
    </footer>
  );
}
