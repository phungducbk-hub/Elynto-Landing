import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/content/types";

/** Situations from customer research, each paired with what changes in Elynto. */
export function Problems({ dict }: { dict: Dictionary }) {
  const { problems } = dict;
  return (
    <section id="benefits" aria-labelledby="benefits-title">
      <Container className="pt-12 pb-20 sm:pt-16 sm:pb-28">
        <SectionHeading id="benefits-title" title={problems.title} intro={problems.intro} />

        <div className="mt-12 sm:mt-16">
          <div className="hidden grid-cols-2 gap-12 border-b-2 border-navy pb-3 text-[0.9375rem] font-semibold md:grid">
            <span className="text-muted">{problems.beforeLabel}</span>
            <span className="text-navy">{problems.afterLabel}</span>
          </div>
          <ul className="border-t-2 border-navy md:border-t-0">
            {problems.rows.map((row) => (
              <li key={row.afterTitle} className="grid gap-4 border-b border-rule py-7 md:grid-cols-2 md:gap-12 md:py-9">
                <div>
                  <p className="text-sm font-semibold text-muted md:hidden">{problems.beforeLabel}</p>
                  <p className="mt-1 max-w-[30rem] text-lg leading-relaxed text-muted text-pretty md:mt-0">{row.before}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy md:hidden">{problems.afterLabel}</p>
                  <p className="mt-1 text-xl leading-snug font-semibold text-ink stretch-wide md:mt-0">{row.afterTitle}</p>
                  <p className="mt-2 max-w-[32rem] text-base leading-relaxed text-pretty">{row.afterBody}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
