import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "700"],
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Uneed Developer — Kami bangun software, kamu fokus bisnis",
  description:
    "Studio pengembangan web & aplikasi. Lihat layanan, portfolio, dan hubungi tim Uneed Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="bg-ink font-body text-text-hi antialiased">
        <MotionConfig reducedMotion="user">
          <Header />
          {children}
          <Footer />
        </MotionConfig>
      </body>
    </html>
  );
}
