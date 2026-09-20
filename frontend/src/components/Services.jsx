import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../mock';

export default function Services() {
  return (
    <section id="services" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 reveal">
          <div className="max-w-[720px]">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-[hsl(var(--gold))]" />
              <span className="text-[11px] uppercase tracking-[0.35em] text-[hsl(var(--gold-deep))] dark:text-[hsl(var(--gold-soft))]">Our services</span>
            </div>
            <h2 className="font-display text-[clamp(40px,5vw,68px)] leading-[1.02] tracking-tight">
              Everything you need to <span className="italic">feel refreshed.</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-[16px] max-w-[420px]">Focused beauty care for skin, brows, face and body — delivered with an unhurried attention to detail.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <a href="#pricing" key={s.key} className="reveal group relative overflow-hidden rounded-2xl border border-border/70 bg-card p-8 min-h-[340px] flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-25px_hsl(var(--ink)/0.25)] hover:border-[hsl(var(--gold))]/50" style={{ transitionDelay: `${i*60}ms` }}>
              {/* Corner image */}
              <div className="absolute -top-6 -right-6 h-40 w-40 rounded-full overflow-hidden opacity-40 group-hover:opacity-90 transition-all duration-700 group-hover:scale-110">
                <img src={s.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[hsl(var(--ink))]/40 to-transparent" />
              </div>
              <div className="relative">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[hsl(var(--gold))]/60 bg-[hsl(var(--gold))]/5 text-[hsl(var(--gold-deep))] dark:text-[hsl(var(--gold-soft))] transition-all group-hover:rotate-6">
                  <s.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <h3 className="font-display text-[32px] leading-tight mt-6">{s.title}</h3>
                <p className="text-muted-foreground text-[15px] mt-3 max-w-[260px]">{s.copy}</p>
              </div>
              <div className="relative mt-6 flex items-center justify-between">
                <span className="text-[12px] uppercase tracking-[0.24em] text-foreground/70 group-hover:text-foreground transition-colors">View pricing</span>
                <span className="h-10 w-10 rounded-full border border-border/80 inline-flex items-center justify-center transition-all group-hover:bg-[hsl(var(--ink))] group-hover:text-[hsl(var(--paper))] group-hover:border-[hsl(var(--ink))] dark:group-hover:bg-[hsl(var(--gold))] dark:group-hover:text-[hsl(var(--ink))]"><ArrowUpRight className="h-4 w-4" /></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
