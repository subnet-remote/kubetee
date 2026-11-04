import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: site.title,
    short_name: site.name,
    description: site.description,
    lang: "en",
    dir: "ltr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: site.themeColor,
    theme_color: site.themeColor,
    categories: ["technology", "business"],
    icons: [
      {
        src: "/brand/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/brand/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/brand/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Recycle dashboard",
        short_name: "Dashboard",
        description: "SN28 → SN90 alpha recycle ledger",
        url: "/dashboard",
        icons: [
          {
            src: "/brand/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    ],
  };
}
