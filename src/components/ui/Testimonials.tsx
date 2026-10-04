"use client";

import { LazyMotion, m, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useState, type ReactNode } from "react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

export type Testimonial = {
  text: string;
  name: string;
  avatar: ReactNode;
  /** Short context shown above the quote. */
  tag?: string;
};

const loadMotionFeatures = () => import("./motion-features").then((mod) => mod.default);

type Props = {
  items: Testimonial[];
  label: string;
  pauseLabel: string;
  playLabel: string;
};

/**
 * Adapted from the 21st.dev "testimonial-v2" columns: a wall of cards drifting upward in columns
 * at different speeds. Changes for this site: CSS keyframes drive the loop so it pauses on hover and
 * from a button (WCAG 2.2.2); the duplicate copy that closes the loop is hidden from assistive tech;
 * reduced motion shows a still wall; colours come from the site tokens.
 */
export function Testimonials({ items, label, pauseLabel, playLabel }: Props) {
  const [paused, setPaused] = useState(false);
  const third = Math.ceil(items.length / 3);
  const columns = [items.slice(0, third), items.slice(third, third * 2), items.slice(third * 2)];
  // Tablets show two columns, so the third column's cards are shared out between them below lg.
  const spare = [columns[2].filter((_, i) => i % 2 === 0), columns[2].filter((_, i) => i % 2 === 1)];

  const toggle = () => {
    setPaused(!paused);
    track("testimonials_motion_toggle", { paused: !paused });
  };

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <div className="group/wall" data-paused={paused ? "" : undefined}>
        <div
          role="region"
          aria-label={label}
          className="group/region flex max-h-[46rem] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] motion-reduce:max-h-none motion-reduce:[mask-image:none]"
        >
          {/* Phones: one column with every card. Wider: columns at different speeds and start
              offsets, so they are out of step from the first frame. */}
          <TestimonialsColumn items={items} duration={84} className="max-w-sm md:hidden" />
          <TestimonialsColumn items={columns[0]} belowLg={spare[0]} duration={30} offset={4} className="hidden max-w-xs md:block" />
          <TestimonialsColumn items={columns[1]} belowLg={spare[1]} duration={37} offset={21} className="hidden max-w-xs md:block" />
          <TestimonialsColumn items={columns[2]} duration={33} offset={12} className="hidden max-w-xs lg:block" />
        </div>

        <div className="mt-6 flex justify-center motion-reduce:hidden">
          <button
            type="button"
            onClick={toggle}
            className="inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-medium text-ink-muted ring-1 ring-line transition-colors ring-inset hover:bg-surface hover:text-ink"
          >
            {paused ? <Play className="size-3.5" aria-hidden="true" /> : <Pause className="size-3.5" aria-hidden="true" />}
            {paused ? playLabel : pauseLabel}
          </button>
        </div>
      </div>
    </LazyMotion>
  );
}

type ColumnProps = {
  items: Testimonial[];
  /** Extra cards shown only below the lg breakpoint. */
  belowLg?: Testimonial[];
  /** Seconds for one full loop. */
  duration: number;
  /** Seconds into the loop to start at. */
  offset?: number;
  className?: string;
};

function TestimonialsColumn({ items, belowLg = [], duration, offset = 0, className }: ColumnProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Two copies plus pb-6 = 2 × (list + gap), so translating by -50% lands exactly on the copy. */}
      <div
        className="flex flex-col gap-6 pb-6 motion-safe:animate-marquee group-hover/region:[animation-play-state:paused] group-data-paused/wall:[animation-play-state:paused]"
        style={{ animationDuration: `${duration}s`, animationDelay: `-${offset}s` }}
      >
        <TestimonialList items={items} belowLg={belowLg} />
        <TestimonialList items={items} belowLg={belowLg} duplicate />
      </div>
    </div>
  );
}

type ListProps = { items: Testimonial[]; belowLg: Testimonial[]; duplicate?: boolean };

function TestimonialList({ items, belowLg, duplicate = false }: ListProps) {
  return (
    <ul aria-hidden={duplicate || undefined} className={cn("flex flex-col gap-6", duplicate && "motion-reduce:hidden")}>
      {items.map((item) => (
        <TestimonialCard key={item.text} {...item} />
      ))}
      {belowLg.map((item) => (
        <TestimonialCard key={item.text} {...item} className="lg:hidden" />
      ))}
    </ul>
  );
}

function TestimonialCard({ text, name, avatar, tag, className }: Testimonial & { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <m.li
      whileHover={reduceMotion ? undefined : { y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "rounded-2xl border border-line bg-surface p-6 shadow-card transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-float sm:p-7",
        className,
      )}
    >
      <figure>
        {tag ? <p className="inline-flex rounded-full bg-sunken px-2.5 py-1 text-xs font-medium text-ink-muted">{tag}</p> : null}
        <blockquote className="mt-4 text-base leading-relaxed text-ink text-pretty">
          <p>“{text}”</p>
        </blockquote>
        <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
          <span className="inline-grid size-9 shrink-0 place-items-center rounded-full bg-brand-50 text-brand ring-1 ring-brand-100 ring-inset">
            {avatar}
          </span>
          <span className="text-sm leading-snug font-semibold text-ink">{name}</span>
        </figcaption>
      </figure>
    </m.li>
  );
}
