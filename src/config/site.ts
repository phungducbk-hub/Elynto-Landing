function envOr(value: string | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

/** Older deployments used the beta root for both actions; keep their env overrides working. */
function authUrl(value: string | undefined, path: "/sign-up" | "/sign-in") {
  const url = new URL(envOr(value, `https://beta.elynto.io${path}`));
  if (url.origin === "https://beta.elynto.io" && url.pathname === "/") url.pathname = path;
  return url.toString();
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
  /** Separate sign-up and sign-in routes, verified against the app source. */
  signupUrl: authUrl(process.env.NEXT_PUBLIC_SIGNUP_URL, "/sign-up"),
  loginUrl: authUrl(process.env.NEXT_PUBLIC_LOGIN_URL, "/sign-in"),
  /** Shown on the Contact page. No address has been confirmed yet, so it stays empty until set. */
  contactEmail: envOr(process.env.NEXT_PUBLIC_CONTACT_EMAIL, ""),
};

/**
 * Whether search engines may index the site.
 * Defaults to true only on Vercel production deployments; preview and local
 * builds are `noindex`. Force either way with SITE_INDEXABLE=true|false.
 */
export const isIndexable = process.env.SITE_INDEXABLE
  ? process.env.SITE_INDEXABLE === "true"
  : process.env.VERCEL_ENV === "production";
