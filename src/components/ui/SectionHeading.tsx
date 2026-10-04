import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  id?: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
};

/** Section title with an optional lead paragraph. No eyebrow labels: the heading carries the meaning. */
export function SectionHeading({ id, title, intro, className }: Props) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <h2 id={id} className="type-h2 text-balance">
        {title}
      </h2>
      {intro ? <p className="mt-5 max-w-[38rem] type-lead text-pretty">{intro}</p> : null}
    </div>
  );
}
