export function SealedCube({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <svg
      viewBox="0 0 560 540"
      role="img"
      aria-labelledby="sealed-cube-title sealed-cube-desc"
      className="h-auto w-full"
    >
      <title id="sealed-cube-title">{title}</title>
      <desc id="sealed-cube-desc">{description}</desc>

      <defs>
        <pattern
          id="host-grid"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M24 0H0V24"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      {/* floor */}
      <ellipse cx="280" cy="500" rx="190" ry="24" fill="rgba(0,0,0,0.14)" />

      {/* host shell */}
      <g>
        <path
          d="M280 150L470 240L280 330L90 240Z"
          fill="#83BB7B"
          fillOpacity="0.18"
          stroke="rgba(131,187,123,0.5)"
          strokeWidth="1"
        />
        <path
          d="M90 240L280 330L280 480L90 390Z"
          fill="#151A1F"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
        />
        <path
          d="M280 330L470 240L470 390L280 480Z"
          fill="#1E1F21"
          fillOpacity="0.55"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
        />
        <path
          d="M280 150L470 240L280 330L90 240Z"
          fill="url(#host-grid)"
          stroke="none"
        />
        <path
          d="M90 240L280 330L280 480L90 390Z"
          fill="url(#host-grid)"
          stroke="none"
        />
        <path
          d="M280 330L470 240L470 390L280 480Z"
          fill="url(#host-grid)"
          stroke="none"
        />
        <path
          d="M280 480L470 390"
          fill="none"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </g>

      {/* host outline draw */}
      <g>
        <path
          data-cube="host"
          d="M280 150L470 240L470 390L280 480L90 390L90 240Z"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <path
          data-cube="host"
          d="M90 240L280 330L470 240"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <path
          data-cube="host"
          d="M280 330V480"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </g>

      {/* interior light */}
      <path
        d="M150 390L280 455L410 390L280 325Z"
        fill="#83BB7B"
        fillOpacity="0.08"
      />

      {/* confidential guest */}
      <g data-cube="guest">
        <path
          d="M280 270L345 305L280 340L215 305Z"
          fill="#83BB7B"
          stroke="#6DAA65"
          strokeWidth="1"
        />
        <path
          d="M215 305L280 340L280 400L215 365Z"
          fill="#6DAA65"
          stroke="#3E6B39"
          strokeWidth="1"
        />
        <path
          d="M280 340L345 305L345 365L280 400Z"
          fill="#3E6B39"
          stroke="#27282A"
          strokeWidth="1"
        />
      </g>

      {/* KBS key */}
      <g>
        <path
          d="M280 50L320 80L280 110L240 80Z"
          fill="#1E1F21"
          stroke="rgba(131,187,123,0.45)"
          strokeWidth="1"
        />
      </g>
      <g data-cube="key">
        <circle
          cx="272"
          cy="80"
          r="5"
          fill="none"
          stroke="#83BB7B"
          strokeWidth="1.2"
        />
        <path
          d="M277 80H292M287 80V86M292 80V88"
          fill="none"
          stroke="#83BB7B"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </g>

      {/* attestation tether */}
      <g>
        <path
          d="M280 110V270"
          fill="none"
          stroke="rgba(131,187,123,0.35)"
          strokeWidth="1"
          strokeDasharray="3 5"
        />
      </g>
      <path
        data-cube="tether"
        d="M280 270V110"
        fill="none"
        stroke="#83BB7B"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />

      {/* request and response */}
      <g>
        <path
          data-cube="request"
          d="M0 345H205"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M195 339L205 345L195 351"
          fill="none"
          stroke="rgba(131,187,123,0.7)"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
        <path
          data-cube="response"
          d="M355 345H560"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M550 339L560 345L550 351"
          fill="none"
          stroke="rgba(131,187,123,0.7)"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
      </g>

      {/* labels */}
      <g
        fontFamily="var(--font-mono)"
        fontSize="12"
        letterSpacing="0.12em"
        fill="rgba(255,255,255,0.55)"
      >
        <text data-cube="label" x="14" y="332">
          REQUEST
        </text>
        <text data-cube="label" x="470" y="332">
          RESPONSE
        </text>
        <text data-cube="label" x="106" y="428" fill="rgba(255,255,255,0.7)">
          HOST
        </text>
        <text
          data-cube="label"
          x="280"
          y="432"
          textAnchor="middle"
          fill="rgba(255,255,255,0.9)"
        >
          CONFIDENTIAL GUEST
        </text>
        <text
          data-cube="label"
          x="292"
          y="200"
          fontSize="10"
          fill="rgba(131,187,123,0.8)"
        >
          ATTESTATION
        </text>
      </g>
      <text
        data-cube="label"
        x="280"
        y="38"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="12"
        letterSpacing="0.12em"
        fill="rgba(255,255,255,0.8)"
      >
        KBS
      </text>
    </svg>
  );
}
