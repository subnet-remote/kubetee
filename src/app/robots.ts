import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const baseUrl = site.url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
