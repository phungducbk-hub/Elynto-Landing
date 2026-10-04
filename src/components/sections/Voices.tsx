import { BriefcaseBusiness, Building2, Laptop, UserRound, UsersRound, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Testimonials } from "@/components/ui/Testimonials";
import type { Dictionary, VoicePersona } from "@/content/types";
import { reveal } from "@/lib/reveal";

const personaIcons: Record<VoicePersona, LucideIcon> = {
  agency: BriefcaseBusiness,
  freelancer: Laptop,
  lead: UsersRound,
  owner: Building2,
  member: UserRound,
};

/**
 * The testimonial wall, filled with everyday work situations from the customer research.
 * There are no customer quotes yet, so cards name a role, never a person, and the section says so.
 */
export function Voices({ dict }: { dict: Dictionary }) {
  const { voices } = dict;
  const items = voices.items.map(({ quote, moment, persona }) => {
    const Icon = personaIcons[persona];
    return {
      text: quote,
      tag: moment,
      name: voices.personas[persona],
      avatar: <Icon className="size-4" aria-hidden="true" />,
    };
  });

  return (
    <section id="voices" aria-labelledby="voices-title">
      <Container className="py-20 sm:py-28">
        <SectionHeading id="voices-title" eyebrow={voices.eyebrow} title={voices.title} intro={voices.intro} align="center" />
        <p {...reveal("up", 200)} className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-ink-subtle text-pretty">
          {voices.note}
        </p>
        <div {...reveal("scale", 120)} className="mt-12 sm:mt-14">
          <Testimonials items={items} label={voices.regionLabel} pauseLabel={voices.pause} playLabel={voices.play} />
        </div>
      </Container>
    </section>
  );
}
