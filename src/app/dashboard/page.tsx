import type { Metadata } from "next";
import { FillsLedger } from "@/components/dashboard/FillsLedger";
import { MetricStrip } from "@/components/dashboard/MetricStrip";
import { OperatorPanel } from "@/components/dashboard/OperatorPanel";
import { SwapValueChart } from "@/components/dashboard/SwapValueChart";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { dashboard } from "@/content/dashboard";
import { site } from "@/content/site";
import { dashboardSummary, formatDate } from "@/lib/dashboard";
import { dashboardStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: dashboard.meta.title,
  description: dashboard.meta.description,
  alternates: {
    canonical: "/dashboard",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    url: "/dashboard",
    title: dashboard.meta.title,
    description: dashboard.meta.description,
    images: [
      {
        url: "/og-dashboard.png",
        width: 1200,
        height: 630,
        alt: "KubeTEE SN28 to SN90 alpha recycle ledger on Bittensor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@KubeTEEAI",
    creator: "@KubeTEEAI",
    title: dashboard.meta.title,
    description: dashboard.meta.description,
    images: ["/og-dashboard.png"],
  },
};

export default function DashboardPage() {
  const summary = dashboardSummary;

  return (
    <>
      <JsonLd data={dashboardStructuredData} />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader activeHref="/dashboard" />

      <main id="main" className="flex-1">
        <section
          aria-labelledby="dashboard-title"
          className="border-b border-line pb-10 pt-8 md:pb-14 md:pt-10"
        >
          <Container>
            <SectionLabel number="01">{dashboard.header.kicker}</SectionLabel>
            <h1
              id="dashboard-title"
              className="mt-4 max-w-[34ch] text-[clamp(2.5rem,4.2vw,3.75rem)] font-light leading-[1.02] tracking-[-0.03em] text-body"
            >
              {dashboard.header.title}
            </h1>
            <p className="mt-5 max-w-[62ch] text-sm leading-6 text-muted md:text-base md:leading-7">
              {dashboard.header.intro}
            </p>

            <MetricStrip summary={summary} />
          </Container>
        </section>

        <section
          aria-labelledby="trend-title"
          className="border-b border-line py-10 md:py-14"
        >
          <Container>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-8">
                <SectionLabel number="02">
                  {dashboard.chart.kicker}
                </SectionLabel>
                <h2
                  id="trend-title"
                  className="mt-4 text-[clamp(1.5rem,2.2vw,2rem)] font-light leading-[1.1] tracking-[-0.02em] text-body"
                >
                  {dashboard.chart.title}
                </h2>
                <p className="mt-2 text-sm text-muted">
                  {dashboard.chart.subtitle} {formatDate(summary.window.end)}
                </p>

                <SwapValueChart summary={summary} />
              </div>

              <div className="border-t border-line pt-6 lg:col-span-4 lg:border-t-0 lg:border-l lg:border-line lg:pl-10 lg:pt-0">
                <OperatorPanel summary={summary} />
              </div>
            </div>
          </Container>
        </section>

        <section
          aria-labelledby="ledger-title"
          className="border-b border-line py-10 md:py-14"
        >
          <Container>
            <SectionLabel number="03">{dashboard.table.kicker}</SectionLabel>
            <h2
              id="ledger-title"
              className="mt-4 text-[clamp(1.5rem,2.2vw,2rem)] font-light leading-[1.1] tracking-[-0.02em] text-body"
            >
              {dashboard.table.title}
            </h2>
            <p className="mt-4 max-w-[60ch] text-sm leading-6 text-muted">
              {dashboard.table.intro}
            </p>

            <FillsLedger fills={summary.fills} />
          </Container>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
