import { feature, issue } from "../content";
import { SECTIONS } from "./sections";
import { Folio, Kicker, wrap } from "./ui";

const { id, page } = SECTIONS.feature;

const QUOTE_AFTER = 2;

export function Feature() {
  const { paragraphs } = feature;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`${wrap} scroll-mt-6 pt-28 lg:pt-40`}
    >
      <Folio section={feature.title} page={page} />

      <div className="reveal grid gap-x-12 pt-12 lg:grid-cols-12 lg:pt-20">
        <div className="lg:col-span-10">
          <Kicker>
            {feature.kicker} — {feature.title}
          </Kicker>
          <h2
            id={`${id}-title`}
            className="mt-6 font-display text-[2.6rem] leading-[1.05] text-balance sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
          >
            {feature.headline}
          </h2>
        </div>
        <p className="mt-8 font-serif text-2xl leading-snug text-ink-soft italic text-pretty lg:col-span-7 lg:text-[1.75rem]">
          {feature.deck}
        </p>
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft lg:col-span-12">
          Viết bởi <span className="text-burgundy">{issue.yourName}</span> ·{" "}
          {issue.city}, {issue.date}
        </p>
      </div>

      <div className="mt-10 grid border-t border-ink/20 pt-10 font-serif text-[1.3rem] leading-[1.7] text-ink lg:mt-14 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-6 lg:pt-14">
        {paragraphs.map((text, i) => (
          <Paragraph
            key={i}
            text={text}
            first={i === 0}
            last={i === paragraphs.length - 1}
            quoteRows={i === QUOTE_AFTER - 1 ? paragraphs.length : 0}
          />
        ))}
      </div>
    </section>
  );
}

function Paragraph({
  text,
  first,
  last,
  quoteRows,
}: {
  text: string;
  first: boolean;
  last: boolean;
  quoteRows: number;
}) {
  return (
    <>
      <p
        className={`mb-6 text-pretty lg:col-span-7 lg:col-start-1 lg:mb-0 ${first ? "drop-cap" : ""}`}
      >
        {text}
        {last && (
          <span
            aria-hidden
            className="ml-2 inline-block size-2.5 bg-burgundy align-baseline"
          />
        )}
      </p>
      {quoteRows > 0 && <PullQuote rows={quoteRows} />}
    </>
  );
}

function PullQuote({ rows }: { rows: number }) {
  return (
    <aside
      aria-hidden
      style={{ "--rows": rows } as React.CSSProperties}
      className="my-8 border-y border-ink/15 py-10 lg:col-span-5 lg:col-start-8 lg:[grid-row:1/span_var(--rows)] lg:my-0 lg:border-y-0 lg:border-l lg:py-0 lg:pl-12"
    >
      <figure className="lg:sticky lg:top-16">
        <span className="block h-16 font-display text-[9rem] leading-none text-burgundy/25 sm:h-20 lg:text-[11rem]">
          “
        </span>
        <blockquote className="font-serif text-4xl leading-[1.12] font-medium text-burgundy italic text-balance sm:text-5xl xl:text-6xl">
          {feature.pullQuote}
        </blockquote>
        <figcaption className="mt-8 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
          <span className="h-px w-10 bg-burgundy" />
          {feature.pullQuoteNote}
        </figcaption>
      </figure>
    </aside>
  );
}
