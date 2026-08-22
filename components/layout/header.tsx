"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/layanan", label: "Layanan" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/kontak", label: "Kontak" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full pt-4 sm:pt-6">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="glass flex h-16 w-full items-center justify-between rounded-full px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Uneed Developer — beranda">
            <Image src="/logo.png" alt="" width={26} height={26} priority />
            <span className="font-display text-sm font-medium tracking-tight text-text-hi">
              Uneed<span className="text-growth">Developer</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Navigasi utama">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative font-mono text-xs uppercase tracking-[0.15em] transition-colors",
                    active ? "text-text-hi" : "text-text-lo hover:text-text-hi"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                  {active && (
                    <span
                      className="absolute -bottom-2 left-0 h-px w-full bg-growth"
                      style={{ boxShadow: "0 0 6px 0 var(--color-growth)" }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <Button asChild variant="primary" className="px-5 py-2.5 text-xs">
              <Link href="/kontak">Mulai Project</Link>
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-text-hi md:hidden"
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <nav
            className="glass glass-heavy mt-3 rounded-3xl px-6 py-4 md:hidden"
            aria-label="Navigasi mobile"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "block rounded-lg px-3 py-3 font-mono text-sm uppercase tracking-[0.1em] transition-colors",
                        active
                          ? "bg-white/5 text-growth"
                          : "text-text-lo hover:bg-white/5 hover:text-text-hi"
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Button asChild variant="primary" className="mt-4 w-full justify-center py-3 text-xs">
              <Link href="/kontak">Mulai Project</Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
