import type { PageKey } from "@/lib/pages";

export type PageSection = {
  heading: string;
  body?: string[];
  points?: string[];
  table?: { caption: string; columns: string[]; rows: string[][] };
};

export type SubPage = {
  /** Label in the footer and in "related" lists. */
  navLabel: string;
  /** Short tag next to the footer link, e.g. "AI". */
  badge?: string;
  eyebrow: string;
  title: string;
  /** Lead paragraph; also the meta description. */
  description: string;
  sections: PageSection[];
};

export type PagesDictionary = Record<PageKey, SubPage>;
