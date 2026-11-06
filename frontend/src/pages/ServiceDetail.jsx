import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, ChevronRight, Clock, MapPin, Sparkles } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { BRAND, PRICING } from '../mock';
import MagneticButton from '../components/motion/MagneticButton';

// Verified mapping of the salon's genuine services
export const SERVICES_DATA = {
  facials: {
    slug: 'facials',
    canonical: 'https://www.twosistersbeautysalon.co.nz/treatments/facials',
    title: 'Facials Christchurch | Two Sisters Beauty Salon Richmond',
    metaDescription: 'Experience relaxing facials in Richmond, Christchurch at Two Sisters Beauty Salon. Deep cleansing, hydration & clear skin treatments. Book online today.',
    h1: 'Facials in Richmond, Christchurch',
    subtitle: 'Relaxing, unhurried skin treatments designed to cleanse, hydrate and refresh your natural complexion.',
    heroImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxzcGElMjBmYWNpYWx8ZW58MHx8fHwxNzg5OTAwMTIyfDA&ixlib=rb-4.1.0&q=85',
    altText: 'Facial skin treatment at Two Sisters Beauty Salon in Richmond, Christchurch',
    intro: 'At Two Sisters Beauty Salon on Stanmore Road in Richmond, Christchurch, our facial treatments are tailored to support healthy skin in a serene environment. Whether your skin feels depleted by Canterbury weather or needs clarifying care, our experienced therapists take the time to tailor each treatment.',
    highlights: [
      'Tailored consultation for your unique skin needs',
      'Professional-grade, skin-friendly products',
      'Private, hygienic and calming treatment rooms',
      'Honest post-treatment skincare advice',
    ],
    pricingCategory: 'facials',
    faqs: [
      {
        q: 'How do I choose between Express, Deluxe and Clear Skin Facials?',
        a: 'The Express Facial (45 min) is ideal for a quick refresh. The Clear Skin Facial (1 hr) focuses on clarifying blemish-prone skin, while the Deluxe Facial (1 hr) provides deep hydration and extended relaxation.'
      },
      {
        q: 'Where are your Christchurch facial rooms located?',
        a: 'Our salon is conveniently located at 327 Stanmore Road, Richmond, Christchurch 8013, with easy street access.'
      }
    ]
  },
  threading: {
    slug: 'threading',
    canonical: 'https://www.twosistersbeautysalon.co.nz/treatments/threading',
    title: 'Eyebrow Threading Christchurch | Two Sisters Beauty Salon',
    metaDescription: 'Precise eyebrow threading & facial hair removal in Richmond, Christchurch at Two Sisters Beauty Salon. Natural brow shaping. Book your appointment online.',
    h1: 'Eyebrow Threading in Christchurch',
    subtitle: 'Gentle, traditional cotton-thread shaping for clean, sharply defined eyebrows and facial hair removal.',
    heroImage: 'https://images.unsplash.com/photo-1548902378-2ec44c906391?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHw0fHxleWVsYXNoJTIwZXh0ZW5zaW9ufGVufDB8fHx8MTc4OTkwMDEyOHww&ixlib=rb-4.1.0&q=85',
    altText: 'Eyebrow threading and shaping treatment at Two Sisters Beauty Salon Christchurch',
    intro: 'Eyebrow threading is an ancient, chemical-free technique that uses pure antibacterial cotton thread to glide across the skin and remove unwanted hair directly from the follicle. At Two Sisters Beauty Salon in Christchurch, our therapists specialize in creating balanced, natural brow arches suited to your facial symmetry.',
    highlights: [
      '100% natural, chemical-free hair removal',
      'Exceptional precision for clean eyebrow arches',
      'Gentle on sensitive skin and allergy-prone areas',
      'Fast, hygienic and durable results',
    ],
    pricingCategory: 'threading',
    faqs: [
      {
        q: 'Is threading better than waxing for eyebrows?',
        a: 'Threading gives superior precision and does not pull or peel the delicate top layer of facial skin, making it the preferred choice for clients with sensitive skin or those using retinoids.'
      },
      {
        q: 'How long does an eyebrow threading session take?',
        a: 'A brow shaping appointment usually takes between 15 to 20 minutes, making it quick and easy to fit into your schedule.'
      }
    ]
  },
  brows: {
    slug: 'brows',
    canonical: 'https://www.twosistersbeautysalon.co.nz/treatments/brows',
    title: 'Eyebrow Tinting & Brows Christchurch | Two Sisters Beauty Salon',
    metaDescription: 'Professional eyebrow tinting, henna brows & lash lift in Richmond, Christchurch. Natural brow definition and lash perms. Book with Two Sisters today.',
    h1: 'Eyebrow Tinting & Brows in Christchurch',
    subtitle: 'Define and enhance your natural features with expert henna brows, brow tinting and lash lifts.',
    heroImage: 'https://images.unsplash.com/photo-1639629509821-c54cdd984227?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwzfHxleWVsYXNoJTIwZXh0ZW5zaW9ufGVufDB8fHx8MTc4OTkwMDEyOHww&ixlib=rb-4.1.0&q=85',
    altText: 'Eyebrow tinting and henna brow definition in Richmond Christchurch',
    intro: 'Make your morning routine effortless with expertly tinted brows and lifted lashes. Two Sisters Beauty Salon in Christchurch offers eyebrow tinting, henna brows, and lash lift treatments designed to add rich definition while preserving your natural aesthetic.',
    highlights: [
      'Custom shade matching to complement your skin tone',
      'Henna brow option for longer-lasting skin stain & fullness',
      'Gentle lash perming and tinting for opened eyes',
      'Popular Eyetrio packages including brow shape, tint & lash tint',
    ],
    pricingCategory: 'brows',
    faqs: [
      {
        q: 'What is included in the Eyetrio treatment?',
        a: 'The Eyetrio package combines an eyebrow shape, eyebrow tint, and eyelash tint for a complete eye-area refresh in one visit.'
      },
      {
        q: 'How long does eyebrow tinting last?',
        a: 'Standard eyebrow tinting typically lasts 3 to 4 weeks, while Henna brows can stain the skin for up to 10-14 days and the hair for up to 5-6 weeks.'
      }
    ]
  },
  waxing: {
    slug: 'waxing',
    canonical: 'https://www.twosistersbeautysalon.co.nz/treatments/waxing',
    title: 'Waxing Christchurch | Richmond Waxing Salon | Two Sisters',
    metaDescription: 'Smooth, hygienic waxing in Richmond, Christchurch at Two Sisters Beauty Salon. Brazilian, bikini, legs, arms & full-body waxing. Book online today.',
    h1: 'Waxing Services in Richmond, Christchurch',
    subtitle: 'Thorough, hygienic waxing for face and body delivering silky smooth, long-lasting results.',
    heroImage: 'https://images.unsplash.com/photo-1548902378-2ec44c906391?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHw0fHxleWVsYXNoJTIwZXh0ZW5zaW9ufGVufDB8fHx8MTc4OTkwMDEyOHww&ixlib=rb-4.1.0&q=85',
    altText: 'Professional waxing treatment in Christchurch at Two Sisters Beauty Salon',
    intro: 'Experience thorough, professional waxing in our clean, private Richmond salon. From bikini and Brazilian maintenance to leg, arm, and full-body treatments, we use skin-soothing waxes designed to minimize discomfort and leave skin silky and smooth.',
    highlights: [
      'Strict hygiene standards with no double-dipping',
      'Fast, experienced therapists for minimal discomfort',
      'Bikini, Brazilian first visit and maintenance options',
      'Both women’s and men’s waxing services available',
    ],
    pricingCategory: 'threading',
    faqs: [
      {
        q: 'How often should I book waxing appointments?',
        a: 'For best results, we recommend waxing every 4 to 6 weeks to maintain smooth skin and synchronize the hair growth cycle.'
      },
      {
        q: 'What is the Brazilian maintenance window?',
        a: 'Brazilian maintenance pricing applies when you visit within 5 weeks of your previous appointment.'
      }
    ]
  },
  manicures: {
    slug: 'manicures',
    canonical: 'https://www.twosistersbeautysalon.co.nz/treatments/manicures',
    title: 'Manicures Christchurch | Richmond Nail Salon | Two Sisters',
    metaDescription: 'Professional manicures in Richmond, Christchurch. Express tidy, classic manicures, gel polish & nail art at Two Sisters Beauty Salon. Book online.',
    h1: 'Manicures in Richmond, Christchurch',
    subtitle: 'Elegantly groomed hands, meticulous cuticle care, classic polish and durable gel finishes.',
    heroImage: 'https://images.unsplash.com/photo-1610992015762-45dca7fa3a85?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDR8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbWFuaWN1cmV8ZW58MHx8fHwxNzg5OTAwMTIyfDA&ixlib=rb-4.1.0&q=85',
    altText: 'Elegant manicure and nail treatment in Christchurch salon',
    intro: 'Keep your hands neat and polished at Two Sisters Beauty Salon in Richmond, Christchurch. Our nail services range from express tidy sessions to indulgent classic manicures, gel applications, french finishes, and custom nail art.',
    highlights: [
      'Sanitized tools and hygienic nail preparation',
      'Long-lasting gel polish and classic finishes',
      'Cuticle care, shaping and nail strengthening',
      'Children’s manicure options available',
    ],
    pricingCategory: 'nails',
    subgroupFilter: 'Manicures – Hands',
    faqs: [
      {
        q: 'How long does a gel manicure last?',
        a: 'A gel manicure typically lasts 2 to 3 weeks without chipping, maintaining a high-gloss finish.'
      },
      {
        q: 'Do you offer gel removal services?',
        a: 'Yes, we provide safe, gentle gel removal that protects your natural nail plate.'
      }
    ]
  },
  pedicures: {
    slug: 'pedicures',
    canonical: 'https://www.twosistersbeautysalon.co.nz/treatments/pedicures',
    title: 'Pedicures Christchurch | Richmond Foot Care | Two Sisters',
    metaDescription: 'Relaxing pedicures in Richmond, Christchurch. Express tidy, classic pedicures, gel polish & foot massage at Two Sisters Beauty Salon. Book online.',
    h1: 'Pedicures in Richmond, Christchurch',
    subtitle: 'Soothing foot care, nail shaping, gel polish and optional massage to refresh tired feet.',
    heroImage: 'https://images.pexels.com/photos/34997574/pexels-photo-34997574.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    altText: 'Relaxing pedicure treatment at Two Sisters Beauty Salon in Christchurch',
    intro: 'Step into comfort with a rejuvenating pedicure at Two Sisters Beauty Salon on Stanmore Road. Whether you need a quick express tidy or a complete classic pedicure with a foot soak and relaxing massage, our foot treatments leave your feet feeling light and well cared for.',
    highlights: [
      'Thorough foot soak, nail trim and cuticle care',
      'Smooth heel buffing and exfoliation in classic pedicures',
      'Durable gel polish or traditional color finishes',
      'Optional 10-minute relaxing foot massage add-on',
    ],
    pricingCategory: 'nails',
    subgroupFilter: 'Pedicures – Toes',
    faqs: [
      {
        q: 'Can I add a massage to my pedicure?',
        a: 'Yes, we offer a dedicated 10-minute relaxing massage add-on to pair with your pedicure.'
      },
      {
        q: 'Are pedicures suitable for both men and women?',
        a: 'Absolutely. Proper foot hygiene and nail maintenance are beneficial for everyone.'
      }
    ]
  }
};

