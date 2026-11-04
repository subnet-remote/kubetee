type Variant = "rest" | "transit" | "use";

const copy: Record<Variant, { title: string; description: string }> = {
  rest: {
    title: "Encrypted storage at rest",
    description:
      "A closed cube with layered encrypted storage and a green sealed top.",
  },
  transit: {
    title: "Encrypted transport in transit",
    description:
      "Two cubes connected by a protected link, with a packet moving inside the confidential guest.",
  },
  use: {
    title: "Hardware-isolated execution in use",
    description:
      "A smaller green confidential guest sealed inside a dark host cube.",
  },
};

function IsoCube({
  cx,
  top,
  size,
  topFill = "#83BB7B",
  topOpacity = 0.22,
  leftFill = "#151A1F",
  rightFill = "#27282A",
}: {
  cx: number;
  top: number;
  size: number;
  topFill?: string;
  topOpacity?: number;
  leftFill?: string;
  rightFill?: string;
}) {
  const right = cx + size;
  const bottom = top + size;
  const leftX = cx - size;
  const sideTop = top + size * 0.5;
  const sideBottom = top + size * 1.4;
  const centerBottom = top + size * 1.9;

  return (
    <g>
      <path
        d={`M${cx} ${top}L${right} ${sideTop}L${cx} ${bottom}L${leftX} ${sideTop}Z`}
        fill={topFill}
        fillOpacity={topOpacity}
        stroke="rgba(131,187,123,0.5)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={`M${leftX} ${sideTop}L${cx} ${bottom}L${cx} ${centerBottom}L${leftX} ${sideBottom}Z`}
        fill={leftFill}
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={`M${cx} ${bottom}L${right} ${sideTop}L${right} ${sideBottom}L${cx} ${centerBottom}Z`}
        fill={rightFill}
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </g>
  );
}

function RestScene() {
  return (
    <g>
      <IsoCube cx={180} top={55} size={82} />
      <g stroke="#83BB7B" strokeWidth="5" strokeLinecap="square" opacity="0.75">
        <path d="M120 145L160 165" />
        <path d="M120 160L160 180" />
        <path d="M120 175L160 195" />
      </g>
    </g>
  );
}

function TransitScene() {
  return (
    <g>
      <path
        d="M120 140H240"
        fill="none"
        stroke="rgba(131,187,123,0.45)"
        strokeWidth="1.5"
        strokeDasharray="5 4"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M120 140H240"
        fill="none"
        stroke="#83BB7B"
        strokeWidth="1.5"
        strokeDasharray="40 80"
        strokeDashoffset="-25"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx="180" cy="140" r="4" fill="#83BB7B" />
      <IsoCube cx={84} top={110} size={42} />
      <IsoCube cx={276} top={110} size={42} />
    </g>
  );
}

function UseScene() {
  return (
    <g>
      <IsoCube cx={180} top={40} size={86} />
      <IsoCube
        cx={180}
        top={126}
        size={38}
        topFill="#83BB7B"
        topOpacity={1}
        leftFill="#6DAA65"
        rightFill="#3E6B39"
      />
    </g>
  );
}

export function ProtectionAsset({ variant }: { variant: Variant }) {
  const id = `protection-${variant}`;

  return (
    <svg
      viewBox="0 0 360 300"
      role="img"
      aria-labelledby={`${id}-title ${id}-desc`}
      className="h-auto w-full"
    >
      <title id={`${id}-title`}>{copy[variant].title}</title>
      <desc id={`${id}-desc`}>{copy[variant].description}</desc>
      <ellipse cx="180" cy="266" rx="118" ry="14" fill="rgba(0,0,0,0.16)" />
      {variant === "rest" && <RestScene />}
      {variant === "transit" && <TransitScene />}
      {variant === "use" && <UseScene />}
    </svg>
  );
}
