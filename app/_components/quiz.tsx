"use client";

import { useRef, useState } from "react";
import { quiz } from "../content";
import { BurstLayer, useBurst } from "./burst";
import { SECTIONS } from "./sections";
import { Folio, Kicker, wrap } from "./ui";

const { id, page } = SECTIONS.quiz;
const LETTERS = ["A", "B", "C", "D"];
const ADVANCE_AFTER = 650;

const pad = (n: number) => String(n).padStart(2, "0");

export function Quiz() {
  const [answers, setAnswers] = useState<number[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { particles, fireFrom } = useBurst();

  const total = quiz.questions.length;
  const step = answers.length;
  const done = step === total;

  function choose(option: number) {
    if (picked !== null) return;
    setPicked(option);
    setTimeout(() => {
      setAnswers([...answers, option]);
      setPicked(null);
      if (step + 1 === total) {
        requestAnimationFrame(() => fireFrom(cardRef.current, 40, 1.4));
      }
    }, ADVANCE_AFTER);
  }

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`${wrap} scroll-mt-6 pt-28 lg:pt-40`}
    >
      <Folio section={quiz.kicker} page={page} />

      <div className="grid gap-x-12 gap-y-10 pt-12 lg:grid-cols-12 lg:pt-20">
        <div className="reveal lg:col-span-4">
          <Kicker>{quiz.kicker}</Kicker>
          <h2
            id={`${id}-title`}
            className="mt-6 font-display text-5xl leading-[1.02] text-balance sm:text-6xl"
          >
            {quiz.title}
          </h2>
          <p className="mt-6 font-serif text-xl leading-relaxed text-ink-soft italic">
            {quiz.intro}
          </p>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
            {total} câu · 1 phút · không chấm điểm
          </p>
        </div>

        <div
          ref={cardRef}
          className="relative border border-ink/20 bg-paper p-6 shadow-[0_30px_60px_-40px_rgb(30_26_23/0.45)] sm:p-10 lg:col-span-8 lg:p-14"
        >
          {done ? (
            <QuizResult answers={answers} onRestart={() => setAnswers([])} />
          ) : (
            <div key={step} className="fade-in">
              <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
                <span>
                  Câu {pad(step + 1)} / {pad(total)}
                </span>
                <span>Khoanh một đáp án</span>
              </div>
              <div className="mt-3 flex gap-1.5" aria-hidden>
                {quiz.questions.map((_, i) => (
                  <span
                    key={i}
                    className={`h-[3px] flex-1 transition-colors duration-500 ${i <= step ? "bg-burgundy" : "bg-ink/10"}`}
                  />
                ))}
              </div>

              <h3 className="mt-10 font-display text-3xl leading-tight text-balance sm:text-4xl lg:text-[2.75rem]">
                {quiz.questions[step].q}
              </h3>

              <ol className="mt-10 grid gap-3 sm:grid-cols-2">
                {quiz.questions[step].options.map((option, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => choose(i)}
                      disabled={picked !== null}
                      aria-pressed={picked === i}
                      className={`flex h-full w-full items-center gap-4 border px-4 py-4 text-left transition-colors duration-300 ${
                        picked === i
                          ? "border-burgundy bg-blush/40"
                          : "border-ink/15 enabled:hover:border-burgundy/60 enabled:hover:bg-blush/20"
                      }`}
                    >
                      <span className="relative grid size-10 shrink-0 place-items-center font-display text-xl text-burgundy">
                        {LETTERS[i]}
                        {picked === i && <PenCircle />}
                      </span>
                      <span className="font-serif text-xl leading-snug">
                        {option}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
      <BurstLayer particles={particles} />
    </section>
  );
}

function QuizResult({
  answers,
  onRestart,
}: {
  answers: number[];
  onRestart: () => void;
}) {
  const tally = quiz.results.map((_, i) => answers.filter((a) => a === i).length);
  const result = quiz.results[tally.indexOf(Math.max(...tally))];

  return (
    <div className="fade-in py-4 text-center" aria-live="polite">
      <Kicker>Kết quả của em</Kicker>
      <p className="mt-6 font-display text-5xl leading-[1.05] text-burgundy italic text-balance sm:text-7xl">
        {result.title}
      </p>
      <p className="mx-auto mt-6 max-w-xl font-serif text-2xl leading-snug text-ink-soft text-pretty">
        {result.text}
      </p>
      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
        Đáp án của em: {answers.map((a) => LETTERS[a]).join(" · ")}
      </p>
      <p className="mx-auto mt-10 max-w-xl border border-dashed border-burgundy/40 px-6 py-5 font-serif text-lg leading-relaxed italic text-pretty">
        {quiz.verdict}
      </p>
      <button
        type="button"
        onClick={onRestart}
        className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft underline underline-offset-4 transition-colors hover:text-burgundy"
      >
        Làm lại bài trắc nghiệm
      </button>
    </div>
  );
}

function PenCircle() {
  return (
    <svg
      viewBox="0 0 60 56"
      aria-hidden
      className="absolute -inset-2 size-[calc(100%+1rem)] text-burgundy"
    >
      <path
        d="M33 5 C 50 4, 59 18, 55 32 C 51 47, 24 55, 11 43 C 1 33, 6 13, 25 7 C 33 5, 41 6, 47 11"
        pathLength={1}
        className="pen fill-none stroke-current"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
