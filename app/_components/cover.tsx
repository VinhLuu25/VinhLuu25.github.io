import { cover, issue } from "../content";
import { Photo } from "./photo";
import { SECTIONS } from "./sections";
import { Kicker, wrap } from "./ui";

const contents = Object.values(SECTIONS);

export function Cover() {
  return (
    <header className={`${wrap} pt-4 lg:pt-6`}>
      <div className="flex items-center justify-between gap-4 border-b border-ink/20 pb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
        <span>{issue.volume} · Số đặc biệt</span>
        <span className="hidden md:inline">
          Ngày Phụ nữ Việt Nam · {issue.city}
        </span>
        <span>Giá: {issue.price}</span>
      </div>

      <div className="flex items-end justify-between gap-8">
        <h1 className="font-display text-[33vw] leading-[0.8] font-medium tracking-[-0.045em] text-burgundy lg:text-[min(17vw,30svh)]">
          <span className="sr-only">
            {issue.masthead} — {cover.kicker}
          </span>
          {[...issue.masthead].map((letter, i) => (
            <span
              key={i}
              aria-hidden
              className="rise inline-block pt-[0.08em]"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              {letter}
            </span>
          ))}
        </h1>
        <div className="rise hidden pb-[1.4vw] text-right [animation-delay:400ms] lg:block">
          <p className="font-display text-4xl italic xl:text-5xl">
            {cover.kicker}
          </p>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
            {issue.dateLong} · {issue.city}
          </p>
        </div>
      </div>

      <div className="mt-3 grid gap-x-12 gap-y-14 border-t border-ink/20 pt-6 lg:mt-4 lg:grid-cols-12 lg:pt-8">
        <div className="relative lg:col-span-8">
          <div className="unveil relative aspect-[3/4] overflow-hidden sm:aspect-[4/5] lg:aspect-auto lg:h-[min(80svh,880px)] lg:min-h-[560px]">
            <Photo
              photo={cover.photo}
              sizes="(min-width: 1024px) 66vw, 100vw"
              label="Ảnh bìa · chân dung đẹp nhất"
              hint="cover.jpg"
              eager
            />
          </div>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft lg:absolute lg:bottom-0 lg:-left-7 lg:mt-0 lg:rotate-180 lg:[writing-mode:vertical-rl]">
            {cover.photoCredit}
          </p>
          <div className="absolute -bottom-8 right-3 z-10 sm:right-6 lg:-right-14 lg:bottom-10">
            <Stamp />
          </div>
        </div>

        <div className="flex flex-col lg:col-span-4">
          <Kicker className="text-burgundy lg:hidden">{cover.kicker}</Kicker>
          <p className="mt-6 font-serif text-2xl italic text-ink-soft lg:mt-0">
            Dành tặng
          </p>
          <p className="mt-1 font-display text-5xl leading-[1.02] text-balance sm:text-6xl">
            {issue.herName}
          </p>
          <p className="mt-6 max-w-sm font-serif text-xl leading-relaxed text-ink-soft">
            {cover.summary}
          </p>

          <nav aria-label="Mục lục" className="mt-10">
            <p className="border-b border-ink/20 pb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
              Trong số này
            </p>
            <ol>
              {contents.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="group flex items-baseline gap-4 border-b border-ink/10 py-2.5"
                  >
                    <span className="font-mono text-xs text-burgundy">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-xl transition-colors group-hover:text-burgundy group-hover:italic">
                      {item.title}
                    </span>
                    <span className="ml-auto font-mono text-[11px] text-ink-soft">
                      tr. {item.page}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-10 lg:mt-auto lg:pt-10">
            <Barcode />
          </div>
        </div>
      </div>
    </header>
  );
}

function Stamp() {
  return (
    <div className="relative size-28 sm:size-36">
      <svg
        viewBox="0 0 200 200"
        aria-hidden
        className="spin-slow absolute inset-0 size-full"
      >
        <defs>
          <path
            id="stamp-ring"
            d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0"
          />
        </defs>
        <circle cx="100" cy="100" r="99" className="fill-burgundy" />
        <circle
          cx="100"
          cy="100"
          r="92"
          className="fill-none stroke-paper/30"
          strokeWidth="1"
        />
        <text className="fill-paper font-sans text-[15px] font-semibold">
          <textPath href="#stamp-ring" textLength="472">
            NGÀY PHỤ NỮ VIỆT NAM · 20 THÁNG 10 ·
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-3xl italic text-paper sm:text-4xl">
          20/10
        </span>
      </div>
    </div>
  );
}

const BARS = [
  3, 1, 1, 2, 2, 1, 1, 3, 1, 1, 2, 2, 3, 1, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2, 1,
  1, 2, 3, 1, 1, 2, 2, 1, 1, 3, 1, 1, 2,
];
const BAR_OFFSETS = BARS.map((_, i) =>
  BARS.slice(0, i).reduce((sum, w) => sum + w, 0),
);
const BARCODE_WIDTH = BARS.reduce((sum, w) => sum + w, 0);

function Barcode() {
  return (
    <div className="inline-flex flex-col items-start gap-1.5">
      <svg
        viewBox={`0 0 ${BARCODE_WIDTH} 40`}
        preserveAspectRatio="none"
        aria-hidden
        className="h-12 w-40 fill-ink"
      >
        {BARS.map((w, i) =>
          i % 2 === 0 ? (
            <rect key={i} x={BAR_OFFSETS[i]} width={w} height="40" />
          ) : null,
        )}
      </svg>
      <span className="font-mono text-[10px] tracking-[0.3em] text-ink-soft">
        {issue.date.replaceAll(".", " ")} · {issue.volume.toUpperCase()}
      </span>
    </div>
  );
}
