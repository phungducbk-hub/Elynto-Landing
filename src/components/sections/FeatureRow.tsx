import { Check, Lightbulb } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
  points?: string[];
  tip?: string;
  reverse?: boolean;
  children: ReactNode;
};

export function FeatureRow({ id, eyebrow, title, body, points, tip, reverse, children }: Props) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <article id={id} aria-labelledby={headingId} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={cn("max-w-xl", reverse && "lg:order-2")}>
        <p className="text-sm font-semibold tracking-wide text-brand-600">{eyebrow}</p>
        <h3 id={headingId} className="mt-3 text-[1.75rem] leading-[1.2] font-bold tracking-tight text-ink text-balance sm:text-[2rem]">
          {title}
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted text-pretty">{body}</p>
        {points?.length ? (
          <ul className="mt-6 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex gap-3 text-base leading-relaxed text-ink">
                <span className="mt-1 inline-grid size-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand ring-1 ring-brand-100 ring-inset">
                  <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        ) : null}
        {tip ? (
          <p className="mt-6 flex gap-2.5 rounded-xl bg-sunken px-4 py-3 text-sm leading-relaxed text-ink-muted">
            <Lightbulb className="mt-0.5 size-4 shrink-0 text-field-due" aria-hidden="true" />
            {tip}
          </p>
        ) : null}
      </div>
      <div className={cn("min-w-0", reverse && "lg:order-1")}>{children}</div>
    </article>
  );
}
