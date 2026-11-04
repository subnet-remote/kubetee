import { dashboard } from "@/content/dashboard";
import {
  type DashboardSummary,
  formatDate,
  formatUsd,
  formatUsdAxis,
  formatUsdExact,
} from "@/lib/dashboard";
import { DailyValues } from "./DailyValues";

type Geometry = {
  width: number;
  height: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
  labelSize: number;
};

const DESKTOP: Geometry = {
  width: 880,
  height: 300,
  left: 56,
  right: 12,
  top: 24,
  bottom: 40,
  labelSize: 10,
};

const COMPACT: Geometry = {
  width: 360,
  height: 240,
  left: 40,
  right: 8,
  top: 20,
  bottom: 32,
  labelSize: 9,
};

const GRID = "rgba(255,255,255,0.1)";
const BASELINE_STROKE = "rgba(255,255,255,0.18)";
const AXIS = "#8A94A2";
const BODY = "#F2F4F7";

function niceCeil(value: number): number {
  if (!Number.isFinite(value) || value <= 0) return 1;

  const exponent = Math.floor(Math.log10(value));
  const base = 10 ** exponent;
  const fraction = value / base;
  const step = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10;

  return step * base;
}

function ChartSvg({
  summary,
  compact,
  idPrefix,
}: {
  summary: DashboardSummary;
  compact: boolean;
  idPrefix: string;
}) {
  const { window } = summary;
  const series = window.series;
  const geometry = compact ? COMPACT : DESKTOP;
  const plotWidth = geometry.width - geometry.left - geometry.right;
  const plotHeight = geometry.height - geometry.top - geometry.bottom;
  const baseline = geometry.top + plotHeight;

  const maxUsd = series.reduce((max, point) => Math.max(max, point.usd), 0);
  const yMax = niceCeil(maxUsd);
  const yTicks = [0, yMax / 2, yMax];
  const slot = plotWidth / series.length;
  const barWidth = Math.max(2, slot * 0.56);
  const peak = window.peak;
  const peakIndex = peak
    ? series.findIndex((point) => point.date === peak.date)
    : -1;
  const xTickIndexes = compact
    ? [0, series.length - 1]
    : [0, Math.floor((series.length - 1) / 2), series.length - 1];

  const description = [
    `Bar chart of daily swap value in USD for the 30 UTC days ending ${formatDate(window.end)}.`,
    `Total ${formatUsd(window.totalUsd)}.`,
    peak ? `Peak ${formatUsd(peak.usd)} on ${peak.label}.` : "",
    `Fills on ${window.activeDays} of ${window.days} days.`,
    summary.totals.usdMissing > 0
      ? "Some fills have no reported USD value."
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${geometry.width} ${geometry.height}`}
      role="img"
      aria-labelledby={`${idPrefix}-chart-title ${idPrefix}-chart-desc`}
      className="h-auto w-full"
    >
      <title id={`${idPrefix}-chart-title`}>
        {`Daily swap value, 30 UTC days ending ${formatDate(window.end)}`}
      </title>
      <desc id={`${idPrefix}-chart-desc`}>{description}</desc>

      {yTicks.map((tick) => {
        const y = baseline - (tick / yMax) * plotHeight;
        return (
          <g key={tick}>
            <line
              x1={geometry.left}
              y1={y}
              x2={geometry.width - geometry.right}
              y2={y}
              stroke={tick === 0 ? BASELINE_STROKE : GRID}
              strokeWidth="1"
            />
            <text
              x={geometry.left - 6}
              y={y + 3}
              fill={AXIS}
              fontFamily="var(--font-mono)"
              fontSize={geometry.labelSize}
              textAnchor="end"
            >
              {formatUsdAxis(tick)}
            </text>
          </g>
        );
      })}

      {series.map((point, index) => {
        const center = geometry.left + index * slot + slot / 2;
        const x = center - barWidth / 2;
        const height =
          point.usd > 0 ? Math.max(2, (point.usd / yMax) * plotHeight) : 0;
        const y = baseline - height;
        const latest = index === series.length - 1;
        const title = `${formatDate(`${point.date}T00:00:00Z`)} · ${
          point.fills > 0 ? formatUsd(point.usd) : "No fill"
        }${
          point.fills > 0
            ? ` · ${point.fills} fill${point.fills === 1 ? "" : "s"}`
            : ""
        }`;

        return (
          <g key={point.date}>
            {point.usd > 0 ? (
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={height}
                fill={latest ? "#6DAA65" : "#83BB7B"}
              >
                <title>{title}</title>
              </rect>
            ) : (
              <rect
                x={x}
                y={baseline - 1}
                width={barWidth}
                height="1"
                fill="rgba(255,255,255,0.12)"
              >
                <title>{title}</title>
              </rect>
            )}
          </g>
        );
      })}

      {peak && peakIndex >= 0
        ? (() => {
            const center = geometry.left + peakIndex * slot + slot / 2;
            const height = Math.max(2, (peak.usd / yMax) * plotHeight);
            const barTop = baseline - height;
            const labelY =
              barTop - 8 < geometry.top + 10 ? barTop + 14 : barTop - 8;
            const anchor =
              center < geometry.left + 40
                ? "start"
                : center > geometry.width - geometry.right - 40
                  ? "end"
                  : "middle";

            return (
              <text
                x={center}
                y={labelY}
                fill={BODY}
                fontFamily="var(--font-mono)"
                fontSize={geometry.labelSize}
                textAnchor={anchor}
              >
                {formatUsd(peak.usd)}
              </text>
            );
          })()
        : null}

      {xTickIndexes.map((index) => {
        const point = series[index];
        const center = geometry.left + index * slot + slot / 2;
        const anchor =
          index === 0
            ? "start"
            : index === series.length - 1
              ? "end"
              : "middle";
        return (
          <text
            key={point.date}
            x={center}
            y={baseline + 22}
            fill={AXIS}
            fontFamily="var(--font-mono)"
            fontSize={geometry.labelSize}
            textAnchor={anchor}
          >
            {point.label}
          </text>
        );
      })}
    </svg>
  );
}

export function SwapValueChart({ summary }: { summary: DashboardSummary }) {
  const { window } = summary;
  const series = window.series;
  const peak = window.peak;

  if (series.length === 0) {
    return (
      <div className="mt-6 border border-line p-6 text-sm text-muted">
        {dashboard.chart.empty}
      </div>
    );
  }

  return (
    <figure className="mt-6">
      <figcaption className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-b border-line pb-4 text-xs text-muted">
        <span>
          {dashboard.chart.totalLabel}{" "}
          <span
            title={formatUsdExact(window.totalUsd)}
            className="font-mono text-body tabular-nums"
          >
            {formatUsd(window.totalUsd)}
          </span>
        </span>
        {peak ? (
          <span>
            {dashboard.chart.peakLabel}{" "}
            <span className="font-mono text-body tabular-nums">
              {formatUsd(peak.usd)}
            </span>{" "}
            <span className="text-faint">· {peak.label}</span>
          </span>
        ) : null}
        <span>
          {dashboard.chart.activeLabel}{" "}
          <span className="font-mono text-body tabular-nums">
            {window.activeDays}
          </span>{" "}
          <span className="text-faint">of {window.days}</span>
        </span>
      </figcaption>

      <div className="mt-4 hidden md:block">
        <ChartSvg summary={summary} compact={false} idPrefix="desktop" />
      </div>
      <div className="mt-4 md:hidden">
        <ChartSvg summary={summary} compact idPrefix="mobile" />
      </div>

      <p className="mt-3 text-xs leading-5 text-faint">
        {dashboard.chart.zeroNote}
      </p>

      <DailyValues series={series} />
    </figure>
  );
}
