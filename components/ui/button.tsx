import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-circuit to-growth text-ink font-semibold shadow-[0_2px_20px_-6px_var(--color-growth)] hover:brightness-105 hover:shadow-[0_4px_24px_-6px_var(--color-growth)]",
  secondary:
    "border border-white/10 text-text-hi hover:border-circuit/60 hover:bg-circuit/5",
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
          "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 text-sm",
          "transition-[background,border-color,box-shadow,filter,transform] duration-200 ease-out hover:-translate-y-px",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-circuit focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
