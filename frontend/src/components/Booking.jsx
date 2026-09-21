import React, { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { toast } from 'sonner';
import { BRAND, SERVICES } from '../mock';

export default function Booking() {
  const [form, setForm] = useState({ name: '', phone: '', service: SERVICES[0].title, date: '' });
  const [submitted, setSubmitted] = useState(false);
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return toast.error('Please add your name and phone.');
    setSubmitted(true);
    toast.success('Request sent — we\u2019ll be in touch shortly.', { description: `${form.service} · ${form.date || 'flexible'}` });
    setTimeout(() => setSubmitted(false), 4200);
  };

  return (
    <section id="booking" className="relative py-20 sm:py-24 md:py-36 bg-[hsl(var(--ink-soft))] text-[hsl(var(--paper))] overflow-hidden">
      <div className="absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-[hsl(var(--gold))]/10 blur-[140px]" />
      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-6 grid lg:grid-cols-[1fr_1.15fr] gap-14 lg:gap-20 items-start">
        <div className="reveal">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-[hsl(var(--gold-soft))]" />
            <span className="text-[11px] uppercase tracking-[0.35em] text-[hsl(var(--gold-soft))]">Book your visit</span>
          </div>
          <h2 className="font-display text-[clamp(40px,5vw,64px)] leading-[1.02] tracking-tight">Ready to feel <span className="italic text-[hsl(var(--gold-soft))]">refreshed?</span></h2>
          <p className="mt-6 text-white/70 max-w-[420px]">Share your preferred service, date and time. We’ll confirm your appointment shortly — or book instantly online.</p>
          <a href={BRAND.bookingUrl} target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center gap-3 pl-6 pr-2 h-14 rounded-full bg-[hsl(var(--gold))] text-[hsl(var(--ink))] font-medium tracking-[0.14em] uppercase text-[12px] transition-all hover:bg-[hsl(var(--gold-soft))] hover:-translate-y-0.5">Book instantly online<span className="h-11 w-11 rounded-full bg-[hsl(var(--ink))] text-[hsl(var(--gold))] inline-flex items-center justify-center"><ArrowUpRight className="h-4 w-4" /></span></a>
          <p className="mt-8 text-white/50 text-[13px]">Or call us on <a href={BRAND.phoneHref} className="text-white link-underline">{BRAND.phone}</a></p>
        </div>

        <form onSubmit={submit} className="reveal grid sm:grid-cols-2 gap-5 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 sm:p-8 md:p-10">
          {[
            { k: 'name', label: 'Your name', type: 'text', ph: 'Amelia Turner' },
            { k: 'phone', label: 'Phone', type: 'tel', ph: '021 123 4567' },
          ].map((f) => (
            <label key={f.k} className="block">
              <span className="text-[11px] uppercase tracking-[0.24em] text-white/60">{f.label}</span>
              <input required type={f.type} value={form[f.k]} onChange={(e)=>update(f.k, e.target.value)} placeholder={f.ph} className="mt-2 w-full h-12 bg-transparent border-b border-white/25 focus:border-[hsl(var(--gold))] outline-none text-[15px] text-white placeholder:text-white/30 transition-colors" />
            </label>
          ))}
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.24em] text-white/60">Service</span>
            <select value={form.service} onChange={(e)=>update('service', e.target.value)} className="mt-2 w-full h-12 bg-transparent border-b border-white/25 focus:border-[hsl(var(--gold))] outline-none text-[15px] text-white">
              {SERVICES.map(s => <option key={s.key} className="bg-[hsl(var(--ink))]">{s.title}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.24em] text-white/60">Preferred date</span>
            <input type="date" value={form.date} onChange={(e)=>update('date', e.target.value)} className="mt-2 w-full h-12 bg-transparent border-b border-white/25 focus:border-[hsl(var(--gold))] outline-none text-[15px] text-white [color-scheme:dark]" />
          </label>
          <button type="submit" className="sm:col-span-2 mt-2 inline-flex items-center justify-center gap-3 h-14 rounded-full bg-[hsl(var(--paper))] text-[hsl(var(--ink))] font-medium uppercase tracking-[0.18em] text-[12px] transition-all hover:bg-[hsl(var(--gold))] hover:-translate-y-0.5">
            {submitted ? (<><Check className="h-4 w-4" /> Request received</>) : (<>Request appointment <ArrowUpRight className="h-4 w-4" /></>)}
          </button>
          <p className="sm:col-span-2 text-[12px] text-white/40">By requesting, you agree to be contacted about your booking. This demo form does not send email.</p>
        </form>
      </div>
    </section>
  );
}
