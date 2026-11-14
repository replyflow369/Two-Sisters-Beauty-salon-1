import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';
import { BRAND } from '../mock';

export default function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-24 md:py-36">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 grid lg:grid-cols-[1.1fr_.9fr] gap-14 lg:gap-20">
        <div className="reveal">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-[hsl(var(--gold))]" />
            <span className="text-[11px] uppercase tracking-[0.35em] text-[hsl(var(--gold-deep))] dark:text-[hsl(var(--gold-soft))]">Contact</span>
          </div>
          <h2 className="font-display text-[clamp(40px,5vw,60px)] leading-[1.02] tracking-tight">Visit Two Sisters <span className="italic">Beauty Salon.</span></h2>
          <p className="mt-6 text-muted-foreground max-w-[440px]">Tucked into Richmond on Stanmore Road — a short drive from Central Christchurch. Walk-ins welcome when we’re free.</p>

          <div className="mt-10 grid sm:grid-cols-2 gap-5">
            {[
              { icon: MapPin, label: 'Address', value: BRAND.address },
              { icon: Phone, label: 'Phone', value: BRAND.phone, href: BRAND.phoneHref },
              { icon: Mail, label: 'Email', value: BRAND.email, href: `mailto:${BRAND.email}` },
              {
  icon: Clock,
  label: 'Online Booking',
  value: 'Check available appointments',
  href: BRAND.bookingUrl,
},
            ].map((c) => (
              <a key={c.label} href={c.href || '#'} className="group rounded-2xl border border-border/70 p-5 hover:border-[hsl(var(--gold))]/60 hover:-translate-y-0.5 transition-all">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[hsl(var(--gold))]/50 text-[hsl(var(--gold-deep))] dark:text-[hsl(var(--gold-soft))]"><c.icon className="h-4 w-4" strokeWidth={1.6} /></span>
                <p className="mt-4 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">{c.label}</p>
                <p className="mt-1 text-[15px] leading-snug">{c.value}</p>
              </a>
            ))}
          </div>

          {/* Map */}
          <div className="mt-10 rounded-2xl overflow-hidden border border-border/70 h-[280px]">
            <iframe
              title="Two Sisters Beauty Salon map"
              src="https://www.google.com/maps?q=327+Stanmore+Road,+Richmond,+Christchurch+8013&output=embed"
              className="w-full h-full grayscale contrast-[.95]"
              loading="lazy"
            />
          </div>
        </div>

        <aside className="reveal rounded-3xl border border-border/70 bg-[hsl(var(--paper))] dark:bg-[hsl(var(--ink-soft))] p-6 sm:p-8 md:p-10">
          <h3 className="font-display text-3xl">Opening hours</h3>
          <ul className="mt-6 divide-y divide-border/60">
            {BRAND.hours.map((h) => (
              <li key={h.day} className="flex items-center justify-between py-4 text-[15px]">
                <span className="text-foreground/85">{h.day}</span>
                <span className="font-medium">{h.time}</span>
              </li>
            ))}
          </ul>
          <div className="hairline my-8" />
          <p className="text-muted-foreground text-[14.5px]">Prefer to book online? Our real-time booking is available 24/7.</p>
          <a href={BRAND.bookingUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-3 pl-6 pr-2 h-13 rounded-full bg-[hsl(var(--ink))] text-[hsl(var(--paper))] dark:bg-[hsl(var(--gold))] dark:text-[hsl(var(--ink))] font-medium uppercase tracking-[0.16em] text-[12px] transition-all hover:-translate-y-0.5 h-14">Book now<span className="h-11 w-11 rounded-full bg-[hsl(var(--gold))] text-[hsl(var(--ink))] dark:bg-[hsl(var(--ink))] dark:text-[hsl(var(--gold))] inline-flex items-center justify-center"><ArrowUpRight className="h-4 w-4" /></span></a>
        </aside>
      </div>
    </section>
  );
}
