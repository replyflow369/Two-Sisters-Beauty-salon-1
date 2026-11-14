
import React from 'react';
import { ArrowUpRight, Phone, CalendarCheck } from 'lucide-react';
import { BRAND } from '../mock';

export default function Booking() {
  return (
    <section
      id="booking"
      className="relative overflow-hidden bg-[hsl(var(--ink-soft))] py-20 text-[hsl(var(--paper))] sm:py-24 md:py-36 grain"
    >
      <div className="absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-[hsl(var(--gold))]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-[1000px] px-5 text-center sm:px-6">

        <div className="mb-6 inline-flex items-center gap-3">
          <span className="h-px w-10 bg-[hsl(var(--gold-soft))]" />
          <span className="text-[11px] uppercase tracking-[0.35em] text-[hsl(var(--gold-soft))]">
            Book your visit
          </span>
          <span className="h-px w-10 bg-[hsl(var(--gold-soft))]" />
        </div>

        <h2 className="font-display text-[clamp(40px,6vw,68px)] leading-[1.02]">
          Ready to feel{' '}
          <span className="italic text-[hsl(var(--gold-soft))]">
            refreshed?
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-[600px] text-[16px] leading-relaxed text-white/70 sm:text-[19px]">
          Choose your treatment, explore available appointment times
          and book directly with Two Sisters Beauty Salon.
        </p>

        <a
          href={BRAND.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex h-14 items-center justify-center gap-4 rounded-full bg-[hsl(var(--gold))] px-7 text-[12px] font-medium uppercase tracking-[0.14em] text-[hsl(var(--ink))] transition-all hover:-translate-y-1 hover:bg-[hsl(var(--gold-soft))]"
        >
          <CalendarCheck className="h-5 w-5" />
          Book your appointment
          <ArrowUpRight className="h-4 w-4" />
        </a>

        <p className="mt-8 text-[13px] text-white/55">
          Prefer to call?
        </p>

        <a
          href={BRAND.phoneHref}
          className="mt-2 inline-flex items-center gap-2 text-lg font-semibold text-[hsl(var(--gold-soft))] hover:text-white"
        >
          <Phone className="h-4 w-4" />
          {BRAND.phone}
        </a>

        <p className="mt-8 text-[12px] tracking-wide text-white/45">
          Two Sisters Beauty Salon · Richmond, Christchurch
        </p>
      </div>
    </section>
  );
}
