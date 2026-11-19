import type { MetadataRoute } from "next";
import { getAllPhotos } from "@/lib/photos";
import { absoluteUrl, SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      // Image sitemap entries help Google discover every real photograph.
      images: getAllPhotos().map((p) => absoluteUrl(p.src)),
    },
  ];
}
