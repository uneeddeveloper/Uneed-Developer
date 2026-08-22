import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-circuit to-growth text-ink font-semibold hover:brightness-110 hover:-translate-y-0.5 shadow-[0_0_24px_-6px_var(--color-growth)]",
  secondary:
    "border border-circuit-dim text-text-hi hover:border-circuit hover:bg-circuit/10 hover:-translate-y-0.5",
  ghost: "text-text-lo hover:text-text-hi",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm transition-all duration-300 ease-out cursor-pointer",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
