import React, { useCallback, useRef, useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';

const ITEMS = [
  {
    key: 'brows',
    treatment: 'Henna Brows',
    caption: 'Softly shaped, tinted and defined for a natural finish.',
    before: '/before-after/before-after-brows-before.png',
    after: '/before-after/before-after-brows-after.png',
  },
  {
    key: 'lash',
    treatment: 'Lash Lift & Tint',
    caption: 'A gentle curl and tint to open the eye — no extensions needed.',
    before: '/before-after/before-after-lash-before.png',
    after: '/before-after/before-after-lash-after.png',
  },
  {
    key: 'facial',
    treatment: 'Clear Skin Facial',
    caption: 'A calm one-hour treatment to cleanse, hydrate and refresh.',
    before: '/before-after/before-after-facial-before.png',
    after: '/before-after/before-after-facial-after.png',
  },
];

function Slider({ item }) {
  const [pos, setPos] = useState(50);
  const wrapRef = useRef(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX) => {
    if (!wrapRef.current) return;

    const rect = wrapRef.current.getBoundingClientRect();
    const percent = ((clientX - rect.left) / rect.width) * 100;

    setPos(Math.max(0, Math.min(100, percent)));
  }, []);

  const startDrag = (e) => {
    dragging.current = true;
    updatePosition(e.touches ? e.touches[0].clientX : e.clientX);
  };

  const drag = (e) => {
    if (!dragging.current) return;
    updatePosition(e.touches ? e.touches[0].clientX : e.clientX);
  };

  const stopDrag = () => {
    dragging.current = false;
  };

  return (
    <div className="group">
      <div
        ref={wrapRef}
        className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-white cursor-ew-resize"
        onMouseDown={startDrag}
        onMouseMove={drag}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onTouchStart={startDrag}
        onTouchMove={drag}
        onTouchEnd={stopDrag}
      >
        {/* After */}
        <img
          src={item.after}
          alt={`${item.treatment} after`}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />

        {/* Before */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <img
            src={item.before}
            alt={`${item.treatment} before`}
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
        </div>

        {/* Divider */}
        <div
          className="absolute inset-y-0 w-px bg-white"
          style={{ left: `${pos}%` }}
        />

        {/* Handle */}
        <button
          type="button"
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white shadow-lg ring-1 ring-[hsl(var(--gold))]/40 flex items-center justify-center"
          style={{ left: `${pos}%` }}
        >
          <ArrowLeftRight className="h-5 w-5 text-[hsl(var(--ink))]" />
        </button>

        {/* Labels */}
        <span className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white">
          Before
        </span>

        <span className="absolute top-4 right-4 rounded-full bg-[hsl(var(--gold))] px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-[hsl(var(--ink))]">
          After
        </span>
      </div>

      <div className="mt-5">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[hsl(var(--gold-deep))]">
          {item.treatment}
        </p>

        <p className="mt-2 text-[15px] leading-relaxed text-foreground/85">
          {item.caption}
        </p>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  return (
    <section
      id="before-after"
      className="bg-[hsl(var(--paper))] py-20 sm:py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6">
        <div className="mb-14 max-w-[760px]">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[hsl(var(--gold))]" />
            <span className="text-[11px] uppercase tracking-[0.35em] text-[hsl(var(--gold-deep))]">
              Before & After
            </span>
          </div>

          <h2 className="font-display text-[clamp(40px,5vw,64px)] leading-tight">
            Small changes, <span className="italic">gently made.</span>
          </h2>

          <p className="mt-5 max-w-[560px] text-[16px] text-muted-foreground">
            Drag the slider to see the difference. Every treatment is designed
            to look natural — the kind of result people notice, but can never
            quite place.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item) => (
            <Slider key={item.key} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
