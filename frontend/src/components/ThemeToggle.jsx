import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ className = '' }) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem('tsb-theme');
    const isDark = saved === 'dark';
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('tsb-theme', next ? 'dark' : 'light');
  };
  return (
    <button
      onClick={toggle}
      aria-label="Toggle color theme"
      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/70 backdrop-blur transition-all hover:border-[hsl(var(--gold))] hover:text-[hsl(var(--gold))] ${className}`}
    >
      <Sun className={`h-4 w-4 transition-all duration-500 ${dark ? 'scale-0 -rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`} />
      <Moon className={`absolute h-4 w-4 transition-all duration-500 ${dark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-90 opacity-0'}`} />
    </button>
  );
}
