import { HeroMotion } from "@/components/motion/HeroMotion";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SealedCube } from "@/components/visuals/SealedCube";
import { hero } from "@/content/site";

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="border-b border-line pb-14 pt-8 md:pb-28 md:pt-24"
    >
      <Container>
        <HeroMotion>
          <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1">
              <p
                data-motion="eyebrow"
                className="text-xs font-medium uppercase tracking-widest text-muted"
              >
                {hero.eyebrow}
              </p>

              <h1
                id="hero-title"
                aria-label="The Confidential AI Factory on Bittensor"
                className="mt-4 text-[clamp(2.5rem,7vw,6.5rem)] font-light leading-[0.95] tracking-[-0.04em] text-body md:mt-6 xl:text-[clamp(2.5rem,6.2vw,6.5rem)]"
              >
                {hero.titleLines.map((line, index) => (
                  <span
                    key={line.text}
                    aria-hidden="true"
                    className="block overflow-hidden"
                  >
                    <span
                      className={`block ${line.accent ? "text-brand" : ""}`}
                    >
                      {line.text}
                      {index < hero.titleLines.length - 1 ? " " : null}
                    </span>
                  </span>
                ))}
              </h1>
            </div>

            <figure
              data-motion="figure"
              className="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1"
            >
              <div className="mx-auto max-w-130 lg:ml-auto">
                <SealedCube
                  title={hero.cube.title}
                  description={hero.cube.description}
                />
              </div>
              <figcaption className="mx-auto mt-4 max-w-[60ch] text-center font-mono text-[11px] uppercase tracking-[0.12em] text-faint md:mt-6">
                {hero.cube.caption}
              </figcaption>
            </figure>

            <div className="lg:col-span-7 lg:col-start-1 lg:row-start-2">
              <p className="max-w-[58ch] text-sm leading-7 text-muted md:text-lg">
                {hero.description}
              </p>

              <div
                data-motion="ctas"
                className="mt-6 flex flex-wrap items-center gap-3 md:mt-10"
              >
                <ButtonLink href={hero.primaryCta.href}>
                  {hero.primaryCta.label}
                </ButtonLink>
                <ButtonLink href={hero.secondaryCta.href} variant="secondary">
                  {hero.secondaryCta.label}
                </ButtonLink>
              </div>

              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-faint md:mt-8">
                {hero.specLine}
              </p>
            </div>
          </div>
        </HeroMotion>
      </Container>
    </section>
  );
}
