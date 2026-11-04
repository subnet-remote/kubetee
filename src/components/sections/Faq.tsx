import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { faq } from "@/content/site";

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="border-b border-line py-20 md:py-28"
    >
      <Container>
        <SectionLabel number="06">{faq.kicker}</SectionLabel>
        <h2
          id="faq-title"
          className="mt-6 max-w-[16ch] text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.02] tracking-[-0.03em] text-body"
        >
          {faq.title}
        </h2>

        <div className="mt-12 max-w-6xl border-t border-line">
          {faq.items.map((item) => (
            <details key={item.question} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-normal text-body [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden="true"
                  className="text-xl text-brand transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-[70ch] pb-5 text-sm leading-6 text-muted">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
