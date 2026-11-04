import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StatusTag } from "@/components/ui/StatusTag";
import { coming } from "@/content/site";

export function Coming() {
  return (
    <section
      id="coming"
      aria-labelledby="coming-title"
      className="border-b border-line py-20 md:py-28"
    >
      <Container>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <SectionLabel number="05">{coming.kicker}</SectionLabel>
            <h2
              id="coming-title"
              className="mt-6 max-w-[16ch] text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.02] tracking-[-0.03em] text-body"
            >
              {coming.title}
            </h2>
          </div>
          <StatusTag />
        </div>

        <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2">
          {coming.items.map((item) => (
            <article key={item.title} className="bg-stage-deep p-6 md:p-8">
              <h3 className="text-xl font-normal text-body">{item.title}</h3>
              <p className="mt-3 max-w-[48ch] text-sm leading-6 text-muted">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
