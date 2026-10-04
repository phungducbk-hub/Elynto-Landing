import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Audience } from "@/components/sections/Audience";
import { Benefits } from "@/components/sections/Benefits";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Voices } from "@/components/sections/Voices";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/content";
import { isLocale } from "@/lib/i18n";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: `${siteConfig.url}/${lang}`,
    inLanguage: lang,
    description: dict.meta.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/brand/elynto-mark.svg`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink focus:shadow-float"
      >
        {dict.a11y.skipToContent}
      </a>
      <div id="top" />
      <SiteHeader lang={lang} nav={dict.nav} signupUrl={siteConfig.signupUrl} loginUrl={siteConfig.loginUrl} />
      {/* overflow-x-clip: elements waiting to slide in sideways must not widen the page. */}
      <main id="main" tabIndex={-1} className="overflow-x-clip outline-none">
        <Hero lang={lang} dict={dict} />
        <Benefits dict={dict} />
        <HowItWorks lang={lang} dict={dict} />
        <Audience dict={dict} />
        <Voices dict={dict} />
        <Faq dict={dict} />
        <FinalCta dict={dict} />
      </main>
      <SiteFooter
        lang={lang}
        dict={dict}
        vision={siteConfig.vision}
        signupUrl={siteConfig.signupUrl}
        loginUrl={siteConfig.loginUrl}
      />
    </>
  );
}
