import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Services from './components/Services';
import BeforeAfter from './components/BeforeAfter';
import Experience from './components/Experience';
import Process from './components/Process';
import Gallery from './components/Gallery';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Booking from './components/Booking';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorOrb from './components/motion/CursorOrb';
import Concierge from './components/Concierge';
import SEO from './components/SEO';
import Treatments from './pages/Treatments';
import ServiceDetail from './pages/ServiceDetail';

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .mask-reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach((el) => io.observe(el));

    const bar = document.getElementById('scroll-progress');
    let raf;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        if (!bar) return;
        const h = document.documentElement;
        const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
        bar.style.transform = `scaleX(${pct / 100})`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);
}

function useTheme() {
  useEffect(() => {
    const saved = localStorage.getItem('tsb-theme');
    if (saved === 'dark') document.documentElement.classList.add('dark');
  }, []);
}

const Home = () => {
  useScrollReveal();
  useTheme();
  return (
    <div className="App bg-background text-foreground">
      <SEO
        title="Two Sisters Beauty Salon Richmond Christchurch | Facials, Brows & Waxing"
        description="Visit Two Sisters Beauty Salon in Richmond, Christchurch. Professional facials, eyebrow threading, tinting, waxing, manicures & pedicures. Book online today."
        canonical="https://www.twosistersbeautysalon.co.nz/"
      />
      <div id="scroll-progress" />
      <CursorOrb />
      <Navigation />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <BeforeAfter />
        <Experience />
        <Process />
        <Gallery />
        <Pricing />
        <FAQ />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <Toaster />
      <Concierge />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/treatments" element={<Treatments />} />
        <Route path="/treatments/facials" element={<ServiceDetail serviceKey="facials" />} />
        <Route path="/treatments/threading" element={<ServiceDetail serviceKey="threading" />} />
        <Route path="/treatments/brows" element={<ServiceDetail serviceKey="brows" />} />
        <Route path="/treatments/waxing" element={<ServiceDetail serviceKey="waxing" />} />
        <Route path="/treatments/manicures" element={<ServiceDetail serviceKey="manicures" />} />
        <Route path="/treatments/pedicures" element={<ServiceDetail serviceKey="pedicures" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
