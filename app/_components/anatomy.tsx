"use client";

import { useState } from "react";
import { anatomy } from "../content";
import { Photo } from "./photo";
import { SECTIONS } from "./sections";
import { Folio, Kicker, wrap } from "./ui";

const { id, page } = SECTIONS.anatomy;
const { details } = anatomy;

const pad = (n: number) => String(n).padStart(2, "0");

export function Anatomy() {
  const [active, setActive] = useState(0);
  const current = details[active];
  const step = (by: number) =>
    setActive((active + by + details.length) % details.length);

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="mt-28 bg-paper-deep lg:mt-40"
    >
      <div className={`${wrap} pt-10 pb-24 lg:pb-32`}>
        <Folio section={SECTIONS.anatomy.title} page={page} />

        <div className="grid items-start gap-x-12 gap-y-10 pt-14 lg:grid-cols-12 lg:pt-20">
          <div className="reveal lg:col-span-6 lg:col-start-7 lg:row-start-1">
            <Kicker>{anatomy.kicker}</Kicker>
            <h2
              id={`${id}-title`}
              className="mt-6 font-display text-5xl leading-[1.02] text-balance sm:text-6xl lg:text-7xl"
            >
              {anatomy.title}
            </h2>
            <p className="mt-6 max-w-lg font-serif text-xl leading-relaxed text-ink-soft italic">
              {anatomy.intro}
            </p>
          </div>

          <figure className="lg:col-span-6 lg:col-start-1 lg:row-span-2 lg:row-start-1">
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: anatomy.ratio }}
            >
              <Photo
                photo={anatomy.photo}
                sizes="(min-width: 1024px) 50vw, 100vw"
                label="Ảnh chân dung"
                hint="anatomy.jpg"
              />
              {details.map((d, i) => (
                <Hotspot
                  key={d.name}
                  index={i}
                  x={d.x}
                  y={d.y}
                  name={d.name}
                  active={i === active}
                  onSelect={() => setActive(i)}
                />
              ))}
            </div>
            <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
              Hình 1 — Chạm vào các con số để xem chú giải
            </figcaption>
          </figure>

          <div className="border-y border-ink/20 py-6 lg:hidden" aria-live="polite">
            <div key={active} className="fade-in">
              <p className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-burgundy">{pad(active + 1)}</span>
                <span className="font-display text-3xl text-burgundy italic">
                  {current.name}
                </span>
              </p>
              <p className="mt-3 font-serif text-xl leading-relaxed text-ink-soft">
                {current.text}
              </p>
            </div>
            <div className="mt-5 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em]">
              <button type="button" onClick={() => step(-1)} className="py-2 text-ink-soft">
                ← Trước
              </button>
              <span className="text-ink-soft">
                {pad(active + 1)} / {pad(details.length)}
              </span>
              <button type="button" onClick={() => step(1)} className="py-2 text-burgundy">
                Tiếp →
              </button>
            </div>
          </div>

          <ol className="hidden border-t border-ink/20 lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:block">
            {details.map((d, i) => {
              const open = i === active;
              return (
                <li key={d.name} className="border-b border-ink/15">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={open}
                    className="group flex w-full items-baseline gap-5 py-4 text-left"
                  >
                    <span className="font-mono text-xs text-burgundy">{pad(i + 1)}</span>
                    <span
                      className={`font-display text-3xl transition-colors ${open ? "text-burgundy italic" : "group-hover:text-burgundy"}`}
                    >
                      {d.name}
                    </span>
                    <span aria-hidden className="ml-auto font-mono text-ink-soft">
                      {open ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <p className="overflow-hidden pl-10 font-serif text-xl leading-relaxed text-ink-soft italic">
                      <span className="block pb-6">{d.text}</span>
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <FactFile />
      </div>
    </section>
  );
}

function Hotspot({
  index,
  x,
  y,
  name,
  active,
  onSelect,
}: {
  index: number;
  x: number;
  y: number;
  name: string;
  active: boolean;
  onSelect: () => void;
}) {
  const labelOnLeft = x > 60;
  return (
    <>
      <button
        type="button"
        onClick={onSelect}
        aria-label={`${pad(index + 1)} — ${name}`}
        aria-pressed={active}
        style={{ left: `${x}%`, top: `${y}%` }}
        className={`hotspot absolute z-10 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full font-mono text-xs shadow-[0_4px_12px_rgb(0_0_0/0.35)] transition-[scale,background-color,color] duration-300 ${
          active ? "is-active scale-125 bg-burgundy text-paper" : "bg-paper/90 text-burgundy hover:scale-110"
        }`}
      >
        {index + 1}
      </button>
      {active && (
        <span
          aria-hidden
          style={
            labelOnLeft
              ? { right: `calc(${100 - x}% + 26px)`, top: `${y}%` }
              : { left: `calc(${x}% + 26px)`, top: `${y}%` }
          }
          className="fade-in pointer-events-none absolute z-10 -translate-y-1/2 bg-ink/80 px-2.5 py-1.5 font-mono text-[10px] whitespace-nowrap text-paper uppercase tracking-[0.18em]"
        >
          {name}
        </span>
      )}
    </>
  );
}

function FactFile() {
  return (
    <div className="reveal relative mt-20 border border-ink/20 bg-paper p-6 shadow-[0_30px_60px_-40px_rgb(30_26_23/0.45)] sm:p-10 lg:mt-28">
      <span
        aria-hidden
        className="absolute -top-5 right-5 rotate-6 rounded-md border-[3px] border-burgundy bg-paper px-3 py-1 font-mono text-sm tracking-[0.24em] text-burgundy uppercase sm:right-10"
      >
        Tuyệt mật
      </span>
      <div className="flex items-baseline justify-between border-b border-ink/25 pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
        <span>Hồ sơ nàng thơ</span>
        <span>Lưu hành nội bộ</span>
      </div>
      <dl className="grid gap-x-12 sm:grid-cols-2">
        {anatomy.file.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline gap-4 border-b border-dashed border-ink/20 py-3.5"
          >
            <dt className="w-32 shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
              {row.label}
            </dt>
            <dd className="font-serif text-xl">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
