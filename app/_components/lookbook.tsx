"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { issue, lookbook } from "../content";
import { Photo } from "./photo";
import { SECTIONS } from "./sections";
import { Folio, Kicker, wrap } from "./ui";

const { id, page } = SECTIONS.lookbook;
const { items } = lookbook;

const pad = (n: number) => String(n).padStart(2, "0");

type Frame = { ratio: string; ratioLabel: string; place: string; sizes: string };

const LAYOUT: Frame[] = [
  {
    ratio: "aspect-[3/2]",
    ratioLabel: "3:2",
    place: "col-span-12 lg:col-span-8 lg:col-start-1",
    sizes: "(min-width: 1024px) 66vw, 100vw",
  },
  {
    ratio: "aspect-[3/4]",
    ratioLabel: "3:4",
    place: "col-span-8 col-start-5 lg:col-span-4 lg:col-start-9 lg:mt-56",
    sizes: "(min-width: 1024px) 33vw, 66vw",
  },
  {
    ratio: "aspect-[4/5]",
    ratioLabel: "4:5",
    place: "col-span-10 lg:col-span-5 lg:col-start-2",
    sizes: "(min-width: 1024px) 42vw, 84vw",
  },
  {
    ratio: "aspect-[3/4]",
    ratioLabel: "3:4",
    place: "col-span-9 col-start-4 lg:col-span-4 lg:col-start-8 lg:mt-36",
    sizes: "(min-width: 1024px) 33vw, 75vw",
  },
  {
    ratio: "aspect-[3/4]",
    ratioLabel: "3:4",
    place: "col-span-10 lg:col-span-4 lg:col-start-1",
    sizes: "(min-width: 1024px) 33vw, 84vw",
  },
  {
    ratio: "aspect-[2/3]",
    ratioLabel: "2:3",
    place: "col-span-9 col-start-4 lg:col-span-4 lg:col-start-5 lg:mt-28",
    sizes: "(min-width: 1024px) 33vw, 75vw",
  },
  {
    ratio: "aspect-[2/3]",
    ratioLabel: "2:3",
    place: "col-span-10 lg:col-span-4 lg:col-start-9 lg:mt-12",
    sizes: "(min-width: 1024px) 33vw, 84vw",
  },
  {
    ratio: "aspect-[3/4]",
    ratioLabel: "3:4",
    place: "col-span-9 col-start-4 lg:col-span-4 lg:col-start-2 lg:mt-32",
    sizes: "(min-width: 1024px) 33vw, 75vw",
  },
  {
    ratio: "aspect-[4/5]",
    ratioLabel: "4:5",
    place: "col-span-11 lg:col-span-6 lg:col-start-7",
    sizes: "(min-width: 1024px) 50vw, 92vw",
  },
  {
    ratio: "aspect-[4/3] lg:aspect-[16/9]",
    ratioLabel: "16:9",
    place: "col-span-12",
    sizes: "100vw",
  },
];

const QUOTE_AFTER = 4;

export function Lookbook() {
  const [open, setOpen] = useState<number | null>(null);
  const step = (by: number) =>
    setOpen((i) => (i === null ? null : (i + by + items.length) % items.length));

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`${wrap} scroll-mt-6 pt-28 lg:pt-40`}
    >
      <Folio section={lookbook.kicker} page={page} />

      <div className="reveal grid items-end gap-x-12 gap-y-8 pt-12 lg:grid-cols-12 lg:pt-20">
        <div className="lg:col-span-7">
          <Kicker className="text-forest">
            {lookbook.kicker} — {issue.volume}
          </Kicker>
          <h2
            id={`${id}-title`}
            className="mt-6 font-display text-6xl leading-[0.92] tracking-[-0.02em] italic sm:text-8xl lg:text-[8.5rem]"
          >
            {lookbook.title}
          </h2>
        </div>
        <div className="lg:col-span-4 lg:col-start-9 lg:pb-3">
          <p className="max-w-md font-serif text-xl leading-relaxed text-ink-soft italic">
            {lookbook.intro}
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
            {pad(items.length)} khung hình · chạm để xem toàn ảnh
          </p>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-12 gap-x-4 gap-y-16 sm:gap-x-8 lg:mt-24 lg:gap-x-12 lg:gap-y-24">
        {items.map((item, i) => {
          const frame = LAYOUT[i % LAYOUT.length];
          const no = pad(i + 1);
          return (
            <Fragment key={item.photo.src || i}>
              {i === QUOTE_AFTER && <Interlude />}
              <figure className={`reveal ${frame.place}`}>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  disabled={!item.photo.src}
                  aria-label={`Xem toàn ảnh ${no}: ${item.photo.alt}`}
                  className="group zoom relative block w-full cursor-zoom-in overflow-hidden disabled:cursor-default"
                >
                  <div className={`relative ${frame.ratio}`}>
                    <Photo
                      photo={item.photo}
                      sizes={frame.sizes}
                      label={`Khoảnh khắc ${no} · ${frame.ratioLabel}`}
                      hint={`lookbook-${i + 1}.jpg`}
                    />
                  </div>
                  {item.photo.src && (
                    <span className="absolute right-3 bottom-3 bg-paper/90 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                      Xem toàn ảnh
                    </span>
                  )}
                </button>
                <figcaption className="mt-4 flex gap-4 border-t border-ink/15 pt-3">
                  <span className="font-mono text-xs text-forest">№{no}</span>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
                      {item.place}
                      {item.date && <span className="text-ink-soft"> — {item.date}</span>}
                    </p>
                    <p className="mt-1.5 font-serif text-lg leading-snug text-ink-soft italic">
                      {item.note}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Fragment>
          );
        })}
      </div>

      <Lightbox index={open} onClose={() => setOpen(null)} onStep={step} />
    </section>
  );
}

