import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = HTMLAttributes<HTMLElement> & { children: ReactNode };

/**
 * Highlighter mark for the parts of a sentence Elynto turns into task fields.
 * The slanted ends echo the sheared facets of the Elynto mark (styles: `.marker` in globals.css).
 */
export function Marker({ children, className, ...rest }: Props) {
  return (
    <mark {...rest} className={cn("marker", className)}>
      {children}
    </mark>
  );
}
