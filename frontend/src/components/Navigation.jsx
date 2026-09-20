import React, { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { BRAND, NAV } from '../mock';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="hidden md:block bg-[hsl(var(--ink))] text-[hsl(var(--paper))] text-[12px] tracking-wide">
        <div className="mx-auto max-w-[1240px] px-6 flex items-center justify-between h-10">
          <div className="flex items-center gap-6 opacity-90">
            <a href={BRAND.phoneHref} className="flex items-center gap-2 link-underline"><Phone className="h-3 w-3 text-[hsl(var(--gold-soft))]" /> {BRAND.phone}</a>
            <span className="opacity-70">{BRAND.address}</span>
          </div>
          <span className="uppercase tracking-[0.28em] text-[10px] text-[hsl(var(--gold-soft))]">Christchurch · Est. 2012</span>
        </div>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-background/85 backdrop-blur-xl border-b border-border/60 shadow-[0_1px_0_0_hsl(var(--gold)/0.08)]' : 'bg-background/60 backdrop-blur-md'}`}>
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="flex items-center justify-between h-[76px]">
            {/* Brand */}
            <a href="#top" className="flex items-center gap-3 group">
              <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[hsl(var(--gold))]/60 bg-gradient-to-br from-[hsl(var(--paper))] to-[hsl(var(--paper-2))] dark:from-[hsl(var(--ink-soft))] dark:to-[hsl(var(--ink))]">
                <span className="font-serif text-[hsl(var(--gold-deep))] text-xl italic leading-none">Ts</span>
                <span className="absolute -inset-0.5 rounded-full border border-[hsl(var(--gold))]/25 transition-opacity opacity-0 group-hover:opacity-100" />
              </span>
              <span>
                <span className="block font-display text-[22px] leading-none tracking-tight">Two Sisters</span>
                <span className="block text-[10px] uppercase tracking-[0.35em] text-[hsl(var(--gold-deep))] dark:text-[hsl(var(--gold-soft))] mt-1">Beauty Salon</span>
              </span>
            </a>

            {/* Nav */}
            <nav className="hidden lg:flex items-center gap-9 text-[13.5px]">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} className="link-underline text-foreground/80 hover:text-foreground transition-colors">{n.label}</a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <ThemeToggle className="hidden sm:inline-flex" />
              <a href={BRAND.bookingUrl} target="_blank" rel="noreferrer" className="hidden sm:inline-flex h-11 items-center px-5 rounded-full text-[12px] font-medium uppercase tracking-[0.18em] bg-[hsl(var(--ink))] text-[hsl(var(--paper))] dark:bg-[hsl(var(--gold))] dark:text-[hsl(var(--ink))] transition-all hover:translate-y-[-1px] hover:shadow-[0_10px_30px_-10px_hsl(var(--ink)/0.4)]">Book now</a>
              <button aria-label="Menu" onClick={() => setOpen(true)} className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70"><Menu className="h-5 w-5" /></button>
            </div>
          </div>
        </div>

        {/* Mobile sheet */}
        <div className={`fixed inset-0 z-[60] transition-all duration-500 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} />
          <aside className={`absolute right-0 top-0 h-full w-[86%] max-w-[420px] bg-background border-l border-border p-8 transition-transform duration-500 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl">Menu</span>
              <button onClick={() => setOpen(false)} className="h-10 w-10 rounded-full border border-border inline-flex items-center justify-center"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-12 flex flex-col gap-6">
              {NAV.map((n, i) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="font-display text-3xl hover:text-[hsl(var(--gold-deep))] dark:hover:text-[hsl(var(--gold))] transition-colors" style={{ transitionDelay: `${i * 40}ms` }}>{n.label}</a>
              ))}
            </div>
            <div className="absolute bottom-8 left-8 right-8">
              <div className="hairline mb-6" />
              <a href={BRAND.bookingUrl} target="_blank" rel="noreferrer" className="block text-center h-12 leading-[48px] rounded-full bg-[hsl(var(--gold))] text-[hsl(var(--ink))] font-medium uppercase tracking-[0.2em] text-[12px]">Book an appointment</a>
              <p className="mt-4 text-xs text-muted-foreground">{BRAND.phone} · {BRAND.email}</p>
            </div>
          </aside>
        </div>
      </header>
    </>
  );
}
