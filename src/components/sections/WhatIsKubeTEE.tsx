import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProtectionAsset } from "@/components/visuals/ProtectionAsset";
import { what } from "@/content/site";

export function WhatIsKubeTEE() {
  return (
    <section
      id="what"
      aria-labelledby="what-title"
      className="border-b border-line py-20 md:py-28"
    >
      <Container>
        <SectionLabel number="01">{what.kicker}</SectionLabel>

        <h2
          id="what-title"
          className="mt-4 w-full text-[clamp(2rem,3.6vw,3.25rem)] font-light leading-[1.05] tracking-[-0.03em] text-body lg:w-1/2"
        >
          {what.title}
        </h2>

        <p className="mt-4 max-w-[60ch] text-sm leading-6 text-muted lg:max-w-[55ch]">
          {what.intro}
        </p>

        <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-3">
          {what.assets.map((asset) => (
            <article key={asset.variant} className="asset-card p-4 md:p-6">
              <div className="asset-main">
                <ProtectionAsset variant={asset.variant} />
                <p className="mt-5 text-xs font-medium uppercase tracking-[0.14em] text-brand">
                  {asset.label}
                </p>
                <h3 className="mt-2 text-lg font-normal text-body">
                  {asset.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {asset.caption}
                </p>
              </div>
              <p className="asset-extra mt-2 text-sm leading-6 text-muted">
                {asset.detail}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
