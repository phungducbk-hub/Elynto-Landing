import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExpandableGallery } from "@/components/ui/gallery-animation";
import { getCustomerGallery } from "@/content/customer-gallery";
import type { Locale } from "@/lib/i18n";
import { reveal } from "@/lib/reveal";

export function CustomerGallery({ lang }: { lang: Locale }) {
  const copy = getCustomerGallery(lang);
  return (
    <section id="customer-stories" aria-labelledby="customer-stories-title" className="bg-white">
      <Container className="py-16 sm:py-24">
        <SectionHeading id="customer-stories-title" eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} align="center" />
        <div {...reveal("visual")} className="mt-10 sm:mt-12">
          <ExpandableGallery copy={copy} />
        </div>
      </Container>
    </section>
  );
}
