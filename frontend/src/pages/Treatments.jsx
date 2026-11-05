import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronRight, Flower2, Footprints, Hand, Sparkles, Sun } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { BRAND } from '../mock';
import TiltCard from '../components/motion/TiltCard';

const SERVICES_DIRECTORY = [
  {
    key: 'facials',
    href: '/treatments/facials',
    icon: Sun,
    title: 'Facials',
    copy: 'Relaxing treatments designed to cleanse, hydrate and brighten your skin in Christchurch.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxzcGElMjBmYWNpYWx8ZW58MHx8fHwxNzg5OTAwMTIyfDA&ixlib=rb-4.1.0&q=85',
    alt: 'Facials in Richmond Christchurch',
  },
  {
    key: 'threading',
    href: '/treatments/threading',
    icon: Flower2,
    title: 'Eyebrow Threading',
    copy: 'Precise 100% natural cotton-thread eyebrow shaping and facial hair removal.',
    image: 'https://images.unsplash.com/photo-1548902378-2ec44c906391?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHw0fHxleWVsYXNoJTIwZXh0ZW5zaW9ufGVufDB8fHx8MTc4OTkwMDEyOHww&ixlib=rb-4.1.0&q=85',
    alt: 'Eyebrow threading salon in Christchurch',
  },
  {
    key: 'brows',
    href: '/treatments/brows',
    icon: Sparkles,
    title: 'Eyebrow Tinting & Brows',
    copy: 'Henna brows, lash lifts and eyebrow tinting to naturally define your eyes.',
    image: 'https://images.unsplash.com/photo-1639629509821-c54cdd984227?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwzfHxleWVsYXNoJTIwZXh0ZW5zaW9ufGVufDB8fHx8MTc4OTkwMDEyOHww&ixlib=rb-4.1.0&q=85',
    alt: 'Eyebrow tinting and henna brows Christchurch',
  },
  {
    key: 'waxing',
    href: '/treatments/waxing',
    icon: Flower2,
    title: 'Waxing Services',
    copy: 'Hygienic bikini, Brazilian, leg, arm and body waxing for smooth, long-lasting results.',
    image: 'https://images.unsplash.com/photo-1548902378-2ec44c906391?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHw0fHxleWVsYXNoJTIwZXh0ZW5zaW9ufGVufDB8fHx8MTc4OTkwMDEyOHww&ixlib=rb-4.1.0&q=85',
    alt: 'Professional waxing services in Christchurch',
  },
  {
    key: 'manicures',
    href: '/treatments/manicures',
    icon: Hand,
    title: 'Manicures',
    copy: 'Express to classic tidy manicures, durable gel finishes and custom nail art.',
    image: 'https://images.unsplash.com/photo-1610992015762-45dca7fa3a85?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDR8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbWFuaWN1cmV8ZW58MHx8fHwxNzg5OTAwMTIyfDA&ixlib=rb-4.1.0&q=85',
    alt: 'Manicure and nail salon in Richmond Christchurch',
  },
  {
    key: 'pedicures',
    href: '/treatments/pedicures',
    icon: Footprints,
    title: 'Pedicures',
    copy: 'Classic and express tidy pedicures with relaxing foot massage add-ons.',
    image: 'https://images.pexels.com/photos/34997574/pexels-photo-34997574.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    alt: 'Pedicures and foot care in Christchurch',
  },
];

