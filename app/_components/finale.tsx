"use client";

import { useRef, useState } from "react";
import { finale, issue } from "../content";
import { BurstLayer, useBurst } from "./burst";
import { SECTIONS } from "./sections";
import { Folio, Kicker, wrap } from "./ui";

const { id, page } = SECTIONS.finale;

export function Finale() {
  const [accepted, setAccepted] = useState(false);
  const [dodges, setDodges] = useState(0);
  const [noAt, setNoAt] = useState<{ x: number; y: number } | null>(null);
  const [hearts, setHearts] = useState(0);
  const areaRef = useRef<HTMLDivElement>(null);
  const noRef = useRef<HTMLButtonElement>(null);
  const yesRef = useRef<HTMLButtonElement>(null);
  const heartRef = useRef<HTMLButtonElement>(null);
  const { particles, fire, fireFrom } = useBurst();

  function dodge() {
    const area = areaRef.current?.getBoundingClientRect();
    const btn = noRef.current?.getBoundingClientRect();
    if (!area || !btn) return;
    const maxX = Math.max(0, area.width - btn.width);
    const maxY = Math.max(0, area.height - btn.height);
    let x = 0;
    let y = 0;
    for (let tries = 0; tries < 12; tries++) {
      x = Math.random() * maxX;
      y = Math.random() * maxY;
      if (!noAt || Math.hypot(x - noAt.x, y - noAt.y) > 140) break;
    }
    setNoAt({ x, y });
    setDodges(dodges + 1);
  }

  function accept() {
    setAccepted(true);
    fireFrom(yesRef.current, 50, 1.6);
    const w = window.innerWidth;
    const h = window.innerHeight;
    setTimeout(() => fire(w * 0.2, h * 0.35, 36, 1.3), 300);
    setTimeout(() => fire(w * 0.8, h * 0.3, 36, 1.3), 550);
    setTimeout(() => fire(w * 0.5, h * 0.2, 44, 1.5), 800);
  }

  const yesScale = 1 + Math.min(dodges, 6) * 0.08;
  const noLabel = finale.no[Math.min(dodges, finale.no.length - 1)];

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`${wrap} scroll-mt-6 py-28 text-center lg:py-40`}
    >
      <Folio section={finale.kicker} page={page} />

      <div className="reveal mx-auto max-w-5xl pt-16 lg:pt-24">
        <Kicker>{finale.kicker} — Một câu hỏi</Kicker>
        <h2
          id={`${id}-title`}
          className="mt-8 font-display text-4xl leading-[1.08] text-balance sm:text-6xl lg:text-7xl"
        >
          {finale.question}
        </h2>
      </div>

      {accepted ? (
        <div className="fade-in mx-auto mt-16 max-w-3xl" aria-live="polite">
          <p className="font-display text-6xl text-burgundy italic sm:text-8xl">
            {finale.answer}
          </p>
          <p className="mx-auto mt-6 max-w-xl font-serif text-2xl leading-snug text-ink-soft text-pretty">
            {finale.answerNote}
          </p>

          <div className="mx-auto mt-14 grid max-w-xl grid-cols-2 gap-8 text-left sm:gap-14">
            <Signature name={issue.herName} role="Nàng thơ · đã ký" tilt="-rotate-3" />
            <Signature name={issue.yourName} role="Ban biên tập · đã ký" tilt="rotate-1" />
          </div>

          <button
            ref={heartRef}
            type="button"
            onClick={() => {
              setHearts(hearts + 1);
              fireFrom(heartRef.current, 22, 1);
            }}
            className="mt-14 inline-flex items-center gap-3 border border-burgundy px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-burgundy transition-colors hover:bg-burgundy hover:text-paper"
          >
            <span aria-hidden className="text-base">♥</span>
            Thả tim cho anh
          </button>
          {hearts > 0 && (
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
              Em đã thả {hearts} tim · anh nhận đủ rồi
            </p>
          )}
        </div>
      ) : (
        <div
          ref={areaRef}
          className="relative mx-auto mt-16 flex min-h-64 max-w-3xl flex-wrap items-center justify-center gap-6"
        >
          <button
            ref={yesRef}
            type="button"
            onClick={accept}
            style={{ transform: `scale(${yesScale})` }}
            className="relative z-10 bg-burgundy px-9 py-4 font-sans text-sm font-semibold uppercase tracking-[0.24em] text-paper shadow-[0_18px_30px_-16px_rgb(92_19_36/0.7)] transition-[transform,background-color] duration-300 hover:bg-burgundy-deep"
          >
            {finale.yes} ♥
          </button>
          <button
            ref={noRef}
            type="button"
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") dodge();
            }}
            onClick={dodge}
            style={noAt ? { left: noAt.x, top: noAt.y } : undefined}
            className={`border border-ink/30 bg-paper px-7 py-4 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-ink-soft transition-[left,top] duration-300 ease-out ${noAt ? "absolute" : ""}`}
          >
            {noLabel}
          </button>
        </div>
      )}
      <BurstLayer particles={particles} />
    </section>
  );
}

function Signature({
  name,
  role,
  tilt,
}: {
  name: string;
  role: string;
  tilt: string;
}) {
  return (
    <div>
      <p className={`font-hand text-4xl leading-tight text-burgundy sm:text-5xl ${tilt}`}>
        {name}
      </p>
      <p className="mt-2 border-t border-ink/30 pt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
        {role}
      </p>
    </div>
  );
}
