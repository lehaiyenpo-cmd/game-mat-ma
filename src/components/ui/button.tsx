import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-[transform,background-color,box-shadow,color,opacity] duration-150 ease-out select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        primary:
          "bg-signal text-bg shadow-[0_0_24px_color-mix(in_oklab,var(--color-signal)_35%,transparent)] hover:bg-signal/90",
        outline:
          "bg-transparent text-fg shadow-[0_0_0_1px_var(--color-line)] hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-signal)_55%,transparent)] hover:text-signal",
        relic:
          "bg-relic text-bg shadow-[0_0_20px_color-mix(in_oklab,var(--color-relic)_30%,transparent)] hover:bg-relic/90",
        ghost: "bg-transparent text-muted hover:text-fg hover:bg-raised",
        danger:
          "bg-transparent text-danger shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-danger)_45%,transparent)]",
      },
      size: {
        md: "h-11 min-h-11 px-4 text-sm",
        lg: "h-12 min-h-12 px-5 text-base",
        sm: "h-9 min-h-9 px-3 text-sm",
        icon: "size-11 min-h-11 min-w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
