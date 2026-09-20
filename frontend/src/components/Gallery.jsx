import React from 'react';
import { GALLERY } from '../mock';

const spanClass = {
  tall: 'md:row-span-2',
  wide: 'md:col-span-2',
  square: '',
};

export default function Gallery() {
  return (
    <section id="gallery" className="py-28 md:py-36 bg-[hsl(var(--paper))] dark:bg-[hsl(var(--ink-soft))]">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 reveal">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-[hsl(var(--gold))]" />
              <span className="text-[11px] uppercase tracking-[0.35em] text-[hsl(var(--gold-deep))] dark:text-[hsl(var(--gold-soft))]">Inside the salon</span>
            </div>
            <h2 className="font-display text-[clamp(40px,5vw,64px)] leading-[1.02] tracking-tight">A quiet, considered <span className="italic">space.</span></h2>
          </div>
          <p className="text-muted-foreground max-w-[380px]">A small sample of the moments and finishes our clients enjoy every week.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-4" style={{ gridAutoFlow: 'dense' }}>
          {GALLERY.map((g, i) => (
            <figure key={i} className={`reveal group relative overflow-hidden rounded-2xl ${spanClass[g.size] || ''}`} style={{ transitionDelay: `${i*70}ms` }}>
              <img src={g.src} alt={g.tag} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink))]/70 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
              <figcaption className="absolute left-4 bottom-4 text-white text-[11px] uppercase tracking-[0.28em] translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="inline-flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-[hsl(var(--gold-soft))]" /> {g.tag}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
