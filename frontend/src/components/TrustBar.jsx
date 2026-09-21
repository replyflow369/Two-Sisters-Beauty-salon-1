import React from 'react';
import { TRUST } from '../mock';

const VALUES = [
  'Considered beauty care',
  'Independent · family-run',
  'Est. 2012 · Christchurch',
  'Skin-friendly products',
  'Clear, upfront pricing',
  'Unhurried appointments',
];

export default function TrustBar() {
  return (
    <section className="relative bg-[hsl(var(--cream))] dark:bg-[hsl(var(--ink-soft))] border-y border-border/60">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/60">
          {TRUST.map((t, i) => (
            <div key={t.title} className="reveal group flex items-start gap-4 p-6 md:p-8 first:pl-0 last:pr-0" style={{ transitionDelay: `${i*80}ms` }}>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--gold))]/50 text-[hsl(var(--gold-deep))] dark:text-[hsl(var(--gold-soft))] transition-transform group-hover:rotate-6">
                <t.icon className="h-4 w-4" />
              </span>
              <div>
                <p className="font-medium text-[15px]">{t.title}</p>
                <p className="text-[13px] text-muted-foreground mt-1">{t.copy}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Signature values marquee — honest, not invented press mentions */}
        <div className="py-8 border-t border-border/60 overflow-hidden">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-[hsl(var(--gold))]/60" />
            <span className="text-[10.5px] uppercase tracking-[0.35em] text-muted-foreground">What we stand for</span>
            <span className="h-1 w-1 rounded-full bg-[hsl(var(--gold))]" />
          </div>
          <div className="relative marquee-mask">
            <div className="flex gap-14 whitespace-nowrap marquee-track opacity-80">
              {[...VALUES, ...VALUES].map((n, i) => (
                <span key={`${n}-${i}`} className="flex items-center gap-14">
                  <span className="font-display text-2xl md:text-3xl italic text-foreground/75">{n}</span>
                  <span className="inline-block h-1 w-1 rounded-full bg-[hsl(var(--gold))]/70" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
