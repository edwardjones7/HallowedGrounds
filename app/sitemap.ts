import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { locations } from "@/content/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/locations",
    "/menu",
    "/story",
    "/catering",
    "/shop",
    "/careers",
  ];

  const staticPages = routes.map((r) => ({
    url: `${site.url}${r}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : 0.7,
  }));

  const locationPages = locations.map((l) => ({
    url: `${site.url}/locations/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...locationPages];
}
