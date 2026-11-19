import { fullLocation, siteConfig } from "./site-config";

/**
 * Resolve the canonical public URL of the website.
 *
 * Priority:
 *  1. NEXT_PUBLIC_SITE_URL — set this in Vercel once the final address is known.
 *  2. VERCEL_PROJECT_PRODUCTION_URL — injected automatically by Vercel, so the
 *     free *.vercel.app production address works with zero configuration.
 *  3. http://localhost:3000 for local development.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProd) return `https://${vercelProd.replace(/\/+$/, "")}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

/** Turn a site-relative path ("/images/x.jpg") into an absolute URL. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, `${SITE_URL}/`).toString();
}

/**
 * Only the production deployment should be indexed. Vercel preview deployments
 * get `noindex` so Google never sees duplicate copies of the site.
 */
export const IS_INDEXABLE = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;

export const seo = {
  title: `${siteConfig.name} | ${siteConfig.profession}, ${siteConfig.court} | ${siteConfig.location.city}`,
  description: `Official personal profile of ${siteConfig.profession} ${siteConfig.name}, ${siteConfig.court}, based in ${fullLocation}. Explore his professional profile, photographs and public Instagram presence.`,
  locale: "en_IN",
  language: "en-IN",
  googleVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || undefined,
} as const;
