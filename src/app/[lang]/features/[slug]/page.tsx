import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubpageView } from "@/components/subpage/SubpageView";
import { isLocale } from "@/lib/i18n";
import { featurePageKeys, isFeaturePage } from "@/lib/pages";
import { subpageMetadata } from "@/lib/subpage-metadata";

type Params = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return featurePageKeys.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isFeaturePage(slug)) return {};
  return subpageMetadata(lang, slug);
}

export default async function FeaturePage({ params }: Params) {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isFeaturePage(slug)) notFound();
  return <SubpageView lang={lang} pageKey={slug} />;
}
