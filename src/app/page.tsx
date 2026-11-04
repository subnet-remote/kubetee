import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Coming } from "@/components/sections/Coming";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { LiveToday } from "@/components/sections/LiveToday";
import { Pillars } from "@/components/sections/Pillars";
import { WhatIsKubeTEE } from "@/components/sections/WhatIsKubeTEE";
import { JsonLd } from "@/components/seo/JsonLd";
import { sectionLinks } from "@/content/site";
import { homeOpenGraph } from "@/lib/metadata";
import { homeStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { ...homeOpenGraph, url: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd data={homeStructuredData} />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader activeHref="/" />
      <main id="main" className="flex-1">
        <Hero />
        <WhatIsKubeTEE />
        <Pillars />
        <HowItWorks />
        <LiveToday />
        <Coming />
        <Faq />
        <ClosingCta />
      </main>
      <SiteFooter sectionLinks={sectionLinks} />
    </>
  );
}
