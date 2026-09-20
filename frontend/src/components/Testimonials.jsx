import React, { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../mock';

export default function Testimonials() {
  const [i, setI] = useState(0);
  const timer = useRef(null);
  useEffect(() => {
    timer.current = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 6500);
    return () => clearInterval(timer.current);
  }, []);
  const t = TESTIMONIALS[i];

  return (
    <section id="reviews" className="relative py-28 md:py-36 overflow-hidden bg-[hsl(var(--ink))] text-[hsl(var(--paper))]">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[520px] w-[720px] rounded-full bg-[hsl(var(--gold))]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-[1240px] px-6">
        <div className="text-center mb-16 reveal">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-10 bg-[hsl(var(--gold-soft))]" />
            <span className="text-[11px] uppercase tracking-[0.35em] text-[hsl(var(--gold-soft))]">Loved locally</span>
            <span className="h-px w-10 bg-[hsl(var(--gold-soft))]" />
          </div>
          <h2 className="font-display text-[clamp(40px,5vw,64px)] leading-[1.02] tracking-tight">Words from our <span className="italic text-[hsl(var(--gold-soft))]">clients.</span></h2>
        </div>

        <div className="reveal grid md:grid-cols-[.6fr_1fr] gap-10 md:gap-16 items-center max-w-[1080px] mx-auto">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10">
            <img key={t.avatar} src={t.avatar} alt={t.name} className="h-full w-full object-cover transition-all duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink))]/70 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-1 text-[hsl(var(--gold-soft))]">
                {[...Array(t.rating)].map((_,k)=>(<Star key={k} className="h-3.5 w-3.5 fill-current" />))}
              </div>
              <p className="mt-2 font-medium">{t.name}</p>
              <p className="text-white/70 text-[13px]">{t.role}</p>
            </div>
          </div>

          <div>
            <span className="font-serif text-[hsl(var(--gold-soft))] text-8xl leading-none block">“</span>
            <p key={t.quote} className="font-display text-[28px] md:text-[40px] leading-[1.15] -mt-4">{t.quote}</p>
            <div className="mt-10 flex items-center gap-6">
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, k) => (
                  <button key={k} onClick={() => setI(k)} aria-label={`Show review ${k+1}`} className={`h-1.5 rounded-full transition-all ${k===i? 'w-8 bg-[hsl(var(--gold))]' : 'w-4 bg-white/25 hover:bg-white/50'}`} />
                ))}
              </div>
              <div className="flex gap-2 ml-auto">
                <button onClick={() => setI((i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="h-11 w-11 rounded-full border border-white/20 inline-flex items-center justify-center hover:bg-white/10 transition"><ChevronLeft className="h-4 w-4" /></button>
                <button onClick={() => setI((i + 1) % TESTIMONIALS.length)} className="h-11 w-11 rounded-full border border-white/20 inline-flex items-center justify-center hover:bg-white/10 transition"><ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
