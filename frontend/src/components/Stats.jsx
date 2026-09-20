import React, { useEffect, useRef, useState } from 'react';
import { STATS } from '../mock';

function useCountUp(target, decimals = 0) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(target * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target]);
  return [ref, decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString()];
}

function Stat({ item }) {
  const [ref, display] = useCountUp(item.value, item.decimals || 0);
  return (
    <div ref={ref} className="reveal text-center md:text-left">
      <div className="font-display text-[64px] md:text-[84px] leading-none tracking-tight">
        {display}<span className="text-[hsl(var(--gold-deep))] dark:text-[hsl(var(--gold))]">{item.suffix}</span>
      </div>
      <p className="mt-3 text-[13px] uppercase tracking-[0.3em] text-muted-foreground">{item.label}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="py-24 md:py-32 border-y border-border/60">
      <div className="mx-auto max-w-[1240px] px-6 grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
        {STATS.map((s) => <Stat key={s.label} item={s} />)}
      </div>
    </section>
  );
}
