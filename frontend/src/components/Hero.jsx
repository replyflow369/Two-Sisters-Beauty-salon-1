import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { BRAND, HERO_IMAGE } from '../mock';
import SplitText from './motion/SplitText';
import MagneticButton from './motion/MagneticButton';

export default function Hero() {
  const orbsRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf; let mx = 0, my = 0;
    const onMove = (e) => {
      const w = window.innerWidth, h = window.innerHeight;
      mx = (e.clientX / w - 0.5);
      my = (e.clientY / h - 0.5);
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const apply = () => {
      raf = null;
      if (orbsRef.current) {
        orbsRef.current.style.setProperty('--mx', `${mx * 40}px`);
        orbsRef.current.style.setProperty('--my', `${my * 40}px`);
      }
    };
    if (!reduce) {
      window.addEventListener('mousemove', onMove, { passive: true });
    }
    apply();
    return () => { window.removeEventListener('mousemove', onMove); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <section id="top" className="relative overflow-hidden isolate min-h-[92vh] flex items-end">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img src={HERO_IMAGE} alt="Two Sisters Beauty Salon interior" className="h-full w-full object-cover object-[65%_50%] sm:object-center will-change-transform kenburns" />
        <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-[hsl(var(--ink))]/95 via-[hsl(var(--ink))]/75 sm:via-[hsl(var(--ink))]/70 to-[hsl(var(--ink))]/60 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink))]/90 via-transparent to-[hsl(var(--ink))]/30" />
        {/* Cinematic vignette */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 55%, transparent 40%, hsla(0,0%,0%,0.55) 100%)' }} />
        <div className="absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-[hsl(var(--gold))]/8 blur-[140px]" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[460px] w-[460px] rounded-full bg-[hsl(var(--gold-deep))]/12 blur-[140px]" />
      </div>

      {/* Floating ornaments with mouse-tracked drift */}
      <div ref={orbsRef} className="pointer-events-none absolute inset-0 -z-[5]" style={{ ['--mx']: '0px', ['--my']: '0px' }}>
        <Sparkles className="absolute top-[22%] right-[18%] h-6 w-6 text-[hsl(var(--gold-soft))]/80 animate-floaty" style={{ transform: 'translate3d(calc(var(--mx) * -1.4), calc(var(--my) * -1.4), 0)', transition: 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)' }} />
        <span className="absolute top-[38%] right-[10%] h-2 w-2 rounded-full bg-[hsl(var(--gold-soft))]/70 animate-floaty" style={{ animationDelay: '1.2s', transform: 'translate3d(calc(var(--mx) * 2), calc(var(--my) * 2), 0)', transition: 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)' }} />
        <span className="absolute top-[62%] right-[28%] h-1.5 w-1.5 rounded-full bg-[hsl(var(--gold))]/70 animate-floaty" style={{ animationDelay: '2.4s', transform: 'translate3d(calc(var(--mx) * -1), calc(var(--my) * -1), 0)', transition: 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)' }} />
        <span className="absolute top-[46%] left-[54%] h-1 w-1 rounded-full bg-[hsl(var(--gold-soft))]/60 animate-floaty" style={{ animationDelay: '.6s', transform: 'translate3d(calc(var(--mx) * 1.8), calc(var(--my) * 1.8), 0)', transition: 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)' }} />
      </div>
        
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 w-full pb-20 sm:pb-28 pt-32 sm:pt-44 text-[hsl(var(--paper))] relative z-[2]">
  <div className="max-w-[900px]">
      <div className="inline-flex items-center gap-3 pl-3 pr-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md reveal">
  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--gold))] shadow-[0_0_0_4px_hsl(var(--gold)/0.2)] animate-pulse" />
  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] sm:tracking-[0.32em] text-white/85">
    {/* Premium Moving Announcement Bar */}
<div className="mb-6 w-full max-w-[900px] overflow-hidden rounded-full border border-[hsl(var(--gold))]/40 bg-gradient-to-r from-[hsl(var(--ink))]/95 via-[hsl(var(--gold))]/15 to-[hsl(var(--ink))]/95 backdrop-blur-md shadow-[0_20px_50px_-20px_hsl(var(--gold)/0.35)]">

  <div className="announcement-track">

    <div className="announcement-content">

      <span>✨</span>
      <span>LIMITED TIME</span>
      <span>•</span>
      <span>50% OFF ALL SERVICES</span>
      <span>•</span>
      <span>BOOK NOW</span>
      <span>•</span>
      <span>ENDS 30 SEPTEMBER</span>
      <span>•</span>

      <span>✨</span>
      <span>LIMITED TIME</span>
      <span>•</span>
      <span>50% OFF ALL SERVICES</span>
      <span>•</span>
      <span>BOOK NOW</span>
      <span>•</span>
      <span>ENDS 30 SEPTEMBER</span>
      <span>•</span>

    </div>

  </div>
</div>
    Now taking bookings · Christchurch
     </span>
</div>
<SplitText
  as="h1"
  text="Beauty care that feels personal."
  className="font-display mt-10 sm:mt-12 text-[clamp(48px,11vw,120px)] leading-[0.98] sm:leading-[0.94] tracking-tight block"
  stagger={55}
/>
          <p className="reveal max-w-[600px] mt-7 sm:mt-10 text-[16.5px] sm:text-[19px] leading-[1.65] text-white/75">
            A small, considered salon on Stanmore Road. Facials, brows, threading, waxing and nails — delivered slowly, by hands that know what they are doing.
          </p>

          <div className="reveal mt-9 sm:mt-12 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4">
            <MagneticButton
              as="a"
              href={BRAND.bookingUrl}
              target="_blank"
              rel="noreferrer"
              strength={16}
              className="group inline-flex items-center justify-between sm:justify-start gap-3 pl-6 pr-2 h-14 rounded-full bg-[hsl(var(--gold))] text-[hsl(var(--ink))] font-medium tracking-[0.14em] uppercase text-[12px] hover:bg-[hsl(var(--gold-soft))] hover:shadow-[0_20px_40px_-15px_hsl(var(--gold)/0.55)]"
            >
              <span>Book an appointment</span>
              <span className="h-11 w-11 rounded-full bg-[hsl(var(--ink))] text-[hsl(var(--gold))] inline-flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45"><ArrowUpRight className="h-4 w-4" /></span>
            </MagneticButton>
            <a href="#services" className="inline-flex items-center justify-center gap-3 h-14 px-6 rounded-full border border-white/25 text-[12px] uppercase tracking-[0.18em] text-white/90 hover:bg-white/10 hover:border-white/50 transition-colors duration-500 active:bg-white/15">Explore services</a>
          </div>

          <p className="reveal mt-6 sm:mt-8 text-[12px] text-white/60 tracking-wide">
            Easy online booking · Flexible appointments · Friendly, professional care
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 hairline" />
    </section>
  );
}
