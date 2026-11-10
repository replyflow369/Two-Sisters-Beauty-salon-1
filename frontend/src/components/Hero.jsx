
import React from 'react';
import { ArrowUpRight, Sparkles, Phone, MapPin } from 'lucide-react';
import { BRAND, HERO_IMAGE } from '../mock';
import SplitText from './motion/SplitText';
import MagneticButton from './motion/MagneticButton';

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[92vh] overflow-hidden flex items-end"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={HERO_IMAGE}
          alt="Interior of Two Sisters Beauty Salon in Christchurch"
          className="h-full w-full object-cover object-[65%_50%] sm:object-center kenburns"
        />

        <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-[hsl(var(--ink))]/95 via-[hsl(var(--ink))]/72 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink))]/90 via-transparent to-[hsl(var(--ink))]/30" />

        <div className="absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-[hsl(var(--gold))]/10 blur-[120px]" />

        <div className="absolute right-[-8%] bottom-[-8%] h-[420px] w-[420px] rounded-full bg-[hsl(var(--gold-deep))]/10 blur-[120px]" />
      </div>

      {/* Decorative sparkle */}
      <div className="pointer-events-none absolute inset-0 -z-[5]">
        <Sparkles
          className="absolute top-[22%] right-[18%] h-6 w-6 text-[hsl(var(--gold-soft))]/80 animate-floaty"
          aria-hidden="true"
        />
      </div>

      {/* Hero content */}
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 pt-8 pb-20 text-white sm:px-6 sm:pt-12 sm:pb-28">
        <div className="max-w-[900px]">
          
          
{/* Salon Contact Details */}
<div className="mb-7 flex flex-col gap-4 rounded-2xl border border-white/20 bg-black/30 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">

  {/* Phone Number */}
  <a
    href="tel:+6439300449"
    className="flex items-center gap-3 text-white transition-colors hover:text-[hsl(var(--gold))]"
  >
    <Phone className="h-5 w-5 shrink-0 text-[hsl(var(--gold))]" />

    <div>
      <span className="block text-[10px] uppercase tracking-[0.25em] text-white/60">
        Call Us
      </span>
      <span className="text-base font-semibold tracking-wider">
        03 930 0449
      </span>
    </div>
  </a>

  {/* Salon Address */}
  <a
    href="https://www.google.com/maps/search/?api=1&query=327+Stanmore+Road%2C+Richmond%2C+Christchurch%2C+New+Zealand"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 text-white transition-colors hover:text-[hsl(var(--gold))]"
  >
    <MapPin className="h-5 w-5 shrink-0 text-[hsl(var(--gold))]" />

    <div>
      <span className="block text-[10px] uppercase tracking-[0.25em] text-white/60">
        Visit Our Salon
      </span>
      <span className="text-sm font-semibold">
        327 Stanmore Road, Richmond
      </span>
      <span className="block text-xs text-white/65">
        Christchurch · Near Richmond Club
      </span>
    </div>
  </a>

</div>


          {/* Booking badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-3 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--gold))]" />

            <span className="text-[10px] uppercase tracking-[0.32em] text-white/85 sm:text-[11px]">
              Christchurch Beauty Salon · Bookings Available
            </span>
          </div>

          {/* SEO Heading */}
          <SplitText
            as="h1"
            text="Beauty Salon in Christchurch for Beautiful, Personalised Care."
            className="mt-8 font-display text-[clamp(42px,9vw,100px)] leading-[0.98]"
            stagger={55}
          />

          {/* Homepage introduction */}
          <p className="mt-7 max-w-[650px] text-[16px] leading-[1.65] text-white/80 sm:text-[19px]">
            Welcome to Two Sisters Beauty Salon in Christchurch.
            Enjoy personalised beauty treatments, including
            relaxing facials, professional eyebrow threading,
            eyebrow tinting, waxing, manicures and pedicures.
            Discover your new favourite place for beauty and
            self-care. Book your appointment online today.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <MagneticButton
              as="a"
              href={BRAND.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              strength={16}
              className="group inline-flex h-14 items-center justify-between gap-3 rounded-full bg-[hsl(var(--gold))] pl-6 pr-2 text-[12px] font-medium uppercase text-[hsl(var(--ink))]"
            >
              <span>Book Your Appointment</span>

              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[hsl(var(--ink))] text-[hsl(var(--gold))] transition-transform group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </MagneticButton>

            <a
              href="#services"
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/25 px-6 text-[12px] uppercase tracking-[0.18em] text-white/90"
            >
              Explore Our Services
            </a>
          </div>

          {/* Supporting text */}
          <p className="mt-6 text-[12px] tracking-wide text-white/60">
            Christchurch · Online Booking · Personalised Beauty Care
          </p>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 hairline" />
    </section>
  );
}
