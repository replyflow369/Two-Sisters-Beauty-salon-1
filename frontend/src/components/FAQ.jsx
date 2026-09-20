import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ as ITEMS } from '../mock';

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-28 md:py-36">
      <div className="mx-auto max-w-[1240px] px-6 grid lg:grid-cols-[.9fr_1.1fr] gap-14 lg:gap-24">
        <div className="reveal">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-[hsl(var(--gold))]" />
            <span className="text-[11px] uppercase tracking-[0.35em] text-[hsl(var(--gold-deep))] dark:text-[hsl(var(--gold-soft))]">Questions</span>
          </div>
          <h2 className="font-display text-[clamp(40px,5vw,60px)] leading-[1.02] tracking-tight">Everything you need <span className="italic">to know.</span></h2>
          <p className="mt-6 text-muted-foreground max-w-[420px]">If you can’t find the answer here, we’re always a quick call or email away.</p>
          <a href="#contact" className="mt-8 inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.22em] link-underline">Get in touch →</a>
        </div>
        <div className="reveal divide-y divide-border/70 border-y border-border/70">
          {ITEMS.map((f, i) => {
            const isOpen = open === i;
            return (
              <button key={i} onClick={() => setOpen(isOpen ? -1 : i)} className="w-full text-left py-6 group focus:outline-none">
                <div className="flex items-start justify-between gap-6">
                  <span className={`font-display text-[22px] md:text-[26px] leading-snug transition-colors ${isOpen ? 'text-foreground' : 'text-foreground/85 group-hover:text-foreground'}`}>{f.q}</span>
                  <span className={`mt-1 shrink-0 h-9 w-9 rounded-full border inline-flex items-center justify-center transition-all ${isOpen ? 'bg-[hsl(var(--ink))] text-[hsl(var(--paper))] border-[hsl(var(--ink))] dark:bg-[hsl(var(--gold))] dark:text-[hsl(var(--ink))] dark:border-[hsl(var(--gold))]' : 'border-border/70 text-foreground/70'}`}>
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </div>
                <div className={`grid transition-all duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="text-muted-foreground text-[15.5px] leading-relaxed max-w-[560px]">{f.a}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
