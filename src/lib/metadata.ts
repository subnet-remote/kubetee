import type { Metadata } from "next";
import { site } from "@/content/site";

export const homeOpenGraph: NonNullable<Metadata["openGraph"]> = {
  type: "website",
  locale: "en_US",
  siteName: site.name,
  title: site.title,
  description: site.description,
  images: [
    {
      url: "/og.png",
      width: 1200,
      height: 630,
      alt: "KubeTEE - The confidential AI factory on Bittensor SN90",
    },
  ],
};
