import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { dashboardSummary } from "@/lib/dashboard";

const baseUrl = site.url;
const dashboardDate = new Date(dashboardSummary.generatedAt);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(site.lastUpdated),
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: Number.isNaN(dashboardDate.getTime())
        ? new Date(site.lastUpdated)
        : dashboardDate,
    },
  ];
}
