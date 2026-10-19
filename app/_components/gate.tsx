"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { gate, issue } from "../content";

const KEY = "muse-gate-opened";
const REVEAL_COVER_AT = 1300;
const DONE_AT = 2300;

const subscribe = () => () => {};
function wasOpened() {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function Gate() {
  const opened = useSyncExternalStore(subscribe, wasOpened, () => false);
  const [stage, setStage] = useState<"closed" | "opening" | "done">("closed");
  const visible = !opened && stage !== "done";

  useEffect(() => {
    const html = document.documentElement;
    if (!visible) {
      delete html.dataset.gate;
      return;
    }
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = "";
    };
  }, [visible]);

  if (!visible) return null;

  function open() {
    if (stage !== "closed") return;
    setStage("opening");
    setTimeout(() => delete document.documentElement.dataset.gate, REVEAL_COVER_AT);
    setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      setStage("done");
    }, DONE_AT);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Thư gửi ${issue.herName}`}
      className={`gate ${stage === "opening" ? "is-open" : ""}`}
    >
      <p className="gate-fade text-center font-mono text-[11px] uppercase tracking-[0.24em] text-ink-soft">
        {issue.volume} · {gate.line}
      </p>

      <div className="envelope">
        <div className="envelope-back" />
        <div className="envelope-letter">
          <span className="font-display text-5xl font-medium tracking-[-0.04em] text-burgundy sm:text-6xl">
            {issue.masthead}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-soft">
            The October Issue · {issue.date}
          </span>
        </div>
        <div className="pocket pocket-left" />
        <div className="pocket pocket-right" />
        <div className="pocket pocket-bottom" />
        <p className="envelope-address font-hand text-3xl text-blush sm:text-4xl">
          Gửi {issue.herName}
        </p>
        <div className="envelope-flap" />
        <button
          type="button"
          onClick={open}
          autoFocus
          aria-label="Mở thư"
          className="envelope-seal"
        >
          <span className="font-display text-3xl italic">
            ♡
          </span>
        </button>
      </div>

      <p className="gate-fade gate-hint font-mono text-[11px] uppercase tracking-[0.24em] text-burgundy">
        {gate.hint}
      </p>
    </div>
  );
}
