"use client";

import { useCallback, useState } from "react";
import { createPortal } from "react-dom";

type Particle = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  rot: number;
  size: number;
  delay: number;
  color: string;
  glyph: string;
};

const COLORS = ["#5c1324", "#8e2a3e", "#c45a6a", "#e8d5cf", "#b8892f"];
const GLYPHS = ["♥", "♥", "♥", "✦", "❀"];
const LIFETIME = 2400;

let nextId = 0;

export function useBurst() {
  const [particles, setParticles] = useState<Particle[]>([]);

  const fire = useCallback((x: number, y: number, count = 28, spread = 1) => {
    const batch: Particle[] = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const distance = (60 + Math.random() * 180) * spread;
      return {
        id: nextId++,
        x,
        y,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance - 60 * spread,
        rot: (Math.random() - 0.5) * 120,
        size: 12 + Math.random() * 18,
        delay: Math.random() * 120,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      };
    });
    const ids = new Set(batch.map((p) => p.id));
    setParticles((current) => [...current, ...batch]);
    setTimeout(
      () => setParticles((current) => current.filter((p) => !ids.has(p.id))),
      LIFETIME,
    );
  }, []);

  const fireFrom = useCallback(
    (el: Element | null, count?: number, spread?: number) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      fire(r.left + r.width / 2, r.top + r.height / 2, count, spread);
    },
    [fire],
  );

  return { particles, fire, fireFrom };
}

export function BurstLayer({ particles }: { particles: Particle[] }) {
  if (particles.length === 0) return null;

  return createPortal(
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="burst absolute leading-none"
          style={
            {
              left: p.x,
              top: p.y,
              color: p.color,
              fontSize: p.size,
              "--dx": `${p.dx}px`,
              "--dy": `${p.dy}px`,
              "--rot": `${p.rot}deg`,
              "--delay": `${p.delay}ms`,
            } as React.CSSProperties
          }
        >
          {p.glyph}
        </span>
      ))}
    </div>,
    document.body,
  );
}
