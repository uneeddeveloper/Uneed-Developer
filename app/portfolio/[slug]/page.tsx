import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/section-label";
import { PORTFOLIO, serviceCategoryName } from "@/lib/content";

export function generateStaticParams() {
  return PORTFOLIO.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = PORTFOLIO.find((p) => p.slug === slug);
  if (!item) return {};
  return {
    title: `${item.title} — Portfolio Uneed Developer`,
    description: item.description,
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = PORTFOLIO.find((p) => p.slug === slug);
  if (!item) notFound();

  return (
    <main className="py-32 sm:py-40">
      <Container>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 font-mono text-xs text-text-lo transition-colors hover:text-growth"
        >
          <ArrowLeft size={14} />
          Kembali ke Portfolio
        </Link>

        <div className="mt-8">
          <SectionLabel>{serviceCategoryName(item.categorySlug)}</SectionLabel>
          <h1 className="mt-5 max-w-2xl font-display text-4xl text-text-hi sm:text-5xl">
            {item.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-lo">
            {item.detail}
          </p>

          {item.link && (
            <div className="mt-8">
              <Button asChild variant="primary">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  Kunjungi Website
                  <ExternalLink size={16} />
                </a>
              </Button>
            </div>
          )}
        </div>

        <div className="relative mt-16 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-ink">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="100vw"
            priority
            className="object-cover object-top"
          />
        </div>
      </Container>
    </main>
  );
}
