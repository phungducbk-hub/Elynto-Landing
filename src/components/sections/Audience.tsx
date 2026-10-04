import { Building2, UserRound, UsersRound } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/content/types";

const icons = [UserRound, UsersRound, Building2];

export function Audience({ dict }: { dict: Dictionary }) {
  const { audience } = dict;
  return (
    <section aria-labelledby="audience-title" className="border-y border-line bg-surface">
      <Container className="py-20 sm:py-24">
        <SectionHeading id="audience-title" eyebrow={audience.eyebrow} title={audience.title} />
        <ul className="mt-12 grid divide-y divide-line rounded-2xl border border-line bg-canvas md:grid-cols-3 md:divide-x md:divide-y-0">
          {audience.items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <li key={item.title} className="flex flex-col p-6 sm:p-8">
                <Icon className="size-6 text-brand" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-1 text-sm text-ink-subtle">{item.who}</p>
                <p className="mt-4 text-base leading-relaxed text-ink-muted text-pretty">{item.body}</p>
                <div className="mt-6 pt-1">
                  <p className="text-xs font-semibold tracking-wide text-ink-subtle uppercase">{audience.examplesLabel}</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {item.examples.map((example) => (
                      <li
                        key={example}
                        className="rounded-full bg-surface px-3 py-1 text-sm text-ink-muted ring-1 ring-line ring-inset"
                      >
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
