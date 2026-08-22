import { Hero } from "@/components/hero/hero";
import { ServicesSection } from "@/components/services/services-section";
import { PortfolioSection } from "@/components/portfolio/portfolio-section";
import { ContactSection } from "@/components/contact/contact-section";

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesSection />
      <PortfolioSection />
      <ContactSection />
    </main>
  );
}
