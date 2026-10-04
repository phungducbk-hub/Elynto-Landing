import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/content/types";

export function Audience({ dict }: { dict: Dictionary }) {
  const { audience } = dict;
  return (
    <section aria-labelledby="audience-title" className="bg-fog">
      <Container className="py-20 sm:py-28">
        <SectionHeading id="audience-title" title={audience.title} />
        <ul className="mt-12 grid gap-12 sm:mt-16 md:grid-cols-3 md:gap-8 lg:gap-12">
          {audience.items.map((item) => (
            <li key={item.title} className="flex flex-col border-t-2 border-navy pt-5">
              <h3 className="text-xl font-semibold text-ink stretch-wide">{item.title}</h3>
              <p className="mt-3 text-lg leading-snug font-medium text-navy text-pretty">{item.question}</p>
              <p className="mt-3 text-base leading-relaxed text-pretty">{item.body}</p>
              <p className="mt-auto pt-6">
                <span className="block rounded-xl border border-rule bg-paper px-4 py-3 text-[1.0625rem] leading-snug text-ink">
                  “{item.example}”
                </span>
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
