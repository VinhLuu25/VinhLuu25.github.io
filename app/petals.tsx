"use client";

import { useEffect, useRef } from "react";
import { garden } from "./garden-content";

export function burstFlowers(x: number, y: number, count: number) {
  window.dispatchEvent(new CustomEvent("phuong-flowers", { detail: { x, y, count } }));
}

type Particle = { active: boolean; x: number; y: number; vx: number; vy: number; angle: number; spin: number; size: number; age: number; life: number; rose: boolean; tone: number };

export function Petals({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    if (reduced) { context.clearRect(0, 0, canvas.width, canvas.height); return; }
    const touch = matchMedia("(pointer: coarse)").matches;
    const limit = touch ? garden.effects.mobileLimit : garden.effects.desktopLimit;
    const pool: Particle[] = Array.from({ length: limit }, () => ({ active: false, x: 0, y: 0, vx: 0, vy: 0, angle: 0, spin: 0, size: 0, age: 0, life: 1, rose: false, tone: 0 }));
    const flower = new Image(); flower.src = "/art/rose.webp";
    let width = 0, height = 0, cursor = 0, frame = 0, last = 0, trailTime = 0, pointerActive = false;
    const pointer = { x: -100, y: -100, smoothX: -100, smoothY: -100 };
    const palette = ["#e6a1b0", "#f2becb", "#d7859b", "#f9dce3"];
    let textAreas: DOMRect[] = [];
    function measureText() {
      textAreas = Array.from(document.querySelectorAll("h1, h2, p, nav, .wordmark, .button, .motion-toggle, .text-link, .seal span"))
        .map(el => el.getBoundingClientRect()).filter(r => r.width && r.height && r.bottom > 0 && r.top < innerHeight);
    }
    function resize() {
      width = innerWidth; height = innerHeight;
      const dpr = Math.min(devicePixelRatio, 2);
      canvas!.width = width * dpr; canvas!.height = height * dpr;
      context!.setTransform(dpr, 0, 0, dpr, 0, 0);
      measureText();
    }
    function add(x: number, y: number, count: number, trail = false) {
      for (let i = 0; i < Math.min(count, limit); i++) {
        const p = pool[cursor++ % limit];
        const a = Math.random() * Math.PI * 2;
        const force = trail ? 15 + Math.random() * 30 : 65 + Math.random() * 160;
        Object.assign(p, { active: true, x, y, vx: Math.cos(a) * force, vy: Math.sin(a) * force - (trail ? 10 : 100), angle: a, spin: (Math.random() - .5) * 2.5, size: trail ? 10 + Math.random() * 11 : 12 + Math.random() * 20, age: 0, life: 1.8 + Math.random() * 1.5, rose: Math.random() < .18, tone: Math.floor(Math.random() * palette.length) });
      }
      if (!frame && !document.hidden) { last = performance.now(); frame = requestAnimationFrame(draw); }
    }
    function draw(now: number) {
      frame = 0;
      if (document.hidden) return;
      const dt = Math.min((now - last) / 1000, .033); last = now;
      context!.clearRect(0, 0, width, height);
      context!.save(); context!.beginPath(); context!.rect(0, 0, width, height);
      textAreas.forEach(r => context!.rect(r.left - 4, r.top - 4, r.width + 8, r.height + 8));
      context!.clip("evenodd");
      pointer.smoothX += (pointer.x - pointer.smoothX) * .12;
      pointer.smoothY += (pointer.y - pointer.smoothY) * .12;
      const moving = Math.hypot(pointer.x - pointer.smoothX, pointer.y - pointer.smoothY) > 4;
      if (!touch && pointerActive && moving && now - trailTime > 72) { add(pointer.smoothX, pointer.smoothY, 1, true); trailTime = now; }
      let active = false;
      for (const p of pool) {
        if (!p.active) continue;
        p.age += dt;
        if (p.age >= p.life) { p.active = false; continue; }
        active = true;
        p.vy += 82 * dt; p.vx *= Math.exp(-.65 * dt); p.x += p.vx * dt; p.y += p.vy * dt; p.angle += p.spin * dt;
        context!.save(); context!.translate(p.x, p.y); context!.rotate(p.angle);
        context!.globalAlpha = Math.min(1, (p.life - p.age) * 1.7) * .85;
        if (p.rose && flower.complete && flower.naturalWidth) context!.drawImage(flower, -p.size, -p.size, p.size * 2, p.size * 2);
        else {
          context!.scale(1, .65 + .25 * Math.sin(p.age * 3));
          context!.fillStyle = palette[p.tone];
          context!.beginPath(); context!.moveTo(-p.size * .5, 0);
          context!.bezierCurveTo(-p.size * .6, -p.size * .8, p.size * .65, -p.size * .6, p.size * .5, p.size * .1);
          context!.bezierCurveTo(p.size * .2, p.size * .7, -p.size * .25, p.size * .6, -p.size * .5, 0); context!.fill();
        }
        context!.restore();
      }
      context!.restore();
      canvas!.dataset.particles = String(pool.filter(p => p.active).length);
      if ((active || moving) && !frame) frame = requestAnimationFrame(draw);
    }
    function onMove(event: PointerEvent) {
      if (touch || event.pointerType !== "mouse") return;
      pointerActive = true;
      if (pointer.x < 0) { pointer.smoothX = event.clientX; pointer.smoothY = event.clientY; }
      pointer.x = event.clientX; pointer.y = event.clientY;
      if (!frame) { last = performance.now(); frame = requestAnimationFrame(draw); }
    }
    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (target.closest(".motion-toggle")) return;
      const rect = target.getBoundingClientRect();
      const x = event.detail === 0 ? rect.left + rect.width / 2 : event.clientX;
      const y = event.detail === 0 ? rect.top + rect.height / 2 : event.clientY;
      add(x, y, target.closest("[data-bouquet]") ? garden.effects.openingBurst : garden.effects.burst);
    }
    function onBurst(event: Event) { const { x, y, count } = (event as CustomEvent).detail; add(x, y, count); }
    function visibility() {
      cancelAnimationFrame(frame); frame = 0;
      if (!document.hidden && pool.some(p => p.active)) { last = performance.now(); frame = requestAnimationFrame(draw); }
    }
    resize();
    const observer = new ResizeObserver(measureText); observer.observe(document.body);
    window.addEventListener("scroll", measureText, { passive: true });
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("click", onClick);
    window.addEventListener("phuong-flowers", onBurst);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("scroll", measureText);
      window.removeEventListener("resize", resize); window.removeEventListener("pointermove", onMove); window.removeEventListener("click", onClick); window.removeEventListener("phuong-flowers", onBurst); document.removeEventListener("visibilitychange", visibility);
      context.clearRect(0, 0, width, height);
    };
  }, [reduced]);
  return <canvas className="petal-canvas" ref={ref} aria-hidden="true" />;
}
