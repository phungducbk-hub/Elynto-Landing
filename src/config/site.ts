function envOr(value: string | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

export const siteConfig = {
  name: "Elynto",
  /** Public URL of this landing page — used for canonical links, sitemap and Open Graph. */
  url: envOr(process.env.NEXT_PUBLIC_SITE_URL, "https://elynto.io").replace(/\/$/, ""),
  /** Brand vision line, kept in English in every language. Used in metadata, the social image and the footer. */
  vision: "The interface between you and your work",
  /**
   * The hero's shorter take on the vision, set on three lines with the subject cycling between
   * "you" and "your team".
   */
  heroVision: {
    lead: "The interface",
    bridge: "between",
    subjects: ["you", "your team"],
    tail: "and work",
  },
  /**
   * Sign-up entry point for every "Start free trial" button.
   * The dedicated sign-up route of beta.elynto.io has not been confirmed yet,
   * so the app root is used. Override with NEXT_PUBLIC_SIGNUP_URL once known.
   */
  signupUrl: envOr(process.env.NEXT_PUBLIC_SIGNUP_URL, "https://beta.elynto.io"),
  /** Log-in entry point. Same note as above. */
  loginUrl: envOr(process.env.NEXT_PUBLIC_LOGIN_URL, "https://beta.elynto.io"),
};

/**
 * Whether search engines may index the site.
 * Defaults to true only on Vercel production deployments; preview and local
 * builds are `noindex`. Force either way with SITE_INDEXABLE=true|false.
 */
export const isIndexable = process.env.SITE_INDEXABLE
  ? process.env.SITE_INDEXABLE === "true"
  : process.env.VERCEL_ENV === "production";
