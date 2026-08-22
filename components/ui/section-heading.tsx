"use client";

import { motion } from "framer-motion";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";

/**
 * Centered section header: pill badge, oversized headline, optional lede and
 * action — the rhythm the reference uses to open every section.
 */
export function SectionHeading({
  label,
  title,
  description,
  action,
  className,
  as: Tag = "h2",
}: {
  label: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn("flex flex-col items-center text-center", className)}
    >
      <Badge>{label}</Badge>

      <Tag className="mt-6 max-w-3xl font-display text-[2.25rem] font-bold leading-[1.05] tracking-[-0.025em] text-text-hi sm:text-5xl lg:text-[3.5rem]">
        {title}
      </Tag>

      {description && (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-text-lo">
          {description}
        </p>
      )}

      {action && <div className="mt-8">{action}</div>}
    </motion.div>
  );
}
