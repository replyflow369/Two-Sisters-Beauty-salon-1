import React, { useCallback, useRef, useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';

// Comparisons reference plain files in /public/before-after/ so the salon can
// swap real .jpg photos in later without any code change (see README.txt).
const ITEMS = [
  {
    key: 'brows',
    treatment: 'Henna Brows',
    caption: 'Softly shaped, tinted and defined for a natural finish.',
    before: '/before-after/before-after-brows-before.svg',
    after: '/before-after/before-after-brows-after.svg',
  },
  {
    key: 'lash',
    treatment: 'Lash Lift & Tint',
    caption: 'A gentle curl and tint to open the eye — no extensions needed.',
    before: '/before-after/before-after-lash-before.svg',
    after: '/before-after/before-after-lash-after.svg',
  },
  {
    key: 'facial',
    treatment: 'Clear Skin Facial',
    caption: 'A calm one-hour treatment to cleanse, hydrate and refresh.',
    before: '/before-after/before-after-facial-before.svg',
    after: '/before-after/before-after-facial-after.svg',
  },
];

function Slider({ item }) {
  const [pos, setPos] = useState(52); // percentage from left
  const wrapRef = useRef(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX) => {
    const el = wrapRef.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  const onDown = (e) => {
    dragging.current = true;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    setFromClientX(x);
  };
  const onMove = (e) => {
    if (!dragging.current) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    setFromClientX(x);
  };
  const onUp = () => { dragging.current = false; };

  const onKey = (e) => {
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 4));
    if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 4));
  };

  return (
    <div className="reveal group">
      <div
        ref={wrapRef}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border/70 bg-[hsl(var(--paper))] dark:bg-[hsl(var(--ink-soft))] select-none cursor-ew-resize"
        onMouseDown={onDown}
        onMouseMove={onMove}
        onMouseUp={onUp}
        onMouseLeave={onUp}
        onTouchStart={onDown}
        onTouchMove={onMove}
        onTouchEnd={onUp}
      >
        {/* After (base layer) */}
        <img
          src={item.after}
          alt={`${item.treatment} — after`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        {/* Before (clipped by pos) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <img
            src={item.before}
            alt={`${item.treatment} — before`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
        </div>

        {/* Labels */}
        <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.28em] bg-black/60 text-white backdrop-blur-sm">Before</span>
        <span className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.28em] bg-[hsl(var(--gold))] text-[hsl(var(--ink))]">After</span>

        {/* Divider + handle */}
        <div
          className="absolute inset-y-0 w-px bg-white/85 shadow-[0_0_18px_hsl(var(--gold)/0.5)]"
          style={{ left: `${pos}%` }}
        />
        <button
          type="button"
          aria-label={`Drag to compare ${item.treatment}`}
          onKeyDown={onKey}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-white text-[hsl(var(--ink))] flex items-center justify-center shadow-[0_10px_30px_-8px_hsl(var(--ink)/0.4)] ring-1 ring-[hsl(var(--gold))]/50 transition-transform duration-300 group-hover:scale-105"
          style={{ left: `${pos}%` }}
        >
          <ArrowLeftRight className="h-4 w-4" strokeWidth={1.8} />
        </button>
      </div>
      <div className="mt-5">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[hsl(var(--gold-deep))] dark:text-[hsl(var(--gold-soft))]">{item.treatment}</p>
        <p className="mt-2 text-[15px] text-foreground/85 leading-relaxed max-w-[36ch]">{item.caption}</p>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  return (
    <section id="before-after" className="py-20 sm:py-24 md:py-36 bg-[hsl(var(--paper))] dark:bg-[hsl(var(--ink-soft))]">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6">
        <div className="max-w-[760px] mb-14 reveal">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-[hsl(var(--gold))]" />
            <span className="text-[11px] uppercase tracking-[0.35em] text-[hsl(var(--gold-deep))] dark:text-[hsl(var(--gold-soft))]">Before &amp; After</span>
          </div>
          <h2 className="font-display text-[clamp(40px,5vw,64px)] leading-[1.02] tracking-tight">
            Small changes, <span className="italic">gently made.</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-[16px] max-w-[540px]">
            Drag the slider to see the difference. Every treatment is designed to look natural &mdash; the kind of result that people notice, but can never quite place.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
          {ITEMS.map((item) => (
            <Slider key={item.key} item={item} />
          ))}
        </div>

        <p className="mt-12 text-[12px] text-muted-foreground italic text-center max-w-[560px] mx-auto">
          Placeholder images shown. Real photos can be added by dropping .jpg files into <span className="not-italic font-mono text-[11px]">/before-after/</span> using the filenames listed in the README.
        </p>
      </div>
    </section>
  );
}
