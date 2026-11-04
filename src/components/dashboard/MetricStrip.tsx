import { dashboard } from "@/content/dashboard";
import {
  type DashboardSummary,
  formatAlpha,
  formatDateRange,
  formatDelta,
  formatUsd,
  formatUsdExact,
} from "@/lib/dashboard";
import { AlphaText } from "./AlphaText";

export function MetricStrip({ summary }: { summary: DashboardSummary }) {
  const { totals, window, deltaPct } = summary;
  const range = formatDateRange(summary.oldestFill?.ts, summary.latestFill?.ts);

  return (
    <div className="mt-10 grid gap-px border-y border-line bg-line md:grid-cols-12">
      <div className="bg-stage p-5 md:col-span-5 md:p-6">
        <p className="label-mono text-faint">
          <AlphaText text={dashboard.metrics.primaryLabel} />
        </p>
        <p
          title={formatUsdExact(totals.usdValue)}
          className="mt-3 font-mono text-[clamp(2.25rem,3.2vw,2.75rem)] leading-none tracking-[-0.03em] text-body tabular-nums"
        >
          {formatUsd(totals.usdValue)}
        </p>
        <p className="mt-3 text-xs leading-5 text-muted">
          {totals.count} fills · {range}
        </p>
        {totals.usdMissing > 0 ? (
          <p className="mt-2 text-xs leading-5 text-warning">
            {totals.usdMissing} fill{totals.usdMissing === 1 ? "" : "s"} without
            a reported USD value; totals exclude them.
          </p>
        ) : null}
      </div>

      <div className="grid gap-px bg-line md:col-span-7 md:grid-cols-3">
        <div className="bg-stage p-5 md:p-6">
          <p className="label-mono text-faint">
            <AlphaText text={dashboard.metrics.sn90Label} />
          </p>
          <p className="mt-3 font-mono text-[1.75rem] leading-none text-body tabular-nums">
            {formatAlpha(totals.sn90Alpha)}
          </p>
          <p className="mt-3 text-xs leading-5 text-muted">
            from {formatAlpha(totals.sn28Alpha)} SN28 α
          </p>
        </div>

        <div className="bg-stage p-5 md:p-6">
          <p className="label-mono text-faint">
            {dashboard.metrics.windowLabel}
          </p>
          <p
            title={formatUsdExact(window.totalUsd)}
            className="mt-3 font-mono text-[1.75rem] leading-none text-body tabular-nums"
          >
            {formatUsd(window.totalUsd)}
          </p>
          <p className="mt-3 text-xs leading-5 text-muted">
            {formatDelta(deltaPct)} {dashboard.metrics.priorLabel}
          </p>
        </div>

        <div className="bg-stage p-5 md:p-6">
          <p className="label-mono text-faint">
            {dashboard.metrics.fillsLabel}
          </p>
          <p className="mt-3 font-mono text-[1.75rem] leading-none text-body tabular-nums">
            {totals.count}
          </p>
          <p className="mt-3 text-xs leading-5 text-muted">
            {summary.activeDays} {dashboard.metrics.activeLabel} across{" "}
            {summary.spanDays} · {window.activeDays} of last {window.days}
          </p>
        </div>
      </div>
    </div>
  );
}
