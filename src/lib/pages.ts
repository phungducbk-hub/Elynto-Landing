/**
 * Feature pages live under /[lang]/features/[slug]; every other subpage sits at /[lang]/[slug].
 * Features are listed in the order the home page presents them.
 */
export const featurePageKeys = [
  "natural-language-tasks",
  "delegated-work",
  "today",
  "ai-planning",
  "project-views",
] as const;

export const infoPageKeys = ["getting-started", "writing-tasks", "faq", "about", "contact", "privacy", "cookies"] as const;

export type FeaturePageKey = (typeof featurePageKeys)[number];
export type InfoPageKey = (typeof infoPageKeys)[number];
export type PageKey = FeaturePageKey | InfoPageKey;

export type PageGroup = "product" | "resources" | "company" | "legal";

/** Footer columns, in order. Each page belongs to exactly one. */
export const pageGroups: { id: PageGroup; pages: PageKey[] }[] = [
  { id: "product", pages: [...featurePageKeys] },
  { id: "resources", pages: ["getting-started", "writing-tasks", "faq"] },
  { id: "company", pages: ["about", "contact"] },
  { id: "legal", pages: ["privacy", "cookies"] },
];

export function isFeaturePage(key: string): key is FeaturePageKey {
  return (featurePageKeys as readonly string[]).includes(key);
}

export function isInfoPage(key: string): key is InfoPageKey {
  return (infoPageKeys as readonly string[]).includes(key);
}

export function groupOf(key: PageKey): PageGroup {
  return pageGroups.find((group) => group.pages.includes(key))!.id;
}

/** Path after the locale, without a leading slash. */
export function pagePath(key: PageKey) {
  return isFeaturePage(key) ? `features/${key}` : key;
}

export const allPageKeys: PageKey[] = [...featurePageKeys, ...infoPageKeys];
