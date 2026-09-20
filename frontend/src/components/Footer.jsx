import React from 'react';
import { Instagram, Facebook, ArrowUpRight } from 'lucide-react';
import { BRAND, NAV } from '../mock';

export default function Footer() {
  return (
    <footer className="relative bg-[hsl(var(--ink))] text-[hsl(var(--paper))] overflow-hidden">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-[hsl(var(--gold))]/8 blur-[140px]" />

      {/* Big CTA */}
      <div className="relative mx-auto max-w-[1240px] px-6 pt-24 pb-16 border-b border-white/10">
        <div className="grid lg:grid-cols-[1.4fr_.6fr] gap-10 items-end">
          <h3 className="font-display text-[clamp(44px,7vw,96px)] leading-[.98] tracking-tight">
            Beautiful, considered care —<br /><span className="italic text-[hsl(var(--gold-soft))]">book yours today.</span>
          </h3>
          <a href={BRAND.bookingUrl} target="_blank" rel="noreferrer" className="group inline-flex items-center justify-between gap-4 h-16 pl-7 pr-2 rounded-full bg-[hsl(var(--gold))] text-[hsl(var(--ink))] uppercase tracking-[0.16em] font-medium text-[13px] transition-all hover:bg-[hsl(var(--gold-soft))]">
            Book an appointment
            <span className="h-12 w-12 rounded-full bg-[hsl(var(--ink))] text-[hsl(var(--gold))] inline-flex items-center justify-center transition-transform group-hover:rotate-45"><ArrowUpRight className="h-5 w-5" /></span>
          </a>
        </div>
      </div>

      {/* Main */}
      <div className="relative mx-auto max-w-[1240px] px-6 py-16 grid lg:grid-cols-4 gap-10">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <span className="h-11 w-11 rounded-full border border-[hsl(var(--gold))]/60 inline-flex items-center justify-center font-serif italic text-[hsl(var(--gold-soft))]">Ts</span>
            <div>
              <p className="font-display text-2xl leading-none">Two Sisters</p>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[hsl(var(--gold-soft))] mt-1">Beauty Salon</p>
            </div>
          </div>
          <p className="mt-6 text-white/60 max-w-[380px] text-[15px] leading-relaxed">A calm, elegant salon on Stanmore Road offering considered care for skin, brows, face and body.</p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook].map((I, i) => (
              <a key={i} href="#" className="h-10 w-10 rounded-full border border-white/15 inline-flex items-center justify-center hover:bg-white/10 transition"><I className="h-4 w-4" /></a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-[hsl(var(--gold-soft))]">Menu</p>
          <ul className="mt-5 space-y-3 text-[14.5px]">
            {NAV.map(n => <li key={n.href}><a href={n.href} className="text-white/75 hover:text-white link-underline">{n.label}</a></li>)}
          </ul>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-[hsl(var(--gold-soft))]">Salon</p>
          <ul className="mt-5 space-y-3 text-[14.5px] text-white/75">
            <li>{BRAND.address}</li>
            <li><a href={BRAND.phoneHref} className="hover:text-white link-underline">{BRAND.phone}</a></li>
            <li><a href={`mailto:${BRAND.email}`} className="hover:text-white link-underline break-all">{BRAND.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-[1240px] px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-white/50">
          <p>© {new Date().getFullYear()} {BRAND.name} {BRAND.tagline}. All rights reserved.</p>
          <p className="uppercase tracking-[0.28em] text-[10.5px]">Christchurch · New Zealand</p>
        </div>
      </div>
    </footer>
  );
}
