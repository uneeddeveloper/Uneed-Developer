import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { CtaStrip } from "@/components/layout/cta-strip";
import { prisma } from "@/lib/prisma";
import { getPortfolioItemBySlug } from "@/lib/public-data";

// New portfolio items created after a build still render fine — Next.js
// falls back to on-demand rendering for any slug not in this list.
export async function generateStaticParams() {
  const items = await prisma.portfolioItem.findMany({ select: { slug: true } });
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPortfolioItemBySlug(slug);
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
  const item = await getPortfolioItemBySlug(slug);
  if (!item) notFound();

  return (
    <main>
      <div className="relative overflow-hidden py-24 sm:py-32">
        <AmbientGlow variant="center" className="opacity-70" />
        <Container className="relative">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 font-mono text-xs text-text-lo transition-colors hover:text-growth"
        >
          <ArrowLeft size={14} />
          Kembali ke Portfolio
        </Link>

        <div className="mt-8">
          <Badge>{item.category.name}</Badge>
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

        <div className="glass relative mt-16 aspect-[16/10] w-full overflow-hidden rounded-2xl p-2">
          <div className="relative h-full w-full overflow-hidden rounded-xl">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="100vw"
              priority
              className="object-cover object-top"
            />
          </div>
        </div>
        </Container>
      </div>
      <CtaStrip />
    </main>
  );
}
