import type { ReactNode } from "react";

export function SectionLabel({
  children,
  number,
}: {
  children: ReactNode;
  number?: string;
}) {
  return (
    <p className="flex items-baseline gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted">
      {number ? (
        <>
          <span aria-hidden="true" className="tabular-nums text-faint">
            {number}
          </span>
          <span aria-hidden="true" className="text-faint">
            /
          </span>
        </>
      ) : null}
      <span>{children}</span>
    </p>
  );
}
