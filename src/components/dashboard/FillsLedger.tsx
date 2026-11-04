import { dashboard } from "@/content/dashboard";
import {
  type Fill,
  formatAlpha,
  formatDate,
  formatDateRange,
  formatTao,
  formatUsd,
  formatUsdExact,
} from "@/lib/dashboard";
import { AlphaText } from "./AlphaText";

function ExtrinsicLink({ fill }: { fill: Fill }) {
  return (
    <a
      href={fill.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open extrinsic ${fill.extrinsic} on tao.app in a new tab`}
      className="font-mono text-xs text-brand underline decoration-brand/30 underline-offset-2 transition-colors hover:text-brand-strong"
    >
      {fill.extrinsic}
      <span aria-hidden="true"> ↗</span>
    </a>
  );
}

function UsdValue({ value }: { value: number | null }) {
  if (value == null) {
    return (
      <>
        <span aria-hidden="true">—</span>
        <span className="sr-only">Not reported</span>
      </>
    );
  }

  return <span title={formatUsdExact(value)}>{formatUsd(value)}</span>;
}

function MobileFill({ fill }: { fill: Fill }) {
  return (
    <li className="border-b border-line py-3">
      <div className="flex items-baseline justify-between gap-4">
        <time dateTime={fill.ts} className="text-sm text-muted">
          {formatDate(fill.ts)}
        </time>
        <span className="font-mono text-sm tabular-nums text-body">
          <UsdValue value={fill.usdValue} />
        </span>
      </div>
      <p className="mt-1 font-mono text-[11px] tabular-nums text-muted">
        {formatAlpha(fill.sn28Alpha)} SN28 α → {formatAlpha(fill.sn90Alpha)}{" "}
        SN90 α · {formatTao(fill.taoValue)} TAO
      </p>
      <div className="mt-1">
        <ExtrinsicLink fill={fill} />
      </div>
    </li>
  );
}

export function FillsLedger({ fills }: { fills: Fill[] }) {
  if (fills.length === 0) {
    return (
      <div className="mt-8 border border-line p-6 text-sm text-muted">
        {dashboard.table.empty}
      </div>
    );
  }

  const range = formatDateRange(fills[fills.length - 1]?.ts, fills[0]?.ts);
  const recent = fills.slice(0, 10);
  const older = fills.slice(10);

  return (
    <>
      <div className="mt-8 hidden border border-line md:block">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line px-4 py-3">
          <p className="label-mono text-faint">
            All {fills.length} fills · {range}
          </p>
          <p className="label-mono text-faint">USD = market estimate</p>
        </div>

        <table className="w-full border-separate border-spacing-0 text-[13px]">
          <caption className="sr-only">
            All {fills.length} SN28 to SN90 recycle fills, newest first, with
            dates in UTC.
          </caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="sticky top-[72px] z-10 border-b border-line bg-stage-deep px-4 py-3 text-left label-mono text-faint"
              >
                {dashboard.table.date}
              </th>
              <th
                scope="col"
                className="sticky top-[72px] z-10 border-b border-line bg-stage-deep px-4 py-3 text-right label-mono text-faint"
              >
                <AlphaText text={dashboard.table.sn28} />
              </th>
              <th
                scope="col"
                className="sticky top-[72px] z-10 border-b border-line bg-stage-deep px-4 py-3 text-right label-mono text-faint"
              >
                <AlphaText text={dashboard.table.sn90} />
              </th>
              <th
                scope="col"
                className="sticky top-[72px] z-10 border-b border-line bg-stage-deep px-4 py-3 text-right label-mono text-faint"
              >
                {dashboard.table.tao}
              </th>
              <th
                scope="col"
                className="sticky top-[72px] z-10 border-b border-line bg-stage-deep px-4 py-3 text-right label-mono text-faint"
              >
                {dashboard.table.usd}
              </th>
              <th
                scope="col"
                className="sticky top-[72px] z-10 border-b border-line bg-stage-deep px-4 py-3 text-left label-mono text-faint"
              >
                {dashboard.table.extrinsic}
              </th>
            </tr>
          </thead>
          <tbody>
            {fills.map((fill) => (
              <tr
                key={fill.extrinsic}
                className="transition-colors hover:bg-white/[0.02]"
              >
                <td className="border-b border-line px-4 py-2.5 text-muted">
                  <time dateTime={fill.ts}>{formatDate(fill.ts)}</time>
                </td>
                <td className="border-b border-line px-4 py-2.5 text-right font-mono tabular-nums text-muted">
                  {formatAlpha(fill.sn28Alpha)}
                </td>
                <td className="border-b border-line px-4 py-2.5 text-right font-mono tabular-nums text-body">
                  {formatAlpha(fill.sn90Alpha)}
                </td>
                <td className="border-b border-line px-4 py-2.5 text-right font-mono tabular-nums text-muted">
                  {formatTao(fill.taoValue)}
                </td>
                <td className="border-b border-line px-4 py-2.5 text-right font-mono tabular-nums text-body">
                  <UsdValue value={fill.usdValue} />
                </td>
                <td className="border-b border-line px-4 py-2.5">
                  <ExtrinsicLink fill={fill} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 md:hidden">
        <ul className="border-t border-line">
          {recent.map((fill) => (
            <MobileFill key={fill.extrinsic} fill={fill} />
          ))}
        </ul>

        {older.length > 0 ? (
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 border-b border-line py-4 label-mono text-faint [&::-webkit-details-marker]:hidden">
              <span>
                Show {older.length} {dashboard.table.mobileOlder}
              </span>
              <span
                aria-hidden="true"
                className="text-base leading-none text-brand transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <ul>
              {older.map((fill) => (
                <MobileFill key={fill.extrinsic} fill={fill} />
              ))}
            </ul>
          </details>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-line pt-4 text-xs leading-5 text-faint md:flex-row md:items-start md:justify-between">
        <p className="max-w-[80ch]">
          {dashboard.table.note}{" "}
          <a
            href={dashboard.links.recycler}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted underline decoration-line underline-offset-2 transition-colors hover:text-body"
          >
            {dashboard.table.recyclerLink} <span aria-hidden="true">→</span>
          </a>
        </p>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em]">
          <span>{fills.length} fills · newest first · dates UTC</span>
          <a
            href={dashboard.links.rawJson}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted underline decoration-line underline-offset-2 transition-colors hover:text-body"
          >
            {dashboard.table.rawJson} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </>
  );
}
