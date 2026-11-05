import React, { useState, useRef, useCallback } from "react";
import { ArrowLeftRight } from "lucide-react";

const ITEMS = [
  {
    key: "brows",
    treatment: "Henna Brows",
    caption: "Softly shaped, tinted and defined for a natural finish.",
    before: "/before-after/before-after-brows-before.png",
    after: "/before-after/before-after-brows-after.png",
  },
  {
    key: "lash",
    treatment: "Lash Lift & Tint",
    caption: "A gentle curl and tint to open the eye — no extensions needed.",
    before: "/before-after/before-after-lash-before.png",
    after: "/before-after/before-after-lash-after.png",
  },
  {
    key: "facial",
    treatment: "Clear Skin Facial",
    caption: "A calm one-hour treatment to cleanse, hydrate and refresh.",
    before: "/before-after/before-after-facial-before.png",
    after: "/before-after/before-after-facial-after.png",
  },
];

function Slider({ item }) {
  const [pos, setPos] = useState(50);
  const wrapRef = useRef(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  const start = (e) => {
    dragging.current = true;
    setFromClientX(e.touches ? e.touches[0].clientX : e.clientX);
  };

  const move = (e) => {
    if (!dragging.current) return;
    setFromClientX(e.touches ? e.touches[0].clientX : e.clientX);
  };

  const end = () => {
    dragging.current = false;
  };

  return (
    <div>
      <div
        ref={wrapRef}
        className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-gray-200 cursor-ew-resize bg-white"
        onMouseDown={start}
        onMouseMove={move}
        onMouseUp={end}
        onMouseLeave={end}
        onTouchStart={start}
        onTouchMove={move}
        onTouchEnd={end}
      >
        <img
          src={item.after}
          alt={`${item.treatment} result after treatment at Two Sisters Beauty Salon Christchurch`}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <img
            src={item.before}
            alt={`${item.treatment} before treatment at Two Sisters Beauty Salon Christchurch`}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
        </div>

        <div
          className="absolute top-0 bottom-0 w-px bg-white"
          style={{ left: `${pos}%` }}
        />

        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-11 w-11 rounded-full bg-white shadow-lg flex items-center justify-center"
          style={{ left: `${pos}%` }}
        >
          <ArrowLeftRight size={18} />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-[11px] uppercase tracking-[0.3em] text-yellow-700">
          {item.treatment}
        </p>

        <p className="mt-2 text-sm text-gray-700 leading-relaxed">
          {item.caption}
        </p>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  return (
    <section id="before-after" className="py-20 bg-white">
      <div className="mx-auto max-w-[1240px] px-5">
        <div className="max-w-[760px] mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-yellow-500" />
            <span className="text-[11px] uppercase tracking-[0.35em] text-yellow-700">
              Before & After
            </span>
          </div>

          <h2 className="font-display text-[clamp(40px,5vw,64px)] leading-none">
            Small changes, <span className="italic">gently made.</span>
          </h2>

          <p className="mt-5 text-gray-600 max-w-[560px]">
            Drag the slider to see the difference. Every treatment is designed
            to look natural—the kind of result people notice, but can never
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
