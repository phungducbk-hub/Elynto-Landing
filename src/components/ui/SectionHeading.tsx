import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ id, eyebrow, title, intro, align = "left", className }: Props) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p className="text-sm font-semibold tracking-wide text-brand-600">{eyebrow}</p>
      <h2
        id={id}
        className="mt-3 text-[1.875rem] leading-[1.2] font-bold tracking-tight text-ink text-balance sm:text-4xl sm:leading-[1.15]"
      >
        {title}
      </h2>
      {intro ? <p className="mt-4 text-lg leading-relaxed text-ink-muted text-pretty">{intro}</p> : null}
    </div>
  );
}
