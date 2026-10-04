import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  /** "Minh họa" / "Illustration" */
  badge: string;
  /** Optional title shown in the frame's top bar. */
  title?: ReactNode;
  className?: string;
  bodyClassName?: string;
  /** Set to false when the content manages its own padding. */
  padded?: boolean;
  children: ReactNode;
};

/**
 * Neutral product-like frame for HTML illustrations. Always carries a visible
 * "illustration" badge so visitors don't mistake it for a live app session.
 */
export function IllustrationFrame({ badge, title, className, bodyClassName, padded = true, children }: Props) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-line bg-surface shadow-float", className)}>
      <div className="flex h-11 items-center justify-between gap-3 border-b border-line bg-canvas px-4">
        <div className="flex min-w-0 items-center gap-2 text-sm font-semibold text-ink">{title}</div>
        <span className="shrink-0 rounded-full border border-line-strong bg-surface px-2 py-0.5 text-[0.6875rem] font-medium tracking-wide text-ink-subtle uppercase">
          {badge}
        </span>
      </div>
      <div className={cn(padded && "p-4 sm:p-6", bodyClassName)}>{children}</div>
    </div>
  );
}
