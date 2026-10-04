import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/content/types";
import { reveal } from "@/lib/reveal";
import { FaqList } from "./FaqList";

export function Faq({ dict }: { dict: Dictionary }) {
  const { faq } = dict;
  return (
    <section id="faq" aria-labelledby="faq-title">
      <Container className="grid gap-10 py-20 sm:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
        <SectionHeading id="faq-title" eyebrow={faq.eyebrow} title={faq.title} intro={faq.intro} />
        <div {...reveal("up", 160)} className="min-w-0">
          <FaqList items={faq.items} />
        </div>
      </Container>
    </section>
  );
}
