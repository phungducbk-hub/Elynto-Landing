import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/content/types";
import { FaqList } from "./FaqList";

export function Faq({ dict }: { dict: Dictionary }) {
  const { faq } = dict;
  return (
    <section id="faq" aria-labelledby="faq-title">
      <Container className="grid gap-10 py-20 sm:py-28 lg:grid-cols-12 lg:gap-12">
        <SectionHeading id="faq-title" title={faq.title} intro={faq.intro} className="lg:col-span-4" />
        <div className="lg:col-span-8">
          <FaqList items={faq.items} />
        </div>
      </Container>
    </section>
  );
}
