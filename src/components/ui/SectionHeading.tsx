import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { reveal } from "@/lib/reveal";

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
      <p {...reveal()} className="text-sm font-semibold tracking-wide text-brand-600">
        {eyebrow}
      </p>
      <h2
        {...reveal("up", 70)}
        id={id}
        className="mt-3 text-[1.875rem] leading-[1.2] font-bold tracking-tight text-ink text-balance sm:text-4xl sm:leading-[1.15]"
      >
        {title}
      </h2>
      {intro ? (
        <p {...reveal("up", 140)} className="mt-4 text-lg leading-relaxed text-ink-muted text-pretty">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
