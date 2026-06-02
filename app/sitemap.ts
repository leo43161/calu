import type { MetadataRoute } from "next";

const SITE_URL = "https://calu.com.ar";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const sections = ["", "#servicios", "#blends", "#shop"];

  return sections.map((hash) => ({
    url: `${SITE_URL}/${hash}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: hash === "" ? 1 : 0.8,
  }));
}
