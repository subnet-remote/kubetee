import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1 py-24 md:py-32">
        <Container>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
            404
          </p>
          <h1 className="mt-6 max-w-[14ch] text-[clamp(3rem,7vw,6rem)] font-light leading-[0.98] tracking-[-0.04em] text-body">
            This page could not be found.
          </h1>
          <p className="mt-6 max-w-[52ch] text-base leading-7 text-muted">
            The page you requested does not exist. Return to the landing page or
            open the gateway.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center bg-brand px-5 py-3 text-sm font-medium text-stage"
            >
              Back to KubeTEE
            </Link>
            <a
              href="https://llm.kubetee.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center border border-line px-5 py-3 text-sm font-medium text-body"
            >
              Open the Gateway
            </a>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
