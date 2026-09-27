import React, { useEffect, useRef } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { BRAND, HERO_IMAGE } from "../mock";
import SplitText from "./motion/SplitText";
import MagneticButton from "./motion/MagneticButton";

export default function Hero() {
  const orbsRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf;
    let mx = 0;
    let my = 0;

    const apply = () => {
      raf = null;
      if (orbsRef.current) {
        orbsRef.current.style.setProperty("--mx", `${mx * 40}px`);
        orbsRef.current.style.setProperty("--my", `${my * 40}px`);
      }
    };

    const onMove = (e) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    if (!reduce) {
      window.addEventListener("mousemove", onMove, { passive: true });
    }

    apply();

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative isolate min-h-[92vh] overflow-hidden flex items-end"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={HERO_IMAGE}
          alt="Two Sisters Beauty Salon"
          className="h-full w-full object-cover object-[65%_50%] sm:object-center kenburns"
        />

        <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-[hsl(var(--ink))]/95 via-[hsl(var(--ink))]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink))]/90 via-transparent to-[hsl(var(--ink))]/30" />

        <div className="absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-[hsl(var(--gold))]/8 blur-[140px]" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[460px] w-[460px] rounded-full bg-[hsl(var(--gold-deep))]/12 blur-[140px]" />
      </div>

      {/* Floating sparkle */}
      <div
        ref={orbsRef}
        className="pointer-events-none absolute inset-0 -z-[5]"
        style={{ "--mx": "0px", "--my": "0px" }}
      >
        <Sparkles
          className="absolute top-[22%] right-[18%] h-6 w-6 text-[hsl(var(--gold-soft))]/80 animate-floaty"
          style={{
            transform:
              "translate3d(calc(var(--mx) * -1.4), calc(var(--my) * -1.4), 0)",
            transition: "transform 500ms cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-[1240px] w-full px-5 sm:px-6 pb-20 sm:pb-28 pt-32 sm:pt-44 text-[hsl(var(--paper))] relative z-10">

        <div className="max-w-[900px]">

          {/* Announcement */}
          <div className="mb-6 w-full">

            {/* Desktop scrolling */}
            <div className="hidden sm:block overflow-hidden rounded-2xl border border-[hsl(var(--gold))]/35 bg-gradient-to-r from-[hsl(var(--ink))]/95 via-[hsl(var(--gold))]/10 to-[hsl(var(--ink))]/95 backdrop-blur-md shadow-[0_18px_45px_-18px_hsl(var(--gold)/0.35)]">

              <div className="announcement-track">
                <div className="announcement-content">

                  <span>🎉</span>
                  <span>GRAND OPENING</span>
                  <span>•</span>
                  <span>15 OCTOBER 2026</span>
                  <span>•</span>
                  <span>FIRST 100 CLIENTS RECEIVE 30% OFF</span>
                  <span>•</span>
                  <span>OPENING WEEK OFFER</span>
                  <span>•</span>
                  <span>BOOK NOW</span>

                  <span>🎉</span>
                  <span>GRAND OPENING</span>
                  <span>•</span>
                  <span>15 OCTOBER 2026</span>
                  <span>•</span>
                  <span>FIRST 100 CLIENTS RECEIVE 30% OFF</span>
                  <span>•</span>
                  <span>OPENING WEEK OFFER</span>
                  <span>•</span>
                  <span>BOOK NOW</span>

                </div>
              </div>
            </div>

            {/* Mobile premium card */}
            <div className="sm:hidden rounded-2xl border border-[hsl(var(--gold))]/40 bg-gradient-to-r from-[hsl(var(--ink))]/95 via-[hsl(var(--gold))]/10 to-[hsl(var(--ink))]/95 backdrop-blur-md px-5 py-5 text-center shadow-[0_18px_45px_-18px_hsl(var(--gold)/0.35)]">

              <p className="text-[11px] uppercase tracking-[0.28em] text-[hsl(var(--gold-soft))]">
                Grand Opening
              </p>

              <h3 className="mt-2 font-display text-[28px] leading-none text-white">
                15 October 2026
              </h3>

              <p className="mt-3 text-[15px] leading-relaxed text-white/90">
                First <strong>100 clients receive 30% OFF</strong> their first
                visit during Opening Week.
              </p>

              <p className="mt-3 text-[12px] uppercase tracking-[0.18em] text-[hsl(var(--gold-soft))]">
                Book now before appointments fill.
              </p>

            </div>

          </div>

          {/* Booking badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-4 py-2">

            <span className="h-2 w-2 rounded-full bg-[hsl(var(--gold))] animate-pulse" />

            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-white/85">
              Now Taking Bookings · Christchurch
            </span>

          </div>

          {/* Heading */}
          <SplitText
            as="h1"
            text="Beauty care that feels personal."
            className="font-display mt-8 sm:mt-10 text-[clamp(48px,11vw,120px)] leading-[0.94] tracking-tight"
            stagger={55}
          />

          {/* Paragraph */}
          <p className="mt-7 sm:mt-10 max-w-[620px] text-[16.5px] sm:text-[19px] leading-[1.7] text-white/82">
            We're opening our doors on <strong>15 October 2026</strong>.
            Be among our first 100 clients and enjoy{" "}
            <strong>30% off your first visit</strong> during Opening Week for
            facials, brows, threading, waxing and nails.
          </p>

          {/* Buttons */}
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-3">

            <MagneticButton
              as="a"
              href={BRAND.bookingUrl}
              target="_blank"
              rel="noreferrer"
              strength={16}
              className="group inline-flex h-14 items-center justify-between rounded-full bg-[hsl(var(--gold))] pl-6 pr-2 text-[12px] font-medium uppercase tracking-[0.14em] text-[hsl(var(--ink))] hover:bg-[hsl(var(--gold-soft))] hover:shadow-[0_20px_40px_-15px_hsl(var(--gold)/0.55)]"
            >
              <span>Book an Appointment</span>

              <span className="ml-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[hsl(var(--ink))] text-[hsl(var(--gold))] transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </MagneticButton>

            <a
              href="#services"
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/25 px-6 text-[12px] uppercase tracking-[0.18em] text-white/90 hover:bg-white/10 hover:border-white/50 transition-colors"
            >
              Explore Services
            </a>

          </div>

          <p className="mt-6 text-[12px] tracking-wide text-white/60">
            Easy online booking · Flexible appointments · Friendly, professional care
          </p>

        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 hairline" />
    </section>
  );
}
