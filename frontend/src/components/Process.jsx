import React from 'react';
import { PROCESS } from '../mock';

export default function Process() {
  return (
    <section className="py-28 md:py-36">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="max-w-[680px] mb-16 reveal">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-[hsl(var(--gold))]" />
            <span className="text-[11px] uppercase tracking-[0.35em] text-[hsl(var(--gold-deep))] dark:text-[hsl(var(--gold-soft))]">The experience</span>
          </div>
          <h2 className="font-display text-[clamp(40px,5vw,64px)] leading-[1.02] tracking-tight">
            From welcome to <span className="italic">aftercare</span>.
          </h2>
          <p className="mt-6 text-muted-foreground max-w-[520px] text-[16px]">Four unhurried steps designed to make every visit feel effortless and personal.</p>
        </div>

        <div className="relative grid md:grid-cols-4 gap-6">
          {/* connector line */}
          <div className="hidden md:block absolute top-[46px] left-8 right-8 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold))]/50 to-transparent" />
          {PROCESS.map((p, i) => (
            <div key={p.step} className="reveal relative rounded-2xl border border-border/70 bg-card p-7 group hover:-translate-y-1 hover:shadow-[0_25px_50px_-25px_hsl(var(--ink)/0.25)] transition-all" style={{ transitionDelay: `${i*80}ms` }}>
              <span className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-background border border-[hsl(var(--gold))]/60 font-display text-[hsl(var(--gold-deep))] dark:text-[hsl(var(--gold-soft))] text-lg">{p.step}</span>
              <h3 className="font-display text-[26px] mt-6">{p.title}</h3>
              <p className="text-muted-foreground text-[14.5px] mt-3 leading-relaxed">{p.copy}</p>
              <span className="absolute right-6 bottom-6 h-1.5 w-1.5 rounded-full bg-[hsl(var(--gold))]/70 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
