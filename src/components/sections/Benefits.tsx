import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/content/types";

export function Benefits({ dict }: { dict: Dictionary }) {
  const { benefits } = dict;
  return (
    <section id="benefits" aria-labelledby="benefits-title">
      <Container className="pt-12 pb-20 sm:pt-16 sm:pb-28">
        <SectionHeading id="benefits-title" title={benefits.title} />
        <dl className="mt-12 border-t-2 border-navy sm:mt-16">
          {benefits.items.map((item) => (
            <div key={item.title} className="grid gap-2 border-b border-rule py-7 sm:py-9 md:grid-cols-12 md:gap-8">
              <dt className="type-h3 text-balance md:col-span-5">{item.title}</dt>
              <dd className="max-w-[36rem] type-lead text-pretty md:col-span-7 lg:col-span-6">{item.body}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
