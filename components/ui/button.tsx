"use client";

import { forwardRef, type ButtonHTMLAttributes, type MouseEvent } from "react";
import { Slot } from "@radix-ui/react-slot";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn, handleSpotlightMove, spotlightStyle } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-circuit to-growth text-ink font-semibold hover:brightness-110 shadow-[0_0_24px_-6px_var(--color-growth)]",
  secondary:
    "border border-circuit-dim text-text-hi hover:border-circuit hover:bg-circuit/10 hover:-translate-y-0.5",
  ghost: "text-text-lo hover:text-text-hi",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const magnetic = variant === "primary";
    const reduceMotion = useReducedMotion();

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 });
    const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 });

    function onMouseMove(e: MouseEvent<HTMLDivElement>) {
      if (magnetic && !reduceMotion) {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
      }
      handleSpotlightMove(e);
    }

    function onMouseLeave() {
      x.set(0);
      y.set(0);
    }

    return (
      <motion.div
        className="group relative inline-block"
        style={magnetic ? { x: springX, y: springY } : undefined}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <Comp
          ref={ref}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm transition-all duration-300 ease-out cursor-pointer",
            variants[variant],
            className
          )}
          {...props}
        >
          {children}
        </Comp>
        {variant === "primary" && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={spotlightStyle("255, 255, 255", 140, 0.35)}
          />
        )}
      </motion.div>
    );
  }
);

Button.displayName = "Button";