function Interlude() {
  return (
    <blockquote className="reveal col-span-12 py-6 text-center lg:col-span-10 lg:col-start-2 lg:py-12">
      <span aria-hidden className="block font-display text-7xl leading-[0.6] text-burgundy/25">
        “
      </span>
      <p className="mx-auto mt-4 max-w-4xl font-display text-3xl leading-[1.2] italic text-balance sm:text-5xl lg:text-6xl">
        {lookbook.quote}
      </p>
      <footer className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
        — Ghi chú của nhiếp ảnh gia
      </footer>
    </blockquote>
  );
}

const SWIPE = 50;

function Lightbox({
  index,
  onClose,
  onStep,
}: {
  index: number | null;
  onClose: () => void;
  onStep: (by: number) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const swipeFrom = useRef<number | null>(null);
  const item = index === null ? null : items[index];

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) dialog.showModal();
    if (index === null && dialog.open) dialog.close();
  }, [index]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") onStep(1);
        if (e.key === "ArrowLeft") onStep(-1);
      }}
      aria-label="Xem ảnh"
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-paper backdrop:bg-[#140f0d]/92"
    >
      {item && index !== null && (
        <div
          className="flex h-full flex-col px-4 pt-4 pb-6 sm:px-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          onPointerDown={(e) => {
            swipeFrom.current = e.clientX;
          }}
          onPointerUp={(e) => {
            if (swipeFrom.current === null) return;
            const dx = e.clientX - swipeFrom.current;
            swipeFrom.current = null;
            if (Math.abs(dx) > SWIPE) onStep(dx < 0 ? 1 : -1);
          }}
        >
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-paper/70">
            <span>
              {issue.masthead} · Lookbook · №{pad(index + 1)} / {pad(items.length)}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-2 py-2 text-paper transition-colors hover:text-blush"
            >
              Đóng ✕
            </button>
          </div>

          <div className="relative mt-4 min-h-0 flex-1">
            <Image
              key={item.photo.src}
              src={item.photo.src}
              alt={item.photo.alt}
              fill
              sizes="100vw"
              quality={90}
              className="fade-in object-contain"
            />
            <button
              type="button"
              onClick={() => onStep(-1)}
              aria-label="Ảnh trước"
              className="absolute top-1/2 left-0 hidden -translate-y-1/2 px-3 py-8 font-display text-4xl text-paper/70 transition-colors hover:text-paper sm:block"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => onStep(1)}
              aria-label="Ảnh tiếp theo"
              className="absolute top-1/2 right-0 hidden -translate-y-1/2 px-3 py-8 font-display text-4xl text-paper/70 transition-colors hover:text-paper sm:block"
            >
              →
            </button>
          </div>

          <div key={index} className="fade-in mx-auto mt-5 max-w-2xl text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-blush">
              {item.place}
              {item.date && ` — ${item.date}`}
            </p>
            <p className="mt-2 font-serif text-xl leading-snug text-paper/90 italic">
              {item.note}
            </p>
            <div className="mt-4 flex justify-center gap-8 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/70 sm:hidden">
              <button type="button" onClick={() => onStep(-1)} className="py-2">
                ← Trước
              </button>
              <button type="button" onClick={() => onStep(1)} className="py-2">
                Tiếp →
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
