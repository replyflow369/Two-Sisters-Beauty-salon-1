import React from 'react';
import { Check } from 'lucide-react';
import { BRAND } from '../mock';

const POINTS = [
  'Experienced, friendly service',
  'Clean and comfortable treatment rooms',
  'Skin-friendly professional products',
  'Clear, upfront pricing',
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 sm:py-24 md:py-36 bg-[hsl(var(--ink))] text-[hsl(var(--paper))] overflow-hidden">
      {/* Ornamental */}
      <div className="absolute -top-32 -right-32 h-[520px] w-[520px] rounded-full bg-[hsl(var(--gold))]/10 blur-[140px]" />
      <div className="absolute bottom-0 left-0 h-[360px] w-[360px] rounded-full bg-[hsl(var(--gold-deep))]/20 blur-[140px]" />

      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-6 grid lg:grid-cols-[1.2fr_.8fr] gap-16 items-center">
        <div>
          <div className="flex items-center gap-3 mb-6 reveal">
            <span className="h-px w-10 bg-[hsl(var(--gold-soft))]" />
            <span className="text-[11px] uppercase tracking-[0.35em] text-[hsl(var(--gold-soft))]">Why choose us</span>
          </div>
          <h2 className="reveal font-display text-[clamp(40px,5vw,72px)] leading-[1.02] tracking-tight">
            Considered beauty care in an <span className="italic text-[hsl(var(--gold-soft))]">elegant salon</span> setting.
          </h2>
          <p className="reveal mt-8 text-white/75 text-[17px] max-w-[540px] leading-relaxed">
            Two Sisters Beauty Salon is designed to feel calm, clean and welcoming. Every client receives thoughtful care, honest recommendations and professional attention.
          </p>
          <ul className="reveal mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[15px] text-white/90">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold-soft))]"><Check className="h-3 w-3" strokeWidth={2.5} /></span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Card */}
        <div className="reveal relative rounded-3xl border border-[hsl(var(--gold))]/40 bg-gradient-to-br from-[hsl(var(--ink-soft))] to-[hsl(var(--ink))] p-10 md:p-12 overflow-hidden">
          <div className="absolute inset-0 noise" />
          <div className="relative">
            <span className="font-serif text-[hsl(var(--gold-soft))] text-6xl leading-none">“</span>
            <p className="font-display text-[26px] md:text-[32px] leading-snug -mt-4">
              Our goal is simple — help every client leave feeling fresh, confident and beautifully cared for.
            </p>
            <div className="mt-10 flex items-center gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[hsl(var(--gold))]/40 font-serif italic text-[hsl(var(--gold-soft))]">Ts</span>
              <div>
                <p className="font-medium">{BRAND.name} {BRAND.tagline}</p>
                <p className="text-white/60 text-[13px]">Christchurch, New Zealand</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
