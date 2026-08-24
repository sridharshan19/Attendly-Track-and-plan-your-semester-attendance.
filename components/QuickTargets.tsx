'use client';

import { Target } from 'lucide-react';

interface QuickTargetsProps {
  currentTarget: number;
  onSelectTarget: (target: number) => void;
}

const PRESET_TARGETS = [70, 75, 80, 85, 90, 95];

export default function QuickTargets({ currentTarget, onSelectTarget }: QuickTargetsProps) {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-white/5 backdrop-blur-md mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Target className="w-4 h-4 text-slate-200" />
          <span>Target Selection</span>
        </div>
        <span className="text-xs font-black text-white bg-white/10 px-3 py-1 rounded-full border border-white/10 w-fit">
          Target: {currentTarget}%
        </span>
      </div>

      <div className="grid grid-cols-6 gap-2 mb-4">
        {PRESET_TARGETS.map((target) => {
          const isSelected = currentTarget === target;
          return (
            <button
              key={target}
              onClick={() => onSelectTarget(target)}
              className={`py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all border ${
                isSelected
                  ? 'bg-white text-slate-950 border-white shadow-glow scale-105'
                  : 'bg-slate-800/80 text-slate-300 border-white/5 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {target}%
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-slate-500">50%</span>
        <input
          type="range"
          min="50"
          max="100"
          step="1"
          value={currentTarget}
          onChange={(e) => onSelectTarget(Number(e.target.value))}
          className="flex-1 h-1.5 bg-slate-850 bg-slate-800 rounded-lg appearance-none cursor-pointer focus:outline-none"
        />
        <span className="text-xs font-bold text-slate-500">100%</span>
      </div>
    </div>
  );
}
