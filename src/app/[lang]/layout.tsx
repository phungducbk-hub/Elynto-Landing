import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { AnalyticsListener } from "@/components/layout/AnalyticsListener";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { isIndexable, siteConfig } from "@/config/site";
import { getDictionary } from "@/content";
import { inter } from "@/lib/fonts";
import { isLocale, locales, ogLocales } from "@/lib/i18n";
import { revealBootScript } from "@/lib/reveal";
import {
  STATS_CHOICE_EVENT,
  STATS_CONSENT_KEY,
  STATS_CONSENT_NO,
  STATS_CONSENT_YES,
  STATS_OPT_OUT_KEY,
} from "@/lib/stats/client";
import {
  APP_HOSTS,
  FIRST_TOUCH_KEY,
  FIRST_TOUCH_MAX_AGE_MS,
  MAX_VALUE_LENGTH,
  UTM_KEYS,
  utmForwardBootScript,
} from "@/lib/utm-forward";
import "../globals.css";

/**
 * Campaign forwarding to the app (src/lib/utm-forward.ts), inlined in <head> so it also covers a click made before
 * the page's JavaScript has loaded. App hosts: the known ones plus the configured sign-up / log-in hosts.
 */
const utmForwardScript = utmForwardBootScript({
  appHosts: [
    ...new Set([
      ...APP_HOSTS,
      new URL(siteConfig.signupUrl).hostname.toLowerCase(),
      new URL(siteConfig.loginUrl).hostname.toLowerCase(),
    ]),
  ],
  storageKey: FIRST_TOUCH_KEY,
  maxAgeMs: FIRST_TOUCH_MAX_AGE_MS,
  maxLength: MAX_VALUE_LENGTH,
  utmKeys: [...UTM_KEYS],
  consentKey: STATS_CONSENT_KEY,
  consentYes: STATS_CONSENT_YES,
  consentNo: STATS_CONSENT_NO,
  optOutKey: STATS_OPT_OUT_KEY,
  choiceEvent: STATS_CHOICE_EVENT,
});

type LayoutParams = { params: Promise<{ lang: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#f7f7f8",
  colorScheme: "light",
};

export async function generateMetadata({ params }: LayoutParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  const socialTitle = `Elynto - ${siteConfig.vision}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: dict.meta.title,
    description: dict.meta.description,
    applicationName: siteConfig.name,
    alternates: {
      canonical: `/${lang}`,
      languages: { vi: "/vi", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      url: `/${lang}`,
      locale: ogLocales[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocales[l]),
      title: socialTitle,
      description: dict.meta.ogDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: dict.meta.ogDescription,
    },
    robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export default async function RootLayout({ children, params }: LayoutParams & { children: ReactNode }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    // suppressHydrationWarning: the boot script sets data-motion on <html> before React hydrates.
    <html lang={lang} className={inter.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootScript }} />
        <script dangerouslySetInnerHTML={{ __html: utmForwardScript }} />
      </head>
      <body className="min-h-dvh">
        <AnalyticsListener />
        <RevealObserver />
        {children}
      </body>
    </html>
  );
}
