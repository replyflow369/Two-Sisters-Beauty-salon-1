import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { BRAND, HERO_IMAGE } from '../mock';
import SplitText from './motion/SplitText';
import MagneticButton from './motion/MagneticButton';

export default function Hero() {
  const orbsRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf;
    let mx = 0;
    let my = 0;

    const apply = () => {
      raf = null;
      if (orbsRef.current) {
        orbsRef.current.style.setProperty('--mx', `${mx * 40}px`);
        orbsRef.current.style.setProperty('--my', `${my * 40}px`);
      }
    };

    const onMove = (e) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    if (!reduce) window.addEventListener('mousemove', onMove, { passive: true });
    apply();

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="top" className="relative overflow-hidden isolate min-h-[92vh] flex items-end">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={HERO_IMAGE}
          alt="Two Sisters Beauty Salon"
          className="h-full w-full object-cover object-[65%_50%] sm:object-center kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-[hsl(var(--ink))]/95 via-[hsl(var(--ink))]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink))]/90 via-transparent to-[hsl(var(--ink))]/30" />
      </div>

      {/* Floating sparkles */}
      <div
        ref={orbsRef}
        className="pointer-events-none absolute inset-0 -z-[5]"
        style={{ '--mx': '0px', '--my': '0px' }}
      >
        <Sparkles
          className="absolute top-[22%] right-[18%] h-6 w-6 text-[hsl(var(--gold-soft))]/80 animate-floaty"
          style={{
            transform: 'translate3d(calc(var(--mx)*-1.4),calc(var(--my)*-1.4),0)',
            transition: 'transform 500ms cubic-bezier(0.22,1,0.36,1)',
          }}
        />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 w-full pb-20 sm:pb-28 pt-32 sm:pt-44 text-[hsl(var(--paper))] relative z-[2]">
        <div className="max-w-[900px]">
          {/* 50% Banner */}
          <div className="mb-5 rounded-2xl border border-[hsl(var(--gold))]/40 bg-gradient-to-r from-[hsl(var(--ink))]/95 via-[hsl(var(--gold))]/10 to-[hsl(var(--ink))]/95 px-5 py-4 text-center">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[hsl(var(--gold-soft))]">
              Limited Time
            </p>
            <h3 className="mt-1 text-3xl font-bold text-white">
              50% OFF ALL SERVICES
            </h3>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[hsl(var(--gold-soft))]">
              Ends 21 October
            </p>
          </div>

          {/* Booking badge */}
          <div className="inline-flex items-center gap-3 pl-3 pr-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--gold))] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-white/85">
              Now Taking Bookings · Christchurch
            </span>
          </div>

          <SplitText
            as="h1"
            text="Beauty care that feels personal."
            className="font-display mt-8 text-[clamp(48px,11vw,120px)] leading-[0.94]"
            stagger={55}
          />

          <p className="mt-7 max-w-[600px] text-[16.5px] sm:text-[19px] leading-[1.65] text-white/80">
            A small, considered salon on Stanmore Road. Facials, brows,
            threading, waxing and nails — delivered slowly, by hands that know
            what they are doing.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <MagneticButton
              as="a"
              href={BRAND.bookingUrl}
              target="_blank"
              rel="noreferrer"
              strength={16}
              className="group inline-flex items-center justify-between gap-3 pl-6 pr-2 h-14 rounded-full bg-[hsl(var(--gold))] text-[hsl(var(--ink))] font-medium uppercase text-[12px]"
            >
              <span>Book an appointment</span>
              <span className="h-11 w-11 rounded-full bg-[hsl(var(--ink))] text-[hsl(var(--gold))] inline-flex items-center justify-center group-hover:rotate-45 transition-transform">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </MagneticButton>

            <a
              href="#services"
              className="inline-flex items-center justify-center h-14 px-6 rounded-full border border-white/25 text-[12px] uppercase tracking-[0.18em] text-white/90"
            >
              Explore Services
            </a>
          </div>

          <p className="mt-6 text-[12px] text-white/60 tracking-wide">
            Easy online booking · Flexible appointments · Friendly, professional
            care
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 hairline" />
    </section>
  );
}
