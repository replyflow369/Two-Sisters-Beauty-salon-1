
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, MapPin, ArrowUpRight } from 'lucide-react';
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

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const getNavHref = (href) => {
    if (href.startsWith('#') && window.location.pathname !== '/') {
      return `/${href}`;
    }
    return href;
  };

  return (
    <>
      <div className="hidden md:block bg-[hsl(var(--ink))] text-[hsl(var(--paper))] text-[12px] tracking-wide">
        <div className="mx-auto max-w-[1240px] px-6 flex items-center justify-between h-10">
          <div className="flex items-center gap-6 opacity-90">
            <a href={BRAND.phoneHref} className="flex items-center gap-2 link-underline">
              <Phone className="h-3 w-3 text-[hsl(var(--gold-soft))]" />
              {BRAND.phone}
            </a>
            <span className="opacity-70">{BRAND.address}</span>
          </div>
          <span className="uppercase tracking-[0.28em] text-[10px] text-[hsl(var(--gold-soft))]">
            Richmond · Christchurch
          </span>
        </div>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/85 backdrop-blur-xl border-b border-border/60 shadow-[0_1px_0_0_hsl(var(--gold)/0.08)]'
          : 'bg-background/60 backdrop-blur-md'
      }`}>
        <div className="mx-auto max-w-[1240px] px-5 sm:px-6">
          <div className="flex items-center justify-between h-[64px] sm:h-[76px]">

            <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5 sm:gap-3 group">
              <span className="relative inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-[hsl(var(--gold))]/60 bg-gradient-to-br from-[hsl(var(--paper))] to-[hsl(var(--paper-2))] dark:from-[hsl(var(--ink-soft))] dark:to-[hsl(var(--ink))]">
                <span className="font-serif text-[hsl(var(--gold-deep))] text-lg sm:text-xl italic leading-none">Ts</span>
                <span className="absolute -inset-0.5 rounded-full border border-[hsl(var(--gold))]/25 transition-opacity opacity-0 group-hover:opacity-100" />
              </span>
              <span>
                <span className="block font-display text-[18px] sm:text-[22px] leading-none tracking-tight">Two Sisters</span>
                <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.28em] sm:tracking-[0.35em] text-[hsl(var(--gold-deep))] dark:text-[hsl(var(--gold-soft))] mt-1">
                  Beauty Salon
                </span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-9 text-[13.5px]">
              <Link to="/treatments" className="link-underline text-foreground/80 hover:text-foreground transition-colors">
                Treatments
              </Link>
              {NAV.map((n) => (
                <a key={n.href} href={getNavHref(n.href)} className="link-underline text-foreground/80 hover:text-foreground transition-colors">
                  {n.label}
                </a>
              ))}
              <a href="/blog/" className="link-underline text-foreground/80 hover:text-foreground transition-colors">
                Blog
              </a>
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle className="hidden sm:inline-flex" />

              <a
                href={BRAND.bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 sm:h-11 items-center px-4 sm:px-5 rounded-full text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.16em] sm:tracking-[0.18em] bg-[hsl(var(--ink))] text-[hsl(var(--paper))] dark:bg-[hsl(var(--gold))] dark:text-[hsl(var(--ink))] transition-all hover:-translate-y-0.5"
              >
                Book<span className="hidden sm:inline">&nbsp;now</span>
              </a>

              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={open}
                onClick={() => setOpen(true)}
                className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 active:bg-secondary"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`lg:hidden fixed inset-0 z-[100] transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="absolute inset-0 w-full h-full bg-black/55 backdrop-blur-sm"
        />

        <aside
          className={`absolute top-0 right-0 flex flex-col h-[100dvh] w-[88%] max-w-[430px] bg-[#F8F5EF] text-[#29251F] shadow-2xl transition-transform duration-500 ease-out ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between px-6 sm:px-8 pt-7 pb-6 border-b border-[#D9CEBA]">
            <div>
              <p className="font-display text-2xl leading-none text-[#29251F]">
                Two Sisters
              </p>
              <p className="mt-2 text-[9px] uppercase tracking-[0.35em] text-[#A27C42]">
                Beauty Salon
              </p>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="h-11 w-11 rounded-full border border-[#D9CEBA] flex items-center justify-center text-[#29251F] hover:bg-[#EDE6DA] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-6 sm:px-8 py-7">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#A27C42] mb-5">
              Explore our salon
            </p>

            <nav className="flex flex-col">
              <Link
                to="/treatments"
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between py-4 border-b border-[#DED6C9] font-display text-[27px] sm:text-[30px] text-[#29251F] hover:text-[#A27C42] transition-colors"
              >
                Treatments
                <ArrowUpRight className="h-5 w-5 text-[#B18A4A] opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>

              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={getNavHref(n.href)}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between py-4 border-b border-[#DED6C9] font-display text-[25px] sm:text-[28px] text-[#29251F] hover:text-[#A27C42] transition-colors"
                >
                  {n.label}
                  <ArrowUpRight className="h-4 w-4 text-[#B18A4A] opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}

              <a
                href="/blog/"
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between py-4 border-b border-[#DED6C9] font-display text-[25px] sm:text-[28px] text-[#29251F] hover:text-[#A27C42] transition-colors"
              >
                Blog
                <ArrowUpRight className="h-4 w-4 text-[#B18A4A] opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </nav>

            <div className="mt-8 rounded-2xl bg-[#EFE9DE] border border-[#DED6C9] p-5">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#A27C42] mb-4">
                Visit our salon
              </p>

              <a href={BRAND.phoneHref} className="flex items-center gap-3 text-[15px] font-medium text-[#29251F]">
                <Phone className="h-4 w-4 text-[#A27C42]" />
                {BRAND.phone}
              </a>

              <div className="flex items-start gap-3 mt-4 text-[14px] leading-relaxed text-[#655D52]">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[#A27C42]" />
                <span>{BRAND.address}</span>
              </div>

              <p className="mt-4 pt-4 border-t border-[#D9CEBA] text-[13px] text-[#655D52] break-all">
                {BRAND.email}
              </p>
            </div>
          </div>

          <div className="px-6 sm:px-8 pt-5 pb-7 border-t border-[#D9CEBA] bg-[#F8F5EF]">
            <a
              href={BRAND.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 w-full h-14 rounded-full bg-[#B58B4B] text-white font-medium uppercase tracking-[0.18em] text-[12px] hover:bg-[#9F773C] transition-colors"
            >
              Book an appointment
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <p className="mt-4 text-center text-[9px] uppercase tracking-[0.25em] text-[#928575]">
              Richmond · Christchurch
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
