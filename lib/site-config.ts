/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CENTRAL WEBSITE CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 *  All personal and professional details shown on the website live here.
 *  Edit this file to update content; the components, metadata, structured data
 *  (JSON-LD) and sitemap all read from it automatically.
 *
 *  RULE: Only add information that is verified and that Manthan has approved
 *  for public display. Anything left `undefined` or empty is simply not shown.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type ProfileField = {
  label: string;
  value: string;
  /** Optional smaller line shown beneath the value. */
  note?: string;
};

export const siteConfig = {
  /* ── Identity ─────────────────────────────────────────────────────────── */
  name: "Manthan Raval",
  givenName: "Manthan",
  familyName: "Raval",
  profession: "Advocate",
  /** Shown on its own line beneath "Advocate" throughout the site. */
  court: "Gujarat High Court",

  location: {
    city: "Patan",
    region: "Gujarat",
    country: "India",
    countryCode: "IN",
  },

  /* ── Biography ────────────────────────────────────────────────────────── */
  heroDescription:
    "Welcome to the official personal profile of Advocate Manthan Raval, based in Patan, Gujarat. Explore his professional profile, background and selected photographs.",

  /** Each string is rendered as its own paragraph in the About section. */
  biography: [
    "Manthan Raval is an advocate at the Gujarat High Court, based in Patan, Gujarat. Through this website, visitors can explore his professional identity, learn more about his background and view selected photographs. This platform serves as his personal online presence and a point of connection.",
  ],

  /* ── Profile photograph ───────────────────────────────────────────────── */
  /**
   * Main portrait in /public/images
   * (or change `src`). Width/height are read from the file automatically.
   * Until the file exists, an elegant neutral placeholder is shown.
   */
  profileImage: {
    src: "/images/manthan-raval-advocate-profile.jpg",
    alt: "Advocate Manthan Raval in black advocate robes, standing outside the High Court of Gujarat",
  },

  /** Secondary photograph shown beside the biography in the About section. */
  aboutImage: {
    src: "/images/manthan-raval-advocate-portrait.jpg",
    alt: "Full-length portrait of Manthan Raval in advocate robes beside a garden hedge",
  },

  /* ── Social profiles ──────────────────────────────────────────────────── */
  social: {
    instagram: {
      url: "https://www.instagram.com/adv.manthan/",
      handle: "@adv.manthan",
    },
    /** Add when available, e.g. "https://www.linkedin.com/in/…" */
    linkedin: undefined as string | undefined,
  },

  /* ── Contact (private by default) ─────────────────────────────────────── */
  /**
   * Fill these in ONLY after Manthan explicitly approves public display.
   * They appear in the Connect section and structured data when set.
   */
  contact: {
    email: undefined as string | undefined,
    phone: "+91 82002 51252" as string | undefined,
  },

  /* ── Verified professional details (optional) ─────────────────────────── */
  /**
   * Extra rows for the "Professional Profile" section. Add only verified facts.
   * Examples (do not uncomment until verified):
   *   { label: "Education", value: "LL.B., …" },
   *   { label: "Practice Areas", value: "…" },
   *   { label: "Enrolment", value: "Bar Council of Gujarat, …" },
   */
  additionalProfileFields: [] as ProfileField[],

  /**
   * Verified schools/universities for structured data (Person.alumniOf).
   * Example: ["Hemchandracharya North Gujarat University"] — only once verified.
   */
  alumniOf: [] as string[],

  /** Verified practice areas for structured data (Person.knowsAbout). */
  knowsAbout: [] as string[],
} as const;

export const fullLocation = `${siteConfig.location.city}, ${siteConfig.location.region}, ${siteConfig.location.country}`;
export const shortLocation = `${siteConfig.location.city}, ${siteConfig.location.region}`;

/** Every public profile URL, used for structured data `sameAs`. */
export function sameAsLinks(): string[] {
  const { instagram, linkedin } = siteConfig.social;
  return [instagram.url, linkedin].filter((v): v is string => Boolean(v));
}

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Gallery" },
  { href: "#connect", label: "Connect" },
] as const;

/** "+91 82002 51252" → "tel:+918200251252" */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
