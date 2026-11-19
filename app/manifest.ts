import type { MetadataRoute } from "next";
import { seo } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.profession}, ${siteConfig.court}`,
    short_name: siteConfig.name,
    description: seo.description,
    start_url: "/",
    display: "browser",
    background_color: "#FFFFFF",
    theme_color: "#FFFFFF",
    lang: seo.language,
    icons: [
      { src: "/icon.png", sizes: "256x256", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
