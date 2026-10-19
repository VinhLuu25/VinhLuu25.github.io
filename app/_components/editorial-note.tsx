import { colophon, editorialNote, issue } from "../content";
import { SECTIONS } from "./sections";
import { Folio, Kicker, wrap } from "./ui";

const { id, page } = SECTIONS.note;

export function EditorialNote() {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="bg-burgundy text-paper"
    >
      <div className={`${wrap} pt-10 pb-24 lg:pb-36`}>
        <Folio
          section={editorialNote.title}
          page={page}
          className="border-paper/20 text-paper/70"
        />

        <div className="grid gap-x-12 gap-y-14 pt-14 lg:grid-cols-12 lg:pt-24">
          <div className="reveal lg:col-span-4">
            <Kicker className="text-blush">{editorialNote.kicker}</Kicker>
            <h2
              id={`${id}-title`}
              className="mt-6 font-display text-6xl leading-[0.95] italic sm:text-7xl xl:text-8xl"
            >
              {editorialNote.title}
            </h2>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/70">
              Từ bàn biên tập · {issue.date}
            </p>
          </div>

          <div className="reveal lg:col-span-7 lg:col-start-6">
            <article className="relative bg-paper px-6 py-12 text-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] sm:-rotate-1 sm:px-12 sm:py-16 lg:px-16">
              <span
                aria-hidden
                className="absolute -top-3 left-8 h-7 w-24 -rotate-6 bg-blush/80"
              />
              <span
                aria-hidden
                className="absolute -top-3 right-8 h-7 w-24 rotate-3 bg-blush/80"
              />

              <div className="space-y-5 font-serif text-xl leading-relaxed text-ink sm:text-[1.35rem]">
                {editorialNote.body.map((text, i) => (
                  <p key={i} className="text-pretty">
                    {text}
                  </p>
                ))}
              </div>

              <p className="mt-10 -rotate-1 font-hand text-[1.7rem] leading-snug text-burgundy sm:text-3xl">
                {editorialNote.ps}
              </p>

              <div className="mt-12 flex flex-col items-end text-burgundy">
                <p className="font-hand text-3xl">{editorialNote.signOff}</p>
                <p className="mt-1 -rotate-3 font-hand text-6xl sm:text-7xl">
                  {editorialNote.signature}
                </p>
                <svg
                  viewBox="0 0 300 30"
                  aria-hidden
                  className="-mt-1 h-6 w-56 sm:w-72"
                >
                  <path
                    d="M4 22 C 60 6, 120 30, 180 15 S 268 6, 296 16"
                    pathLength={1}
                    className="draw fill-none stroke-current"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Colophon() {
  return (
    <footer className="bg-burgundy-deep text-paper">
      <div className={`${wrap} pt-16 pb-10`}>
        <dl className="grid gap-8 border-t border-paper/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {colophon.map((row) => (
            <div key={row.label}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60">
                {row.label}
              </dt>
              <dd className="mt-2 font-serif text-xl">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-20 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p
            aria-hidden
            className="font-display text-[34vw] leading-[0.75] tracking-[-0.045em] text-paper/10 sm:text-[20vw] lg:text-[13rem]"
          >
            {issue.masthead}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60 sm:pb-3 sm:text-right">
            © {issue.date.slice(-4)} {issue.masthead}
            <br />
            Mọi quyền thuộc về em.
          </p>
        </div>
      </div>
    </footer>
  );
}
