import { cn } from "@/lib/cn";
import { LOCKUP_PATHS, LOCKUP_VIEWBOX, MARK_PATHS, MARK_VIEWBOX } from "./logo-paths";

type Props = {
  variant?: "lockup" | "mark";
  className?: string;
  /** Accessible name. Pass `null` when the logo sits next to visible text. */
  title?: string | null;
};

export function Logo({ variant = "lockup", className, title = "Elynto" }: Props) {
  const isMark = variant === "mark";
  const paths = isMark ? MARK_PATHS : LOCKUP_PATHS;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={isMark ? MARK_VIEWBOX : LOCKUP_VIEWBOX}
      fill="currentColor"
      className={cn("block", className)}
      {...(title ? { role: "img", "aria-label": title } : { "aria-hidden": true, focusable: false })}
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
