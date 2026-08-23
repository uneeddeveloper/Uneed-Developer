import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

/**
 * Public-site chrome — nav, footer, page-transition template. Scoped to the
 * (site) route group so /admin-uneed/* (a separate product surface) doesn't
 * inherit the public header/footer.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
