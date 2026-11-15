import { LayoutDashboard, MessageSquareText, UserRoundCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/content/types";
import { reveal } from "@/lib/reveal";

const icons = [MessageSquareText, UserRoundCheck, LayoutDashboard];

export function Benefits({ dict }: { dict: Dictionary }) {
  const { benefits } = dict;
  return (
    <section id="benefits" aria-labelledby="benefits-title" className="border-y border-line bg-surface">
      <Container className="py-12 sm:py-14">
        <SectionHeading id="benefits-title" eyebrow={benefits.eyebrow} title={benefits.title} className="sr-only" />
        <ul className="grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
          {benefits.items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <li key={item.title} {...reveal("up", index * 110)} className="md:px-8 md:first:pl-0 md:last:pr-0">
                <span className="inline-grid size-9 place-items-center rounded-lg bg-brand-50 text-brand ring-1 ring-brand-100 ring-inset">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg leading-snug font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-muted text-pretty">{item.body}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
