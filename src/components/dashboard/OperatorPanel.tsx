import { dashboard } from "@/content/dashboard";
import {
  type DashboardSummary,
  formatAlpha,
  formatDate,
  formatShare,
  shortKey,
} from "@/lib/dashboard";

export function OperatorPanel({ summary }: { summary: DashboardSummary }) {
  const { miner } = summary;

  return (
    <aside aria-labelledby="operator-title">
      <p className="label-mono text-faint">{dashboard.operator.label}</p>
      <h2 id="operator-title" className="mt-3 text-lg font-normal text-body">
        {dashboard.operator.title}
      </h2>

      {miner ? (
        <>
          <dl className="mt-5 border-t border-line text-sm">
            <div className="flex items-baseline justify-between gap-4 border-b border-line py-2.5">
              <dt className="text-muted">{dashboard.operator.uid}</dt>
              <dd className="font-mono tabular-nums text-body">{miner.uid}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-line py-2.5">
              <dt className="text-muted">{dashboard.operator.incentive}</dt>
              <dd className="font-mono tabular-nums text-body">
                {formatShare(miner.incentive)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-line py-2.5">
              <dt className="text-muted">{dashboard.operator.dailyMining}</dt>
              <dd className="font-mono tabular-nums text-body">
                {formatAlpha(miner.dailyMiningAlpha)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-line py-2.5">
              <dt className="text-muted">{dashboard.operator.alphaStake}</dt>
              <dd className="font-mono tabular-nums text-body">
                {formatAlpha(miner.alphaStake)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-line py-2.5">
              <dt className="text-muted">{dashboard.operator.hotkey}</dt>
              <dd>
                <a
                  href={miner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View miner ${miner.hotkey} on TaoStats in a new tab`}
                  className="font-mono text-xs text-brand underline decoration-brand/30 underline-offset-2 transition-colors hover:text-brand-strong"
                >
                  {shortKey(miner.hotkey, 8, 7)}
                  <span aria-hidden="true"> ↗</span>
                </a>
              </dd>
            </div>
          </dl>

          <p className="mt-5 max-w-[38ch] text-xs leading-5 text-faint">
            {dashboard.operator.note} SN28 had{" "}
            {summary.sn28Count.toLocaleString("en-US")} registered hotkeys on{" "}
            {formatDate(summary.generatedAt)}.
          </p>

          <a
            href={dashboard.links.subnet}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-8 items-center text-sm font-medium text-brand transition-colors hover:text-brand-strong"
          >
            {dashboard.operator.link} <span aria-hidden="true">→</span>
          </a>
        </>
      ) : (
        <p className="mt-5 text-sm leading-6 text-muted">
          {dashboard.operator.unavailable}
        </p>
      )}
    </aside>
  );
}