export default function Treatments() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <SEO
        title="Beauty Treatments Christchurch | Two Sisters Beauty Salon Richmond"
        description="Explore professional beauty treatments at Two Sisters Beauty Salon in Richmond, Christchurch. Facials, eyebrow threading, tinting, waxing, manicures & pedicures."
        canonical="https://www.twosistersbeautysalon.co.nz/treatments"
      />
      <Navigation />

      <main className="flex-1">
        {/* Breadcrumb Bar */}
        <div className="bg-[hsl(var(--paper))] dark:bg-[hsl(var(--ink-soft))] border-b border-border/60 py-3">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-6 flex items-center gap-2 text-[12px] text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Treatments</span>
          </div>
        </div>

        {/* Directory Header */}
        <section className="relative py-16 sm:py-24 bg-[hsl(var(--ink))] text-[hsl(var(--paper))] overflow-hidden grain">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 backdrop-blur-md mb-6">
              <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--gold))]" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/85">
                Treatment Menu · Richmond, Christchurch
              </span>
            </div>
            <h1 className="font-display text-[clamp(36px,6vw,72px)] leading-tight tracking-tight">
              Our Beauty Treatments
            </h1>
            <p className="mt-6 text-[17px] sm:text-[19px] text-white/80 max-w-[620px] mx-auto leading-relaxed">
              Explore our full range of considered beauty treatments in Christchurch. From relaxing facials and precision eyebrow threading to manicures, pedicures and waxing.
            </p>
          </div>
        </section>

        {/* Treatment Cards Grid */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES_DIRECTORY.map((s) => (
                <TiltCard key={s.key} max={5} className="rounded-2xl">
                  <Link
                    to={s.href}
                    className="group relative block overflow-hidden rounded-2xl border border-border/70 bg-card p-6 sm:p-8 min-h-[320px] flex flex-col justify-between transition-all duration-500 hover:border-[hsl(var(--gold))]/60 hover:shadow-xl"
                  >
                    <div className="absolute -top-6 -right-6 h-40 w-40 rounded-full overflow-hidden opacity-30 group-hover:opacity-90 transition-all duration-700 group-hover:scale-110">
                      <img
                        src={s.image}
                        alt={s.alt}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-[hsl(var(--ink))]/40 to-transparent" />
                    </div>

                    <div className="relative">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[hsl(var(--gold))]/60 bg-[hsl(var(--gold))]/5 text-[hsl(var(--gold-deep))] dark:text-[hsl(var(--gold-soft))]">
                        <s.icon className="h-5 w-5" strokeWidth={1.5} />
                      </span>
                      <h2 className="font-display text-[28px] leading-tight mt-6 group-hover:text-[hsl(var(--gold-deep))] dark:group-hover:text-[hsl(var(--gold))] transition-colors">
                        {s.title}
                      </h2>
                      <p className="text-muted-foreground text-[14.5px] mt-3 max-w-[260px] leading-relaxed">
                        {s.copy}
                      </p>
                    </div>

                    <div className="relative mt-8 flex items-center justify-between">
                      <span className="text-[12px] uppercase tracking-[0.2em] font-medium text-foreground/80 group-hover:text-foreground">
                        View treatment & prices
                      </span>
                      <span className="h-10 w-10 rounded-full border border-border/80 inline-flex items-center justify-center transition-transform group-hover:rotate-45 group-hover:bg-[hsl(var(--gold))] group-hover:text-[hsl(var(--ink))]">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              ))}
            </div>

            {/* Direct Booking CTA */}
            <div className="mt-16 rounded-3xl border border-border/80 bg-[hsl(var(--paper))] dark:bg-[hsl(var(--ink-soft))] p-8 sm:p-12 text-center max-w-[800px] mx-auto">
              <h2 className="font-display text-3xl sm:text-4xl">Ready to secure your appointment?</h2>
              <p className="mt-4 text-muted-foreground max-w-[500px] mx-auto text-[15px]">
                Book instantly online through our secure Timely system or contact our friendly team on Stanmore Road.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={BRAND.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 px-8 rounded-full bg-[hsl(var(--gold))] text-[hsl(var(--ink))] font-medium uppercase tracking-[0.18em] text-[12px] items-center justify-center hover:opacity-90 transition"
                >
                  Book Online via Timely
                </a>
                <a
                  href={BRAND.phoneHref}
                  className="inline-flex h-12 px-8 rounded-full border border-border text-foreground font-medium uppercase tracking-[0.18em] text-[12px] items-center justify-center hover:bg-secondary transition"
                >
                  Call {BRAND.phone}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
