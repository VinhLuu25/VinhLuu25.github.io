"use client";

import { useEffect, useRef, useState } from "react";
import { issue, roles } from "../content";
import { SECTIONS } from "./sections";
import { Folio, Kicker, wrap } from "./ui";

const { id, page } = SECTIONS.roles;
const { items } = roles;

const pad = (n: number) => String(n).padStart(2, "0");

export function Roles() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const item = items[active];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function choose(i: number) {
    setActive(i);
    setAuto(false);
  }

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="mt-28 bg-forest text-paper lg:mt-40"
    >
      <div ref={ref} className={`${wrap} pt-10 pb-24 lg:pb-32`}>
        <Folio
          section={SECTIONS.roles.title}
          page={page}
          className="border-paper/20 text-paper/70"
        />

        <div className="pt-16 lg:pt-24">
          <Kicker className="text-blush">
            {roles.kicker} — {issue.date}
          </Kicker>
          <p className="mt-5 max-w-xl font-serif text-xl leading-relaxed text-paper/75 italic">
            {roles.intro}
          </p>

          <h2
            id={`${id}-title`}
            className="mt-12 font-display text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[6.5rem]"
          >
            <span className="block">{roles.heading}</span>
            <span
              key={active}
              className="fade-in block min-h-[3.2em] text-blush italic text-balance sm:min-h-[2.2em]"
            >
              {item.phrase}
            </span>
          </h2>
          <p
            key={`note-${active}`}
            className="fade-in max-w-2xl font-serif text-2xl leading-snug text-paper/85 [animation-delay:120ms]"
          >
            {item.note}
          </p>

          <div className="mt-14 grid grid-cols-5 gap-2 sm:gap-4">
            {items.map((it, i) => {
              const current = i === active;
              return (
                <button
                  key={it.tab}
                  type="button"
                  onClick={() => choose(i)}
                  aria-current={current}
                  aria-label={it.tab}
                  className="group py-2 text-left"
                >
                  <span className="relative block h-[2px] overflow-hidden bg-paper/20">
                    {current && auto ? (
                      <span
                        key={active}
                        onAnimationEnd={() => setActive((active + 1) % items.length)}
                        className={`role-progress absolute inset-y-0 left-0 bg-blush ${inView ? "" : "[animation-play-state:paused]"}`}
                      />
                    ) : (
                      <span
                        className={`absolute inset-y-0 left-0 bg-blush transition-[width] duration-500 ${i <= active ? "w-full" : "w-0"}`}
                      />
                    )}
                  </span>
                  <span
                    className={`mt-3 block font-mono text-[10px] uppercase tracking-[0.2em] transition-colors sm:text-[11px] ${current ? "text-paper" : "text-paper/55 group-hover:text-paper/80"}`}
                  >
                    {pad(i + 1)}
                    <span className="hidden sm:inline"> · {it.tab}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
