"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { garden, letter, photos } from "./garden-content";
import { Vine, SceneMotion, FlowerField } from "./immersive";
import { Petals, burstFlowers } from "./petals";

type Picture = typeof photos[number];

function Rose({ className = "" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={`rose ${className}`} src="/art/rose.webp" alt="" aria-hidden="true" width="640" height="640" />;
}

function Stanza({ lines }: { lines: readonly number[] }) {
  return <div className="stanza">{lines.map((line) => <p data-letter-line={line} key={line}>{letter[line]}</p>)}</div>;
}

function Photo({ id, className = "", priority = false, onOpen }: { id: number; className?: string; priority?: boolean; onOpen: (id: number) => void }) {
    const photo = photos[id - 1];
    return <button className={`photo-button ${className}`} onClick={() => onOpen(id)} aria-label={`Xem ảnh: ${photo.alt}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} />
      <span className="photo-open" aria-hidden="true">↗</span>
    </button>;
  }

function subscribePreference(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("phuong-preference", callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener("phuong-preference", callback); };
}
function getQuiet() { try { return localStorage.getItem("phuong-quiet") === "true"; } catch { return false; } }
function subscribeMotion(callback: () => void) {
  const query = matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const serverQuiet = () => false;
const getSystemQuiet = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Garden() {
  const quiet = useSyncExternalStore(subscribePreference, getQuiet, serverQuiet);
  const systemQuiet = useSyncExternalStore(subscribeMotion, getSystemQuiet, serverQuiet);
  const reduced = quiet || systemQuiet;
  const [gift, setGift] = useState<"closed" | "opening" | "open">("closed");
  const giftLock = useRef(false);
  const giftTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [selected, setSelected] = useState(0);
  const [letterVisible, setLetterVisible] = useState(false);
  const [bouquet, setBouquet] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const drag = useRef({down:false,x:0,left:0,moved:false});
  const [bloom, setBloom] = useState(0);

  const lightbox = useRef<HTMLDialogElement>(null);
  const fullLetter = useRef<HTMLDialogElement>(null);
  const gallery = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => () => { if (giftTimer.current) clearTimeout(giftTimer.current); }, []);

  useEffect(() => {
    document.documentElement.dataset.quiet = String(reduced);
    if (reduced || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver((entries) => entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        target.animate(target.classList.contains("photo-button") ? [
          { transform: "perspective(1100px) translate3d(0,100px,-160px) rotateY(-24deg) rotateZ(-7deg)", opacity: .2, filter: "blur(8px)" },
          { transform: "perspective(1100px) translate3d(0,0,0) rotateY(0) rotateZ(0)", opacity: 1, filter: "blur(0px)" },
        ] : [{ transform: "translateY(18px)", opacity: .65 }, { transform: "translateY(0)", opacity: 1 }], {
          duration: target.classList.contains("photo-button") ? 1400 : 900, easing: "cubic-bezier(.16,1,.3,1)", delay: target.parentElement?.classList.contains("stanza") ? Array.from(target.parentElement.children).indexOf(target) * 65 : 0,
        });

      }
    }), { threshold: .12 });
    document.querySelectorAll(".chapter h2, .chapter .stanza p, .chapter .photo-button, .envelope").forEach(el => observer.observe(el));
    return () => { observer.disconnect(); document.getAnimations().forEach(animation => animation.cancel()); };
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const stage = document.querySelector<HTMLElement>(".garden-stage");
    const backdrop = document.querySelector<HTMLElement>(".world-backdrop");
    const clouds = document.querySelector<HTMLElement>(".garden-stage .cloud-bank");
    const left = document.querySelector<HTMLElement>(".hero-companion");
    const right = document.querySelector<HTMLElement>(".hero-portrait");
    let frame = 0;
    const render = () => {
      frame = 0;
      if (!stage || document.hidden) return;
      const y = Math.max(0, Math.min(-stage.getBoundingClientRect().top, stage.offsetHeight));
      if (backdrop) backdrop.style.transform = `translateY(${y * .22}px) scale(1.04)`;
      if (clouds) clouds.style.transform = `translateY(${-y * .1}px)`;
      if (left) left.style.transform = `translateY(${-y * .12}px) rotate(${-7 - y * .012}deg)`;
      if (right) right.style.transform = `translateY(${-y * .2}px) rotate(${7 + y * .01}deg)`;
    };
    const schedule = () => { if (!frame && !document.hidden) frame = requestAnimationFrame(render); };
    window.addEventListener("scroll", schedule, { passive: true });
    document.addEventListener("visibilitychange", schedule);
    return () => {
      cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); document.removeEventListener("visibilitychange", schedule);
      [backdrop, clouds, left, right].forEach(el => { if (el) el.style.transform = ""; });
    };
  }, [reduced]);

  function toggleQuiet() {
    try { localStorage.setItem("phuong-quiet", String(!quiet)); } catch {}
    window.dispatchEvent(new Event("phuong-preference"));
  }

  function showPhoto(id: number) {
    returnFocus.current = document.activeElement as HTMLElement;
    setSelected(id - 1);
    lightbox.current?.showModal();
    document.body.style.overflow = "hidden";
  }
  function showLetter() {
    returnFocus.current = document.activeElement as HTMLElement;
    setLetterVisible(true);
    fullLetter.current?.showModal();
    document.body.style.overflow = "hidden";
  }
  function closeDialog() {
    document.body.style.overflow = "";
    setLetterVisible(false);
    returnFocus.current?.focus({ preventScroll: true });
  }
  function openGift(event: React.MouseEvent<HTMLButtonElement>) {
    if (giftLock.current) return;
    giftLock.current = true;
    setGift(reduced ? "open" : "opening");
    const rect = event.currentTarget.getBoundingClientRect();
    giftTimer.current = setTimeout(() => {
      setGift("open");
      burstFlowers(rect.left + rect.width / 2, rect.top + rect.height / 2, garden.effects.openingBurst);
    }, reduced ? 0 : garden.effects.openingMs);
  }
  function moveGallery(direction: number) {
    gallery.current?.scrollBy({ left: direction * (gallery.current.clientWidth * .75), behavior: reduced ? "instant" : "smooth" });
  }
  const current: Picture = photos[selected];

  return <>
    <a className="skip-link" href="#loi-thu">Đọc lời thư</a>
    <Petals reduced={reduced} /><SceneMotion reduced={reduced} />
    <header className="site-header">
      <a className="wordmark" href="#home">Gửi Phương</a>
      <nav aria-label="Điều hướng chính"><a href="#loi-thu">Lời thư</a><a href="#album">Album</a><button onClick={showLetter}>Đọc trọn lá thư</button></nav>
      <button className="motion-toggle" aria-pressed={reduced} onClick={toggleQuiet} disabled={systemQuiet}>{systemQuiet ? "Đã giảm chuyển động" : quiet ? "Bật hiệu ứng" : "Giảm hiệu ứng"}</button>
    </header>

    <main id="home">
      <section className="hero garden-stage" aria-labelledby="hero-title">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="world-backdrop" src="/art/garden-world.webp" alt="" width="2200" height="1238" fetchPriority="high" aria-hidden="true" />
        <div className="sunlight" aria-hidden="true" />
        <div className="invitation">
          <h1 id="hero-title">For You</h1>
          <p className="occasion">Phương · 20/10</p>
          <a className="button" href="#loi-thu">Bước vào khu vườn <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-companion"><Photo onOpen={showPhoto} id={7} priority /></div>
        <div className="hero-portrait"><Photo onOpen={showPhoto} id={2} priority /></div>
        <div className="foreground-roses" aria-hidden="true"><Rose /><Rose /><Rose /></div>
        <div className="cloud-bank" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/art/clouds.webp" alt="" width="1400" height="467" />
        </div>
      </section>

      <section id="loi-thu" className={`chapter beginning ceremony ${gateOpen ? "entered" : ""}`} aria-labelledby="begin-title">
        <div className="ceremony-gate" aria-hidden={gateOpen}>
          <div className="gate-world" /><Vine className="gate-vine" />
          <button className="gate-invitation" onClick={() => setGateOpen(true)} disabled={gateOpen}><span>Our Beginning</span><small>Chạm để bước qua cổng hoa</small><b>↗</b></button>
        </div>
        <Vine className="scene-canopy" /><div className="begin-photos"><Photo onOpen={showPhoto} id={1} /><Photo onOpen={showPhoto} id={7} className="small-print" /></div>
        <div className="letter-paper">
          <h2 id="begin-title">{garden.chapters.beginning.title}</h2>
          <Stanza lines={garden.chapters.beginning.lines} />
          <Rose className="paper-rose" />
        </div>
      </section>

      <section id="mon-qua" className={`chapter gift-section gift-${gift}`} aria-labelledby="gift-title">
        <Vine className="scene-canopy" /><div className="river-shimmer" aria-hidden="true"/><div className="riverside-photo"><Vine /><Photo onOpen={showPhoto} id={2} /></div><div className="gift-intro"><h2 id="gift-title">{garden.chapters.gratitude.title}</h2></div>
        <div className="gift-layout">
          <div className="bottle-area">
            <button className="message-bottle" onClick={openGift} aria-label="Nhặt lọ thư trên sông" aria-expanded={gift !== "closed"} aria-controls="gift-content" disabled={gift !== "closed"}>
              <svg viewBox="0 0 180 390" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="bottle-glass"><stop stopColor="#d4ffff" stopOpacity=".7"/><stop offset=".18" stopColor="#458f88" stopOpacity=".35"/><stop offset=".45" stopColor="#e5ffff" stopOpacity=".12"/><stop offset=".8" stopColor="#216b64" stopOpacity=".38"/><stop offset="1" stopColor="#deffff" stopOpacity=".8"/></linearGradient>
                  <linearGradient id="rolled-paper"><stop stopColor="#947547"/><stop offset=".23" stopColor="#f6e8bb"/><stop offset=".65" stopColor="#fff4d0"/><stop offset="1" stopColor="#b8945a"/></linearGradient>
                  <linearGradient id="cork"><stop stopColor="#715235"/><stop offset=".5" stopColor="#c9a073"/><stop offset="1" stopColor="#795535"/></linearGradient>
                </defs>
                <g className="bottle-cork"><rect x="66" y="14" width="48" height="52" rx="8" fill="url(#cork)"/><path d="M73 26h24m-18 12h28M73 47h15" stroke="#62492d" strokeOpacity=".4"/></g>
                <path d="M62 53h56v67c0 29 42 35 42 75v154c0 20-15 27-70 27s-70-7-70-27V195c0-40 42-46 42-75V53Z" fill="url(#bottle-glass)" stroke="#e6ffff" strokeOpacity=".7" strokeWidth="2"/>
                <g className="bottle-scroll" transform="rotate(-8 90 250)"><rect x="64" y="168" width="54" height="163" rx="9" fill="url(#rolled-paper)"/><ellipse cx="91" cy="170" rx="27" ry="8" fill="#e5cea0"/><ellipse cx="91" cy="170" rx="17" ry="4" stroke="#9b7b4d" strokeWidth="3"/><path d="M64 246h54m-54 5h54" stroke="#a65968" strokeWidth="4"/><path d="M90 249c-30-25-29 21 0 0 29-23 30 24 0 0Zm0 0-9 24m9-24 10 25" stroke="#9e4960" strokeWidth="3"/></g>
                <path d="M62 57h56m-56 9h56M37 197v138c0 12 5 16 16 18M72 83v40c0 29-34 41-35 61" stroke="white" strokeOpacity=".65" strokeWidth="5" strokeLinecap="round"/>
                <path d="M145 207v127M51 364c26 6 55 6 79 0" stroke="#d3fff4" strokeOpacity=".6" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </button>
            <p className="gift-hint" role="status">{gift === "closed" ? "Chạm để nhặt lọ thư trên dòng sông." : gift === "opening" ? "Một lời thương đang được mở ra…" : "Lời thương ở đây, em cứ đọc thật chậm nhé."}</p>
          </div>
          <div id="gift-content" className="gift-content">
            {gift === "open" ? <div className="gift-reveal parchment"><div className="parchment-top" aria-hidden="true"/><div className="parchment-sheet"><Stanza lines={garden.chapters.gratitude.lines} /><div className="childhood"><Photo onOpen={showPhoto} id={6} /><p>Và một Phương<br />bé xíu.</p></div></div><div className="parchment-bottom" aria-hidden="true"/></div> : <div className="gift-waiting"><Rose /><p>Có một lời cảm ơn<br />đang chờ em ở đây.</p></div>}
          </div>
        </div>
        <noscript><Stanza lines={garden.chapters.gratitude.lines} /></noscript>
      </section>

      <section id="binh-an" className="chapter peace secret-garden" aria-labelledby="peace-title">
        <div className="peace-heading"><h2 id="peace-title">{garden.chapters.peace.title}</h2><Rose /></div>
        <Vine className="scene-canopy" /><p className="garden-hint">Giữ và kéo để gạt những bông hoa.</p>
        <div className="discovery-bed"><FlowerField reduced={reduced} />
        <div className="peace-layout"><div className="peace-paper"><Stanza lines={garden.chapters.peace.lines} /></div><Photo onOpen={showPhoto} id={5} /></div></div>
      </section>

      <section id="album" className="chapter album" aria-label="Cuộn phim kỷ niệm">
        <Vine className="scene-canopy" />
        {[0,1].map(row=><div className={`satellite-reel reel-${row}`} aria-hidden="true" key={row}><div>{[3,4,8,1,7,2,3,4].map((id,i)=><span key={i} style={{backgroundImage:`url(/photos/img${id}.webp)`}} />)}</div><Vine /></div>)}
        <div className="album-controls"><button onClick={() => moveGallery(-1)} aria-label="Ảnh trước">←</button><button onClick={() => moveGallery(1)} aria-label="Ảnh tiếp theo">→</button></div>
        <div className="album-track" ref={gallery} tabIndex={0} role="region" aria-label="Kéo cuộn phim hoặc dùng phím mũi tên"
          onPointerDown={e=>{if(e.pointerType==='touch')return;drag.current={down:true,x:e.clientX,left:e.currentTarget.scrollLeft,moved:false};}}
          onPointerMove={e=>{const d=drag.current;if(!d.down)return;const delta=e.clientX-d.x;if(Math.abs(delta)>5){d.moved=true;e.currentTarget.setPointerCapture(e.pointerId);}e.currentTarget.scrollLeft=d.left-delta;}}
          onPointerUp={()=>{drag.current.down=false}} onPointerCancel={()=>{drag.current.down=false}}
          onClickCapture={e=>{if(drag.current.moved){e.preventDefault();e.stopPropagation();drag.current.moved=false;}}}
          onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();moveGallery(e.key==='ArrowRight'?1:-1);}}}>
          {[3,4,8,1,7,2,5,6].map(id=><figure key={id}><Vine className="film-top"/><Photo onOpen={showPhoto} id={id}/><Vine className="film-bottom"/></figure>)}
        </div>
        <p className="album-help">Chạm vào ảnh để xem trọn khoảnh khắc.</p>
      </section>

      <section className="chapter ending" aria-labelledby="ending-title">
        <Vine className="scene-canopy" /><div className="ending-photo"><Photo onOpen={showPhoto} id={8} /><Rose className="ending-rose" /></div>
        <div className="closing-card"><h2 id="ending-title">{garden.chapters.ending.title}</h2><Stanza lines={garden.chapters.ending.lines} /><p className="closing-wish">Chúc Phương một ngày 20/10 thật nhiều niềm vui.</p><button className="button" data-bouquet="true" onClick={() => { setBouquet(true); setBloom(value => value + 1); }}>Nhận thêm một bó hoa</button><p className="bouquet-message" role="status">{bouquet ? "Bó hoa này cũng dành riêng cho em." : ""}</p><button className="text-link" onClick={showLetter}>Đọc lại toàn bộ tâm thư</button></div>
      </section>
    </main>
    {bloom > 0 && <div key={bloom} className="bouquet-storm" aria-hidden="true">{Array.from({length: reduced ? 5 : 18}, (_, i) => <div key={i} className="burst-bouquet" style={{ left: `${(i * 37) % 100}%`, "--flight": `${-15 - (i % 5) * 12}vh`, "--spin": `${i % 2 ? 32 : -32}deg`, animationDelay: `${i % 6 * .13}s` } as React.CSSProperties}><Rose /><Rose /><Rose /><span>୨୧</span></div>)}</div>}
    <footer><span>Chỉ dành cho Phương.</span><a href="#home">Về đầu khu vườn ↑</a></footer>

    <dialog ref={lightbox} className="lightbox" aria-label="Xem ảnh lớn" onClose={closeDialog} onClick={event => { if (event.target === event.currentTarget) lightbox.current?.close(); }} onKeyDown={event => { if (event.key === "ArrowRight") setSelected((selected + 1) % photos.length); if (event.key === "ArrowLeft") setSelected((selected + photos.length - 1) % photos.length); }}>
      <div className="lightbox-top"><span>{selected + 1} / {photos.length}</span><button onClick={() => lightbox.current?.close()} autoFocus>Đóng ×</button></div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={current.original} alt={current.alt} width={current.width} height={current.height} />
      <div className="lightbox-bottom"><button aria-label="Xem ảnh trước" onClick={() => setSelected((selected + photos.length - 1) % photos.length)}>←</button><p>{current.alt}</p><button aria-label="Xem ảnh tiếp theo" onClick={() => setSelected((selected + 1) % photos.length)}>→</button></div>
    </dialog>
    <dialog ref={fullLetter} className="full-letter" aria-labelledby="full-letter-title" onClose={closeDialog} onClick={event => { if (event.target === event.currentTarget) fullLetter.current?.close(); }}>
      <div className="letter-dialog-head"><h2 id="full-letter-title">Love Letter</h2><button onClick={() => fullLetter.current?.close()} autoFocus>Đóng ×</button></div>
      {letterVisible && <div className="original-letter">{letter.map((line, index) => line ? <p key={index}>{line}</p> : <div className="letter-space" key={index} />)}</div>}
    </dialog>
  </>;
}
