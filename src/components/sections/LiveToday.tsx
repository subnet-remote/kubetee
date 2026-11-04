import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { live } from "@/content/site";
import { isExternalHref } from "@/lib/links";

export function LiveToday() {
  return (
    <section
      id="live"
      aria-labelledby="live-title"
      className="border-b border-line py-20 md:py-28"
    >
      <Container>
        <SectionLabel number="04">{live.kicker}</SectionLabel>
        <h2
          id="live-title"
          className="mt-6 w-full text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.02] tracking-[-0.03em] text-body lg:w-1/2"
        >
          {live.title}
        </h2>
        <p className="mt-4 max-w-[60ch] text-sm leading-6 text-muted lg:max-w-[55ch]">
          {live.intro}
        </p>

        <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-2">
          {live.items.map((item) => (
            <article key={item.title} className="bg-stage p-6 md:p-8">
              <h3 className="text-xl font-normal text-body">{item.title}</h3>
              <p className="mt-3 max-w-[48ch] text-sm leading-6 text-muted">
                {item.body}
              </p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {item.links.map((link) => {
                  const external = isExternalHref(link.href);

                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-sm font-medium text-brand transition-colors hover:text-brand-strong"
                    >
                      {link.label} <span aria-hidden="true">→</span>
                    </a>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
