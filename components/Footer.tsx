import { CalendarCheck, Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-slate-200 to-slate-500 flex items-center justify-center text-slate-950 font-bold shadow-sm">
            <CalendarCheck className="w-4 h-4" />
          </div>
          <span className="font-black text-xl tracking-tight text-white">
            Attendly
          </span>
        </Link>

        {/* Center Quick Navigation Links - Removed Milestones */}
        <div className="flex items-center gap-6 text-xs font-bold text-slate-400">
          <Link href="/#calculator" className="hover:text-white transition-colors">
            Calculator
          </Link>
          <Link href="/formulas" className="hover:text-white transition-colors">
            Formulas
          </Link>
        </div>

        <p className="text-[11px] text-slate-500 font-medium">
          © 2026 Attendly. Track and plan your semester attendance.
        </p>
      </div>
    </footer>
  );
}
