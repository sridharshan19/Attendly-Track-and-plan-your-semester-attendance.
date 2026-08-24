'use client';

import { motion } from 'framer-motion';
import { Calculator, Calendar, ShieldCheck, TrendingUp } from 'lucide-react';
import { CalculatorMode } from '../types/attendance';

interface CalculatorTabsProps {
  activeTab: CalculatorMode;
  onTabChange: (mode: CalculatorMode) => void;
}

const TABS: { id: CalculatorMode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'current', label: 'Current Attendance', icon: Calculator },
  { id: 'bunk', label: 'Safe Skips (Bunks)', icon: ShieldCheck },
  { id: 'recovery', label: 'Recovery Classes', icon: Calendar },
  { id: 'projection', label: 'Future Projection', icon: TrendingUp },
];

export default function CalculatorTabs({ activeTab, onTabChange }: CalculatorTabsProps) {
  return (
    <div className="flex p-1.5 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-xl max-w-3xl mx-auto mb-8 overflow-x-auto no-scrollbar shadow-xl">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative flex-1 flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap focus:outline-none z-10 ${
              isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeCalculatorTab"
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-purple-500/30 border border-cyan-500/40 rounded-xl shadow-glow -z-10"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'opacity-60'}`} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
