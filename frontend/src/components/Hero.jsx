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

    if (!reduce) {
      window.addEventListener('mousemove', onMove, { passive: true });
    }

    apply();

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="top" className="relative isolate min-h-[92vh] overflow-hidden flex items-end">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={HERO_IMAGE}
          alt="Two Sisters Beauty Salon"
          className="h-full w-full object-cover object-[65%_50%] sm:object-center kenburns"
        />

        <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-[hsl(var(--ink))]/95 via-[hsl(var(--ink))]/72 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink))]/90 via-transparent to-[hsl(var(--ink))]/30" />

        <div className="absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-[hsl(var(--gold))]/10 blur-[120px]" />
        <div className="absolute right-[-8%] bottom-[-8%] h-[420px] w-[420px] rounded-full bg-[hsl(var(--gold-deep))]/10 blur-[120px]" />
      </div>

      {/* Floating sparkle */}
      <div
        ref={orbsRef}
        className="pointer-events-none absolute inset-0 -z-[5]"
        style={{ '--mx': '0px', '--my': '0px' }}
      >
        <Sparkles
          className="absolute top-[22%] right-[18%] h-6 w-6 text-[hsl(var(--gold-soft))]/80 animate-floaty"
          style={{
            transform:
              'translate3d(calc(var(--mx)*-1.4),calc(var(--my)*-1.4),0)',
            transition: 'transform 500ms cubic-bezier(0.22,1,0.36,1)',
          }}
        />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-[1240px] w-full px-5 sm:px-6 pt-32 sm:pt-44 pb-20 sm:pb-28 text-white relative z-10">

        <div className="max-w-[900px]">

          {/* Grand Opening Card */}
          <div className="mb-8">
            <div className="rounded-3xl border border-[hsl(var(--gold))]/35 bg-gradient-to-r from-[hsl(var(--ink))]/95 via-[hsl(var(--gold))]/10 to-[hsl(var(--ink))]/95 backdrop-blur-xl p-5 sm:p-8 shadow-[0_25px_70px_-25px_hsl(var(--gold)/0.45)]">

              <div className="flex flex-col items-center text-center gap-3">

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(var(--gold))]/15 border border-[hsl(var(--gold))]/30">
                  <span className="text-lg">🎉</span>
                  <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.35em] text-[hsl(var(--gold-soft))]">
                    Grand Opening
                  </span>
                </div>

                <h2 className="font-display text-[26px] sm:text-[40px] lg:text-[50px] leading-none">
                  We're Opening
                </h2>

                <p className="text-[18px] sm:text-[26px] font-semibold text-[hsl(var(--gold-soft))]">
                  15 October 2026
                </p>

                <div className="h-px w-20 bg-[hsl(var(--gold))]/40" />

                <p className="text-[20px] sm:text-[30px] font-bold">
                  First 100 Clients Receive
                </p>

                <p className="font-display text-[42px] sm:text-[64px] lg:text-[72px] leading-none text-[hsl(var(--gold))]">
                  30% OFF
                </p>

                <p className="text-[15px] sm:text-[18px] text-white/85 max-w-[560px] leading-relaxed">
                  Your first visit during <span className="font-semibold text-[hsl(var(--gold-soft))]">Opening Week.</span> Book early before appointments fill.
                </p>

              </div>
            </div>
          </div>

          {/* Booking Badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-3 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--gold))] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-white/85">
              Now Taking Bookings · Christchurch
            </span>
          </div>

          {/* Heading */}
          <SplitText
            as="h1"
            text="Beauty care that feels personal."
            className="font-display mt-8 text-[clamp(48px,11vw,120px)] leading-[0.94]"
            stagger={55}
          />

          {/* Description */}
          <p className="mt-7 max-w-[620px] text-[16px] sm:text-[19px] leading-[1.65] text-white/80">
            We're opening our doors on <strong>15 October 2026</strong>. Be among our first clients and enjoy calm, personalised beauty care for facials, brows, threading, waxing and nails in our new Christchurch salon.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col sm:flex-row gap-3">

            <MagneticButton
              as="a"
              href={BRAND.bookingUrl}
              target="_blank"
              rel="noreferrer"
              strength={16}
              className="group inline-flex h-14 items-center justify-between gap-3 rounded-full bg-[hsl(var(--gold))] pl-6 pr-2 text-[12px] font-medium uppercase text-[hsl(var(--ink))]"
            >
              <span>Book Your Opening Week Visit</span>

              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[hsl(var(--ink))] text-[hsl(var(--gold))] transition-transform group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </MagneticButton>

            <a
              href="#services"
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/25 px-6 text-[12px] uppercase tracking-[0.18em] text-white/90"
            >
              Explore Services
            </a>

          </div>

          <p className="mt-6 text-[12px] tracking-wide text-white/60">
            Opening 15 October 2026 · Easy online booking · Flexible appointments · Friendly, professional care
          </p>

        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 hairline" />

    </section>
  );
}
