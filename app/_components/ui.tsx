import { issue } from "../content";

export const wrap = "mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12";

export function Folio({
  section,
  page,
  className = "border-ink/20 text-ink-soft",
}: {
  section: string;
  page: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-4 border-b pb-3 font-mono text-[11px] uppercase tracking-[0.2em] ${className}`}
    >
      <span>
        {issue.masthead} <span className="hidden sm:inline">— The October Issue</span>
      </span>
      <span className="hidden md:inline">{section}</span>
      <span>Tr. {page}</span>
    </div>
  );
}

export function Kicker({
  children,
  className = "text-burgundy",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-sans text-[11px] font-semibold uppercase tracking-[0.32em] ${className}`}
    >
      {children}
    </p>
  );
}
