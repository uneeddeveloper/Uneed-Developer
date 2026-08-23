"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FolderKanban,
  Wallet,
  Users,
  Image as ImageIcon,
  Layers,
  BarChart3,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin-uneed", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin-uneed/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin-uneed/pendapatan", label: "Pendapatan", icon: Wallet },
  { href: "/admin-uneed/tim", label: "Tim", icon: Users },
  { href: "/admin-uneed/portfolio", label: "Portfolio", icon: ImageIcon },
  { href: "/admin-uneed/layanan", label: "Layanan", icon: Layers },
  { href: "/admin-uneed/laporan", label: "Laporan", icon: BarChart3 },
];

export function Sidebar({
  adminName,
  variant = "desktop",
  onNavigate,
}: {
  adminName: string;
  variant?: "desktop" | "drawer";
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "glass flex w-64 shrink-0 flex-col p-4",
        variant === "desktop" && "sticky top-4 h-[calc(100vh-2rem)] rounded-2xl",
        variant === "drawer" && "h-full rounded-r-2xl"
      )}
    >
      <Link href="/admin-uneed" className="flex items-center gap-2.5 px-2 py-2">
        <span className="font-mono text-circuit">{"</>"}</span>
        <span className="font-display text-sm font-medium text-text-hi">
          Uneed<span className="text-growth">Admin</span>
        </span>
      </Link>

      <nav className="mt-6 flex flex-1 flex-col gap-1">
        {NAV.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-circuit",
                active
                  ? "bg-gradient-to-r from-circuit/20 via-growth/10 to-transparent text-text-hi shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                  : "text-text-lo hover:bg-white/5 hover:text-text-hi"
              )}
              aria-current={active ? "page" : undefined}
            >
              {active && (
                <span className="absolute inset-y-1 left-0 w-[3px] rounded-full bg-gradient-to-b from-circuit to-growth" />
              )}
              <Icon
                size={17}
                className={active ? "text-growth drop-shadow-[0_0_6px_var(--color-growth)]" : undefined}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/5 pt-3">
        <div className="flex items-center gap-3 rounded-xl px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-circuit to-growth font-mono text-xs font-bold text-ink">
            {adminName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs font-medium text-text-hi">{adminName}</div>
          </div>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin-uneed/login" })}
            aria-label="Keluar"
            className="flex h-8 w-8 items-center justify-center rounded-full text-text-lo transition-colors hover:bg-white/5 hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-circuit"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}
