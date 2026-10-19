"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import { issue, wishes } from "../content";
import { BurstLayer, useBurst } from "./burst";
import { SECTIONS } from "./sections";
import { Folio, Kicker, wrap } from "./ui";

const { id, page } = SECTIONS.wishes;

type Saved = { items: string[]; sent: boolean };
const KEY = "muse-wishes";
const EMPTY = JSON.stringify({ items: ["", "", ""], sent: false } satisfies Saved);
let memory = EMPTY;
const listeners = new Set<() => void>();

function readSaved() {
  try {
    return localStorage.getItem(KEY) ?? memory;
  } catch {
    return memory;
  }
}

function writeSaved(next: Saved) {
  memory = JSON.stringify(next);
  try {
    localStorage.setItem(KEY, memory);
  } catch {}
  listeners.forEach((notify) => notify());
}

function subscribeSaved(notify: () => void) {
  listeners.add(notify);
  window.addEventListener("storage", notify);
  return () => {
    listeners.delete(notify);
    window.removeEventListener("storage", notify);
  };
}

function parseSaved(raw: string): Saved {
  try {
    const saved = JSON.parse(raw) as Partial<Saved>;
    const items = [0, 1, 2].map((i) => saved.items?.[i] ?? "");
    return { items, sent: Boolean(saved.sent) };
  } catch {
    return JSON.parse(EMPTY) as Saved;
  }
}

const pad = (n: number) => String(n).padStart(2, "0");

export function Wishes() {
  const raw = useSyncExternalStore(subscribeSaved, readSaved, () => EMPTY);
  const saved = useMemo(() => parseSaved(raw), [raw]);
  const [status, setStatus] = useState<"idle" | "shared" | "copied" | "manual">("idle");
  const sendRef = useRef<HTMLButtonElement>(null);
  const { particles, fireFrom } = useBurst();

  const written = saved.items.map((w) => w.trim()).filter(Boolean);
  const message = [
    `${wishes.title} — ${issue.herName}, ${issue.date}`,
    ...written.map((w, i) => `${i + 1}. ${w}`),
  ].join("\n");

  function edit(index: number, value: string) {
    const items = [...saved.items];
    items[index] = value;
    writeSaved({ items, sent: false });
    setStatus("idle");
  }

  async function send() {
    if (written.length === 0) return;

    if (navigator.share && matchMedia("(pointer: coarse)").matches) {
      try {
        await navigator.share({ title: wishes.title, text: message });
        setStatus("shared");
      } catch (err) {
        if ((err as DOMException).name === "AbortError") return;
        setStatus((await copy(message)) ? "copied" : "manual");
      }
    } else {
      setStatus((await copy(message)) ? "copied" : "manual");
    }

    fireFrom(sendRef.current, 36, 1.3);
    writeSaved({ ...saved, sent: true });
  }

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`${wrap} scroll-mt-6 pt-28 pb-28 lg:pt-40 lg:pb-40`}
    >
      <Folio section={SECTIONS.wishes.title} page={page} />

      <div className="reveal grid items-end gap-x-12 gap-y-6 pt-12 lg:grid-cols-12 lg:pt-20">
        <div className="lg:col-span-7">
          <Kicker>{wishes.kicker}</Kicker>
          <h2
            id={`${id}-title`}
            className="mt-6 font-display text-6xl leading-[0.95] text-balance sm:text-7xl lg:text-8xl"
          >
            {wishes.title}
          </h2>
        </div>
        <p className="max-w-md font-serif text-xl leading-relaxed text-ink-soft italic lg:col-span-5 lg:pb-3">
          {wishes.intro}
        </p>
      </div>

      <ol className="mt-14 grid gap-8 sm:grid-cols-3 lg:mt-20 lg:gap-10">
        {saved.items.map((value, i) => (
          <li
            key={i}
            className={`reveal relative bg-paper p-5 pt-4 shadow-[0_24px_40px_-28px_rgb(30_26_23/0.55)] ring-1 ring-ink/10 ${["-rotate-1", "rotate-1", "-rotate-[0.6deg]"][i]}`}
          >
            <span
              aria-hidden
              className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-2 bg-blush/80"
            />
            <label
              htmlFor={`wish-${i}`}
              className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft"
            >
              <span>Điều ước</span>
              <span className="text-burgundy">№ {pad(i + 1)}</span>
            </label>
            <textarea
              id={`wish-${i}`}
              value={value}
              onChange={(e) => edit(i, e.target.value)}
              placeholder={wishes.placeholders[i]}
              rows={4}
              maxLength={180}
              className="lined mt-3 block w-full resize-none bg-transparent font-hand text-[1.7rem] text-burgundy outline-none placeholder:text-ink-soft/45"
            />
            {saved.sent && value.trim() && (
              <span
                aria-hidden
                className="stamp-in absolute right-3 bottom-3 -rotate-12 rounded-md border-2 border-burgundy px-2 py-0.5 font-mono text-[10px] tracking-[0.2em] text-burgundy uppercase"
              >
                Đã nhận
              </span>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-12 flex flex-col items-center text-center" aria-live="polite">
        {saved.sent ? (
          <div className="fade-in max-w-xl">
            <p className="font-serif text-2xl leading-snug text-ink">{wishes.sent}</p>
            <p className="mt-3 font-hand text-4xl text-burgundy">— {issue.yourName}</p>
            {status === "copied" && (
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
                Đã sao chép điều ước — dán gửi anh qua tin nhắn nhé
              </p>
            )}
            {status === "manual" && (
              <pre className="mt-5 border border-dashed border-ink/30 p-4 text-left font-mono text-xs whitespace-pre-wrap select-all">
                {message}
              </pre>
            )}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              {wishes.sendTo && (
                <a
                  href={wishes.sendTo}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-burgundy px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-paper transition-colors hover:bg-burgundy-deep"
                >
                  Mở tin nhắn với anh
                </a>
              )}
              <button
                type="button"
                onClick={send}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft underline underline-offset-4 hover:text-burgundy"
              >
                Gửi lại
              </button>
            </div>
          </div>
        ) : (
          <>
            <button
              ref={sendRef}
              type="button"
              onClick={send}
              disabled={written.length === 0}
              className="bg-burgundy px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-paper transition-colors enabled:hover:bg-burgundy-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              Gửi điều ước cho anh ♥
            </button>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
              {written.length === 0
                ? "Viết ít nhất một điều ước nhé"
                : `${written.length} / 3 điều ước · sẵn sàng gửi`}
            </p>
          </>
        )}
      </div>
      <BurstLayer particles={particles} />
    </section>
  );
}

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
