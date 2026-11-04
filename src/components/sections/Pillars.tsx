import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { pillars } from "@/content/site";

export function Pillars() {
  return (
    <section
      id="built"
      aria-labelledby="pillars-title"
      className="border-b border-line py-20 md:py-28"
    >
      <Container>
        <SectionLabel number="02">{pillars.kicker}</SectionLabel>
        <h2
          id="pillars-title"
          className="mt-4 w-full text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.05] tracking-[-0.03em] text-body lg:w-1/2"
        >
          {pillars.title}
        </h2>
        <p className="mt-4 max-w-[60ch] text-sm leading-6 text-muted lg:max-w-[55ch]">
          {pillars.intro}
        </p>

        <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-2">
          {pillars.items.map((item) => (
            <article key={item.title} className="bg-stage p-6 md:p-8">
              <h3 className="text-xl font-normal text-body">{item.title}</h3>
              <p className="mt-4 max-w-[48ch] text-sm leading-6 text-muted">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
