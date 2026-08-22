import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A pill-cropped image set inline within a headline, sized in `em` so it
 * scales with the type around it and stays optically aligned to the
 * lowercase body of the line rather than the baseline.
 */
export function InlineImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative mx-[0.12em] inline-block h-[0.78em] w-[1.55em] -translate-y-[0.06em] overflow-hidden rounded-full border border-white/10 align-middle",
        className
      )}
    >
      <Image src={src} alt={alt} fill sizes="240px" className="object-cover object-top" />
    </span>
  );
}
