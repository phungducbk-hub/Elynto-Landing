import { Building2, UserRound, UsersRound } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/content/types";
import { reveal } from "@/lib/reveal";
const icons=[UserRound,UsersRound,Building2];
export function Audience({dict}:{dict:Dictionary}) {
  const {audience}=dict;
  return <section aria-labelledby="audience-title" className="bg-white">
    <Container className="py-14 sm:py-20">
      <div {...reveal()} className="grid gap-8 lg:grid-cols-[0.8fr_2fr] lg:gap-14">
        <div><p className="eyebrow">{audience.eyebrow}</p><h2 id="audience-title" className="mt-3 text-2xl leading-tight font-semibold tracking-tight text-ink sm:text-3xl">{audience.title}</h2></div>
        <ul className="grid gap-7 sm:grid-cols-3">{audience.items.map((item,index)=>{const Icon=icons[index];return <li key={item.title}><Icon aria-hidden="true" className="size-5 text-brand" /><h3 className="mt-4 text-base font-semibold text-ink">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.body}</p></li>;})}</ul>
      </div>
    </Container>
  </section>;
}
