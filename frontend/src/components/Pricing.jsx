import React, { useState } from 'react';
import { PRICING } from '../mock';
import { Plus } from 'lucide-react';

const TABS = [
  { key: 'threading', label: 'Threading & Waxing' },
  { key: 'brows', label: 'Brows & Lashes' },
  { key: 'facials', label: 'Facials' },
  { key: 'nails', label: 'Nails' },
  { key: 'piercing', label: 'Piercing' },
  { key: 'mens', label: 'Men' },
];

export default function Pricing() {
  const [active, setActive] = useState('threading');
  const cat = PRICING[active];

  return (
    <section id="pricing" className="py-28 md:py-36">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="text-center max-w-[720px] mx-auto reveal">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-10 bg-[hsl(var(--gold))]" />
            <span className="text-[11px] uppercase tracking-[0.35em] text-[hsl(var(--gold-deep))] dark:text-[hsl(var(--gold-soft))]">Price guide</span>
            <span className="h-px w-10 bg-[hsl(var(--gold))]" />
          </div>
          <h2 className="font-display text-[clamp(40px,5vw,64px)] leading-[1.02] tracking-tight">Clear, honest <span className="italic">pricing.</span></h2>
          <p className="mt-5 text-muted-foreground">Every price is upfront. Choose a category to browse the full list.</p>
        </div>

        {/* Tabs */}
        <div className="reveal mt-14 flex flex-wrap justify-center gap-2">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setActive(t.key)} className={`px-5 h-11 rounded-full text-[12.5px] uppercase tracking-[0.16em] transition-all border ${active===t.key ? 'bg-[hsl(var(--ink))] text-[hsl(var(--paper))] border-[hsl(var(--ink))] dark:bg-[hsl(var(--gold))] dark:text-[hsl(var(--ink))] dark:border-[hsl(var(--gold))]' : 'bg-transparent text-foreground/70 border-border hover:border-[hsl(var(--gold))]/60 hover:text-foreground'}`}>{t.label}</button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-10 max-w-[900px] mx-auto rounded-3xl border border-border/70 bg-[hsl(var(--paper))] dark:bg-[hsl(var(--ink-soft))] p-8 md:p-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display text-3xl md:text-4xl">{cat.title}</h3>
            <span className="hidden md:inline text-[11px] uppercase tracking-[0.28em] text-muted-foreground">All prices in NZD</span>
          </div>
          <div className="grid gap-8">
            {cat.groups.map((g, gi) => (
              <div key={gi}>
                {g.name && (
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-px flex-1 bg-border/70" />
                    <h4 className="text-[11px] uppercase tracking-[0.32em] text-[hsl(var(--gold-deep))] dark:text-[hsl(var(--gold-soft))]">{g.name}</h4>
                    <span className="h-px flex-1 bg-border/70" />
                  </div>
                )}
                <ul className="divide-y divide-border/60">
                  {g.items.map(([name, price], i) => (
                    <li key={i} className="flex items-baseline justify-between gap-5 py-3.5 group">
                      <span className="text-[15px] text-foreground/90 group-hover:text-foreground transition-colors">{name}</span>
                      <span className="flex items-center gap-3">
                        <span className="hidden sm:block flex-1 border-b border-dotted border-border/70 min-w-[40px]" />
                        <span className="font-medium text-[15px] text-[hsl(var(--gold-deep))] dark:text-[hsl(var(--gold))] whitespace-nowrap">{price}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-8 text-[13px] text-muted-foreground italic flex items-center gap-2"><Plus className="h-3.5 w-3.5" /> Prices may vary based on treatment length or product. Please confirm at booking.</p>
        </div>
      </div>
    </section>
  );
}
