import { Check, Lightbulb } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { reveal } from "@/lib/reveal";

type Props = {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
  points?: string[];
  tip?: string;
  reverse?: boolean;
  /** Give the visual 7 of 12 columns instead of half, for wider product screens. */
  wideVisual?: boolean;
  headingLevel?: 3 | 4;
  children: ReactNode;
};

export function FeatureRow({ id, eyebrow, title, body, points, tip, reverse, wideVisual, headingLevel = 3, children }: Props) {
  const headingId = id ? `${id}-title` : undefined;
  const Heading = headingLevel === 4 ? "h4" : "h3";
  return (
    <article
      id={id}
      aria-labelledby={headingId}
      className={cn(
        "grid items-center gap-10 lg:gap-16",
        !wideVisual && "lg:grid-cols-2",
        wideVisual && !reverse && "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]",
        wideVisual && reverse && "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14",
      )}
    >
      <div {...reveal()} className={cn("max-w-xl", reverse && "lg:order-2")}>
        <p className="text-sm font-semibold tracking-wide text-brand-600">
          {eyebrow}
        </p>
        <Heading id={headingId} className="feature-title mt-3">
          {title}
        </Heading>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted text-pretty">
          {body}
        </p>
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
          <p className="mt-6 flex gap-2.5 rounded-lg border border-line bg-surface px-4 py-3 text-sm leading-relaxed text-ink-muted">
            <Lightbulb className="mt-0.5 size-4 shrink-0 text-field-due" aria-hidden="true" />
            {tip}
          </p>
        ) : null}
      </div>
      {/* Text and visual share the same entrance timing; the visual retains its side direction. */}
      <div {...reveal(reverse ? "from-left" : "from-right")} className={cn("min-w-0", reverse && "lg:order-1")}>
        {children}
      </div>
    </article>
  );
}