export default function ServiceDetail({ serviceKey }) {
  const service = SERVICES_DATA[serviceKey];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceKey]);

  if (!service) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
        <Navigation />
        <div className="py-32 text-center">
          <h1 className="font-display text-4xl">Service Not Found</h1>
          <Link to="/treatments" className="mt-4 inline-block text-[hsl(var(--gold-deep))] underline">
            Browse all treatments
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const pricingData = PRICING[service.pricingCategory];
  const groupsToDisplay = service.subgroupFilter
    ? pricingData.groups.filter((g) => g.name === service.subgroupFilter)
    : pricingData.groups;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <SEO
        title={service.title}
        description={service.metaDescription}
        canonical={service.canonical}
      />
      <Navigation />

      <main className="flex-1">
        {/* Breadcrumb Bar */}
        <div className="bg-[hsl(var(--paper))] dark:bg-[hsl(var(--ink-soft))] border-b border-border/60 py-3">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-6 flex items-center gap-2 text-[12px] text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/treatments" className="hover:text-foreground transition-colors">Treatments</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">{service.h1}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-16 sm:py-24 bg-[hsl(var(--ink))] text-[hsl(var(--paper))] overflow-hidden grain">
          <div className="absolute -top-32 right-0 h-[450px] w-[450px] rounded-full bg-[hsl(var(--gold))]/10 blur-[130px]" />
          <div className="relative mx-auto max-w-[1240px] px-5 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 backdrop-blur-md mb-6">
                <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--gold))]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/85">
                  Two Sisters Beauty Salon · Christchurch
                </span>
              </div>
              <h1 className="font-display text-[clamp(36px,5.5vw,64px)] leading-[1.05] tracking-tight">
                {service.h1}
              </h1>
              <p className="mt-6 text-[16px] sm:text-[18px] text-white/80 leading-relaxed max-w-[540px]">
                {service.subtitle}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <MagneticButton
                  as="a"
                  href={BRAND.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  strength={16}
                  className="group inline-flex h-13 sm:h-14 items-center justify-between gap-4 rounded-full bg-[hsl(var(--gold))] pl-6 pr-2 text-[12px] font-medium uppercase tracking-[0.16em] text-[hsl(var(--ink))]"
                >
                  <span>Book Appointment</span>
                  <span className="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-[hsl(var(--ink))] text-[hsl(var(--gold))] transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </MagneticButton>
                <a
                  href="#pricing-table"
                  className="inline-flex h-13 sm:h-14 items-center justify-center rounded-full border border-white/25 px-6 text-[12px] uppercase tracking-[0.18em] text-white/90 hover:bg-white/10 transition"
                >
                  View Prices
                </a>
              </div>
              <div className="mt-6 flex items-center gap-4 text-xs text-white/60">
                <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[hsl(var(--gold))]" /> 327 Stanmore Rd, Richmond</span>
                <span>·</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-[hsl(var(--gold))]" /> Mon–Sat: 9am–6pm</span>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-[hsl(var(--gold))]/30 shadow-2xl aspect-[4/3] sm:aspect-[16/11]">
              <img
                src={service.heroImage}
                alt={service.altText}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink))]/50 via-transparent to-transparent" />
            </div>
          </div>
        </section>

        {/* Detailed Service Content */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-6 grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-[hsl(var(--gold))]" />
                <span className="text-[11px] uppercase tracking-[0.35em] text-[hsl(var(--gold-deep))] dark:text-[hsl(var(--gold-soft))]">
                  Treatment Overview
                </span>
              </div>
              <h2 className="font-display text-[clamp(28px,4vw,44px)] leading-tight">
                Considered Care in Christchurch
              </h2>
              <p className="mt-6 text-[16px] text-muted-foreground leading-relaxed">
                {service.intro}
              </p>

              <div className="mt-8 rounded-2xl border border-border/70 bg-[hsl(var(--paper))] dark:bg-[hsl(var(--ink-soft))] p-6 sm:p-8">
                <h3 className="font-display text-2xl mb-4">What to Expect</h3>
                <ul className="space-y-3.5">
                  {service.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px]">
                      <CheckCircle2 className="h-5 w-5 text-[hsl(var(--gold-deep))] dark:text-[hsl(var(--gold-soft))] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Price Table Section */}
            <div id="pricing-table" className="lg:col-span-5">
              <div className="rounded-3xl border border-border/80 bg-[hsl(var(--paper))] dark:bg-[hsl(var(--ink-soft))] p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/70">
                  <h3 className="font-display text-2xl sm:text-3xl">Treatment Prices</h3>
                  <span className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">NZD</span>
                </div>

                <div className="space-y-6">
                  {groupsToDisplay.map((group, gi) => (
                    <div key={gi}>
                      {group.name && (
                        <h4 className="text-[11px] uppercase tracking-[0.28em] text-[hsl(var(--gold-deep))] dark:text-[hsl(var(--gold-soft))] font-medium mb-3">
                          {group.name}
                        </h4>
                      )}
                      <ul className="divide-y divide-border/60">
                        {group.items.map(([name, price], idx) => (
                          <li key={idx} className="flex items-baseline justify-between py-2.5 text-[14.5px]">
                            <span className="text-foreground/90 pr-3">{name}</span>
                            <span className="font-medium text-[hsl(var(--gold-deep))] dark:text-[hsl(var(--gold))] whitespace-nowrap">
                              {price}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-border/70">
                  <a
                    href={BRAND.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center h-12 leading-[48px] rounded-full bg-[hsl(var(--ink))] text-[hsl(var(--paper))] dark:bg-[hsl(var(--gold))] dark:text-[hsl(var(--ink))] font-medium uppercase tracking-[0.18em] text-[12px] hover:opacity-90 transition"
                  >
                    Book This Treatment
                  </a>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Instant confirmation via Timely online booking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-[hsl(var(--paper))] dark:bg-[hsl(var(--ink-soft))] border-t border-border/60">
          <div className="mx-auto max-w-[840px] px-5 sm:px-6">
            <div className="text-center mb-10">
              <span className="text-[11px] uppercase tracking-[0.35em] text-[hsl(var(--gold-deep))] dark:text-[hsl(var(--gold-soft))]">
                Questions & Answers
              </span>
              <h2 className="font-display text-3xl sm:text-4xl mt-3">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {service.faqs.map((faq, i) => (
                <div key={i} className="rounded-2xl border border-border/70 bg-background p-6">
                  <h3 className="font-display text-xl">{faq.q}</h3>
                  <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
