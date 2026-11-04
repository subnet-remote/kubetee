import { dashboard } from "@/content/dashboard";
import { type DailyPoint, formatUsd, formatUsdExact } from "@/lib/dashboard";

export function DailyValues({ series }: { series: DailyPoint[] }) {
  return (
    <details className="group mt-4 border-t border-line pt-3">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-1 text-xs text-faint transition-colors hover:text-body [&::-webkit-details-marker]:hidden">
        <span className="label-mono">
          {dashboard.chart.detailsLabel} ({series.length})
        </span>
        <span
          aria-hidden="true"
          className="text-base leading-none text-brand transition-transform group-open:rotate-45"
        >
          +
        </span>
      </summary>

      <table className="mt-3 w-full border-separate border-spacing-0 text-xs">
        <caption className="sr-only">{dashboard.chart.detailsCaption}</caption>
        <thead>
          <tr>
            <th
              scope="col"
              className="border-b border-line py-2 text-left font-normal label-mono text-faint"
            >
              Date (UTC)
            </th>
            <th
              scope="col"
              className="border-b border-line py-2 text-right font-normal label-mono text-faint"
            >
              Fills
            </th>
            <th
              scope="col"
              className="border-b border-line py-2 text-right font-normal label-mono text-faint"
            >
              USD est.
            </th>
          </tr>
        </thead>
        <tbody>
          {series.map((point) => (
            <tr key={point.date}>
              <td className="border-b border-line py-1.5 text-muted">
                <time dateTime={point.date}>{point.label}</time>
              </td>
              <td className="border-b border-line py-1.5 text-right font-mono tabular-nums text-muted">
                {point.fills}
              </td>
              <td
                title={formatUsdExact(point.usd)}
                className="border-b border-line py-1.5 text-right font-mono tabular-nums text-body"
              >
                {formatUsd(point.usd)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
}
