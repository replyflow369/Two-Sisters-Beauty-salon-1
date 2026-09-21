import React, { useEffect, useRef } from 'react';

// Word-by-word reveal with Apple-like stagger. Uses CSS transforms only.
export default function SplitText({ text, as: Tag = 'span', className = '', delay = 0, stagger = 40, wordClassName = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll('[data-word]');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      words.forEach((w) => { w.style.opacity = 1; w.style.transform = 'none'; w.style.filter = 'none'; });
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          words.forEach((w, i) => {
            w.style.transitionDelay = `${delay + i * stagger}ms`;
            w.style.opacity = '1';
            w.style.transform = 'translate3d(0,0,0)';
            w.style.filter = 'blur(0px)';
          });
          io.unobserve(el);
        }
      });
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay, stagger, text]);

  const parts = String(text).split(' ');
  return (
    <Tag ref={ref} className={className}>
      {parts.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden align-baseline" style={{ marginRight: '0.22em' }}>
          <span
            data-word
            className={`inline-block will-change-transform ${wordClassName}`}
            style={{
              opacity: 0,
              transform: 'translate3d(0, 0.9em, 0)',
              filter: 'blur(6px)',
              transition: 'opacity 900ms cubic-bezier(0.22, 1, 0.36, 1), transform 900ms cubic-bezier(0.22, 1, 0.36, 1), filter 900ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >{w}</span>
        </span>
      ))}
    </Tag>
  );
}
