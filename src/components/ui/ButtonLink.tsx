import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";
type Size = "sm" | "md";

const variants: Record<Variant, string> = {
  primary: "bg-navy text-white hover:bg-navy-hover",
  secondary: "bg-paper text-navy ring-1 ring-inset ring-rule-strong hover:ring-navy",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.9375rem]",
  md: "h-12 px-6 text-base",
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
        "inline-flex shrink-0 items-center justify-center gap-2 rounded-[0.625rem] font-semibold whitespace-nowrap stretch-wide transition-[background-color,box-shadow] duration-150",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </a>
  );
}
