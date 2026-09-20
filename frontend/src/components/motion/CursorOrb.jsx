import React, { useEffect, useRef } from 'react';

// Cursor-following gold orb. GPU-only, disabled on touch & reduced motion.
export default function CursorOrb() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;
    let tx = window.innerWidth / 2, ty = window.innerHeight / 2, cx = tx, cy = ty, raf;
    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.transform = `translate3d(${cx - 220}px, ${cy - 220}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed top-0 left-0 h-[440px] w-[440px] rounded-full z-[1] hidden lg:block" style={{
      background: 'radial-gradient(circle, hsla(40, 60%, 62%, 0.22) 0%, hsla(40, 60%, 62%, 0.06) 32%, transparent 60%)',
      filter: 'blur(28px)',
      mixBlendMode: 'screen',
    }} />
  );
}
