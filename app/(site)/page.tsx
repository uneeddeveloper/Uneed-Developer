import { Hero } from "@/components/hero/hero";
import { ServicesSection } from "@/components/services/services-section";
import { PortfolioSection } from "@/components/portfolio/portfolio-section";
import { ContactSection } from "@/components/contact/contact-section";
import { getServiceCategories, getPortfolioItems } from "@/lib/public-data";

export default async function Home() {
  const [categories, portfolioItems] = await Promise.all([
    getServiceCategories(),
    getPortfolioItems(),
  ]);

  return (
    <main>
      <Hero />
      <ServicesSection categories={categories} />
      <PortfolioSection items={portfolioItems} />
      <ContactSection />
    </main>
  );
}
