import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white shadow-sm hover:bg-brand-hover active:bg-brand-hover",
  secondary: "bg-surface text-ink ring-1 ring-inset ring-line-strong hover:bg-sunken hover:ring-ink-subtle/40",
  ghost: "text-ink hover:bg-sunken",
  inverse: "bg-white text-brand shadow-sm hover:bg-brand-50",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm gap-1.5 rounded-lg",
  md: "h-11 px-5 text-[0.9375rem] gap-2 rounded-xl",
  lg: "h-12 px-6 text-base gap-2 rounded-xl",
};

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  /** Extra data-* attributes (e.g. analytics). */
  dataAttrs?: Record<string, string>;
};

export function ButtonLink({ variant = "primary", size = "md", className, children, dataAttrs, ...rest }: Props) {
  return (
    <a
      {...rest}
      {...dataAttrs}
      className={cn(
        "inline-flex shrink-0 items-center justify-center font-semibold whitespace-nowrap transition-colors duration-150",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </a>
  );
}
