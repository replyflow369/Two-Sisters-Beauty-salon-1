import React, { useRef } from 'react';

// 3D tilt card with glare. Respects reduced motion & touch.
export default function TiltCard({ className = '', children, max = 6, glare = true, style = {}, ...props }) {
  const ref = useRef(null);
  const glareRef = useRef(null);

  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * (max * 2);
    const ry = (px - 0.5) * (max * 2);
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translate3d(0,-4px,0)`;
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(600px circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.10), rgba(255,255,255,0) 45%)`;
    }
  };

  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translate3d(0,0,0)';
    if (glareRef.current) glareRef.current.style.background = 'transparent';
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={style}
      className={`relative will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${className}`}
      {...props}
    >
      {children}
      {glare && (
        <span ref={glareRef} aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] transition-[background] duration-300" />
      )}
    </div>
  );
}
