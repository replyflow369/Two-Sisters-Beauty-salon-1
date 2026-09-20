import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Sparkles, Star } from 'lucide-react';
import { BRAND, HERO_IMAGE } from '../mock';
import SplitText from './motion/SplitText';
import MagneticButton from './motion/MagneticButton';

export default function Hero() {
  const parallaxRef = useRef(null);
  const orbsRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf; let sy = 0; let mx = 0, my = 0;
    const onScroll = () => { sy = window.scrollY; if (!raf) raf = requestAnimationFrame(apply); };
    const onMove = (e) => {
      const w = window.innerWidth, h = window.innerHeight;
      mx = (e.clientX / w - 0.5);
      my = (e.clientY / h - 0.5);
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const apply = () => {
      raf = null;
      if (parallaxRef.current) {
        const scale = 1.08 + Math.min(sy / 4000, 0.06);
        parallaxRef.current.style.transform = `translate3d(${mx * 12}px, ${sy * 0.22 + my * 10}px, 0) scale(${scale})`;
      }
      if (orbsRef.current) {
        orbsRef.current.style.setProperty('--mx', `${mx * 40}px`);
        orbsRef.current.style.setProperty('--my', `${my * 40}px`);
      }
    };
    if (!reduce) {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('mousemove', onMove, { passive: true });
    }
    apply();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('mousemove', onMove); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <section id="top" className="relative overflow-hidden isolate min-h-[92vh] flex items-end">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img ref={parallaxRef} src={HERO_IMAGE} alt="Two Sisters Beauty Salon interior" className="h-full w-full object-cover will-change-transform" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--ink))]/95 via-[hsl(var(--ink))]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink))]/90 via-transparent to-[hsl(var(--ink))]/30" />
        <div className="absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-[hsl(var(--gold))]/15 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[460px] w-[460px] rounded-full bg-[hsl(var(--gold-deep))]/20 blur-[120px]" />
      </div>

      {/* Floating ornaments with mouse-tracked drift */}
      <div ref={orbsRef} className="pointer-events-none absolute inset-0 -z-[5]" style={{ ['--mx']: '0px', ['--my']: '0px' }}>
        <Sparkles className="absolute top-[22%] right-[18%] h-6 w-6 text-[hsl(var(--gold-soft))]/80 animate-floaty" style={{ transform: 'translate3d(calc(var(--mx) * -1.4), calc(var(--my) * -1.4), 0)', transition: 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)' }} />
        <span className="absolute top-[38%] right-[10%] h-2 w-2 rounded-full bg-[hsl(var(--gold-soft))]/70 animate-floaty" style={{ animationDelay: '1.2s', transform: 'translate3d(calc(var(--mx) * 2), calc(var(--my) * 2), 0)', transition: 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)' }} />
        <span className="absolute top-[62%] right-[28%] h-1.5 w-1.5 rounded-full bg-[hsl(var(--gold))]/70 animate-floaty" style={{ animationDelay: '2.4s', transform: 'translate3d(calc(var(--mx) * -1), calc(var(--my) * -1), 0)', transition: 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)' }} />
        <span className="absolute top-[46%] left-[54%] h-1 w-1 rounded-full bg-[hsl(var(--gold-soft))]/60 animate-floaty" style={{ animationDelay: '.6s', transform: 'translate3d(calc(var(--mx) * 1.8), calc(var(--my) * 1.8), 0)', transition: 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)' }} />
      </div>

      <div className="mx-auto max-w-[1240px] px-6 w-full pb-24 pt-40 text-[hsl(var(--paper))] relative z-[2]">
        <div className="max-w-[820px]">
          <div className="inline-flex items-center gap-3 pl-3 pr-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md reveal">
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--gold))] shadow-[0_0_0_4px_hsl(var(--gold)/0.2)] animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.32em] text-white/85">Now taking bookings · Christchurch</span>
          </div>

          <SplitText
            as="h1"
            text="Beauty care that feels personal."
            className="font-display mt-8 text-[clamp(56px,8vw,104px)] leading-[0.95] tracking-tight block"
            stagger={60}
          />

          <p className="reveal max-w-[560px] mt-8 text-[18px] leading-relaxed text-white/80">
            Considered treatments delivered by experienced hands — in a calm, elegant salon on Stanmore Road. Facials, brows, threading, waxing, nails and more.
          </p>

          <div className="reveal mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton
              as="a"
              href={BRAND.bookingUrl}
              target="_blank"
              rel="noreferrer"
              strength={16}
              className="group inline-flex items-center gap-3 pl-6 pr-2 h-14 rounded-full bg-[hsl(var(--gold))] text-[hsl(var(--ink))] font-medium tracking-[0.14em] uppercase text-[12px] hover:bg-[hsl(var(--gold-soft))] hover:shadow-[0_20px_40px_-15px_hsl(var(--gold)/0.6)]"
            >
              Book an appointment
              <span className="h-11 w-11 rounded-full bg-[hsl(var(--ink))] text-[hsl(var(--gold))] inline-flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45"><ArrowUpRight className="h-4 w-4" /></span>
            </MagneticButton>
            <a href="#services" className="inline-flex items-center gap-3 h-14 px-6 rounded-full border border-white/25 text-[12px] uppercase tracking-[0.18em] text-white/90 hover:bg-white/10 hover:border-white/50 transition-colors duration-500">Explore services</a>
          </div>

          <div className="reveal mt-14 inline-flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-lg px-6 py-4">
            <div className="flex -space-x-2">
              {[0,1,2].map(i => (
                <span key={i} className="h-9 w-9 rounded-full ring-2 ring-[hsl(var(--ink))] bg-gradient-to-br from-[hsl(var(--gold-soft))] to-[hsl(var(--gold-deep))]" />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-[hsl(var(--gold-soft))]">
                {[...Array(5)].map((_,i)=>(<Star key={i} className="h-3.5 w-3.5 fill-current" />))}
              </div>
              <p className="text-[13px] text-white/85 mt-1"><b className="text-white">4.9 / 5</b> · loved by 6,800+ locals</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 hairline" />
    </section>
  );
}
