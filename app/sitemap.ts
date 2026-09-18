import type { MetadataRoute } from "next";

// required so these still generate under `output: export`
export const dynamic = "force-static";
import { articles } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/services", "/work", "/about", "/contact", "/insights", "/privacy", "/terms"];
  return [
    ...routes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified: now,
      priority: route === "" ? 1 : 0.8,
    })),
    ...articles.map((a) => ({
      url: `${site.url}/insights/${a.slug}`,
      lastModified: new Date(a.date),
      priority: 0.6,
    })),
  ];
}
