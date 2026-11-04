import { ArchitectureMotion } from "@/components/motion/ArchitectureMotion";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { howItWorks } from "@/content/site";

const boxes = [
  {
    x: 10,
    title: "GPU cluster",
    line1: "RKE2 · Fleet",
    line2: "GPU Operator",
  },
  {
    x: 255,
    title: "Confidential guest",
    line1: "Kata 4.2.0 + CoCo",
    line2: "TDX / SEV-SNP",
  },
  {
    x: 500,
    title: "Remote attestation",
    line1: "CoCo Trustee / KBS",
    line2: "nonce-bound quote",
  },
  {
    x: 745,
    title: "Gateway",
    line1: "LiteLLM",
    line2: "OpenAI-compatible",
  },
  {
    x: 990,
    title: "Your workload",
    line1: "inference",
    line2: "standard API",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      aria-labelledby="how-title"
      className="border-b border-line py-20 md:py-28"
    >
      <Container>
        <SectionLabel number="03">{howItWorks.kicker}</SectionLabel>
        <h2
          id="how-title"
          className="mt-6 w-full text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.02] tracking-[-0.03em] text-body lg:w-1/2"
        >
          {howItWorks.title}
        </h2>
        <p className="mt-4 max-w-[60ch] text-sm leading-6 text-muted lg:max-w-[55ch]">
          {howItWorks.intro}
        </p>

        <div className="mt-12 hidden border border-line bg-stage-deep p-4 md:block md:p-6">
          <ArchitectureMotion>
            <svg
              viewBox="0 0 1200 230"
              role="img"
              aria-labelledby="pipeline-title pipeline-desc"
              className="h-auto w-full"
            >
              <title id="pipeline-title">
                KubeTEE confidential inference path
              </title>
              <desc id="pipeline-desc">
                A GPU cluster running RKE2 and Rancher Fleet feeds a Kata and
                Confidential Containers guest on Intel TDX or AMD SEV-SNP.
                Remote attestation through CoCo Trustee and KBS releases secrets
                only to the attested guest. The LiteLLM gateway serves your
                workload through an OpenAI-compatible API.
              </desc>

              <defs>
                <marker
                  id="pipeline-arrow"
                  viewBox="0 0 8 8"
                  refX="7"
                  refY="4"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M0 0L8 4L0 8Z" fill="#83BB7B" />
                </marker>
              </defs>

              <text
                x="10"
                y="30"
                fill="#83BB7B"
                fontFamily="var(--font-mono)"
                fontSize="10"
                letterSpacing="0.14em"
              >
                LIVE CONFIDENTIAL PATH
              </text>

              {boxes.map((box, index) => (
                <g key={box.title} data-node>
                  <rect
                    x={box.x}
                    y="60"
                    width="200"
                    height="130"
                    fill="#151A1F"
                    stroke="rgba(255,255,255,0.14)"
                  />
                  <circle cx={box.x + 16} cy="84" r="4" fill="#83BB7B" />
                  <text
                    x={box.x + 28}
                    y="89"
                    fill="#F2F4F7"
                    fontFamily="var(--font-sans)"
                    fontSize="16"
                    fontWeight="500"
                  >
                    {box.title}
                  </text>
                  <text
                    x={box.x + 16}
                    y="124"
                    fill="#9AA4B2"
                    fontFamily="var(--font-mono)"
                    fontSize="11"
                  >
                    {box.line1}
                  </text>
                  <text
                    x={box.x + 16}
                    y="142"
                    fill="#9AA4B2"
                    fontFamily="var(--font-mono)"
                    fontSize="11"
                  >
                    {box.line2}
                  </text>
                  {index < boxes.length - 1 && (
                    <path
                      data-draw
                      d={`M${box.x + 210} 125H${box.x + 245}`}
                      fill="none"
                      stroke="#83BB7B"
                      strokeWidth="1.5"
                      markerEnd="url(#pipeline-arrow)"
                      vectorEffect="non-scaling-stroke"
                    />
                  )}
                </g>
              ))}
            </svg>
          </ArchitectureMotion>
        </div>

        <ol className="mt-10 border-t border-line md:hidden">
          {howItWorks.stages.map((stage, index) => (
            <li key={stage.title} className="border-b border-line py-5">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium tabular-nums text-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg text-body">{stage.title}</h3>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted">{stage.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-center md:justify-end">
          <a
            href={howItWorks.attestation.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-brand transition-colors hover:text-brand-strong"
          >
            {howItWorks.attestation.linkLabel} <span aria-hidden="true">→</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
