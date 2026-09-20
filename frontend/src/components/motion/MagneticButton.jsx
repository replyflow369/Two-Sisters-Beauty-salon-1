import React, { useRef, useCallback } from 'react';

// Magnetic button: pointer draws a subtle magnetic pull. Adds soft ripple on click.
export default function MagneticButton({ as: Tag = 'a', className = '', strength = 22, children, onClick, ...props }) {
  const ref = useRef(null);
  const wrapRef = useRef(null);

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    const x = (relX / rect.width) * strength;
    const y = (relY / rect.height) * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }, [strength]);

  const onLeave = useCallback(() => {
    const el = ref.current; if (!el) return;
    el.style.transform = 'translate3d(0,0,0)';
  }, []);

  const handleClick = useCallback((e) => {
    const el = wrapRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.4;
      const span = document.createElement('span');
      span.className = 'pointer-events-none absolute rounded-full';
      span.style.width = `${size}px`;
      span.style.height = `${size}px`;
      span.style.left = `${e.clientX - rect.left - size / 2}px`;
      span.style.top = `${e.clientY - rect.top - size / 2}px`;
      span.style.background = 'radial-gradient(circle, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 60%)';
      span.style.transform = 'scale(0)';
      span.style.opacity = '1';
      span.style.transition = 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 900ms ease-out';
      el.appendChild(span);
      requestAnimationFrame(() => { span.style.transform = 'scale(1)'; span.style.opacity = '0'; });
      setTimeout(() => span.remove(), 900);
    }
    if (onClick) onClick(e);
  }, [onClick]);

  return (
    <span ref={wrapRef} className="relative inline-block overflow-hidden rounded-full">
      <Tag
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={handleClick}
        className={`will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${className}`}
        {...props}
      >
        {children}
      </Tag>
    </span>
  );
}
