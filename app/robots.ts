import type { MetadataRoute } from "next";
import { IS_INDEXABLE, SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (!IS_INDEXABLE) {
    // Vercel preview deployments: keep them out of search results.
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: [
      // Image optimisation and photo URLs stay crawlable so photos can appear in Google Images.
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
