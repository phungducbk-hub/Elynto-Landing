import type { Locale } from "@/lib/i18n";

/**
 * Real product media. Each visual on the page is an HTML recreation of the beta
 * interface until a real asset is registered here. Drop files into /public/media
 * and fill in the entries below; the page switches to the real asset automatically.
 *
 * Use footage/screenshots recorded with sample data only: no real customer
 * names, emails or tasks.
 */

export type ProductVideo = {
  /** e.g. "/media/demo-vi.mp4" — H.264 MP4, muted, 10–15 s, ideally < 2 MB. */
  src: string;
  /** Poster frame shown before playback, e.g. "/media/demo-vi-poster.webp". */
  poster: string;
  width: number;
  height: number;
};

export type ProductImage = {
  /** e.g. "/media/planning-vi.webp" */
  src: string;
  width: number;
  height: number;
  alt: string;
};

type PerLocale<T> = Partial<Record<Locale, T>>;

export const productMedia: {
  /** Hero demo: one sentence becoming a task. */
  heroDemo: PerLocale<ProductVideo>;
  /** "Assign and follow up" feature (Delegated view). */
  delegate: PerLocale<ProductImage>;
  /** "Plan projects with AI" feature. */
  planning: PerLocale<ProductImage>;
  /** "Follow your projects" feature (project overview + views). */
  project: PerLocale<ProductImage>;
  /** "Today" feature. */
  today: PerLocale<ProductImage>;
} = {
  heroDemo: {},
  delegate: {},
  planning: {},
  project: {},
  today: {},
};
