import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  /** Visible note that this is an illustration, not a live screen. */
  label?: string;
  className?: string;
  surfaceClassName?: string;
  children: ReactNode;
};

/**
 * The page's only elevated object: a product screen (illustrated until real
 * screenshots exist). The illustration note sits under it as a figure caption.
 */
export function ProductSurface({ label, className, surfaceClassName, children }: Props) {
  return (
    <figure className={cn("min-w-0", className)}>
      <div className={cn("overflow-hidden rounded-2xl border border-rule bg-paper shadow-surface", surfaceClassName)}>
        {children}
      </div>
      {label ? <figcaption className="mt-3 text-sm text-muted">{label}</figcaption> : null}
    </figure>
  );
}
