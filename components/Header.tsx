'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CalendarCheck, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = [
  { name: 'Calculator', href: '/#calculator' },
  { name: 'Trajectory', href: '/#trajectory' },
  { name: 'Formulas', href: '/formulas' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-slate-950/80 backdrop-blur-2xl border-b border-white/5 shadow-xl'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-200 to-slate-500 flex items-center justify-center text-slate-950 shadow-sm group-hover:scale-105 transition-transform">
            <CalendarCheck className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tight text-white flex items-center gap-1.5">
              Attendly
              <span className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" />
            </span>
            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase -mt-1">
              Attendance Calculator
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-white/5 backdrop-blur-md">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/#calculator"
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <span>Calculate</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-900 text-slate-200 border border-white/5"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-white/5 px-6 py-6 space-y-4"
          >
            <nav className="flex flex-col space-y-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-bold text-slate-200 hover:text-white py-1.5"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="pt-3 border-t border-white/5">
              <Link
                href="/#calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-slate-950 font-bold text-sm shadow-md"
              >
                <span>Start Calculation</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
