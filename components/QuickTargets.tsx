'use client';

import { Target } from 'lucide-react';

interface QuickTargetsProps {
  currentTarget: number;
  onSelectTarget: (target: number) => void;
}

const PRESET_TARGETS = [70, 75, 80, 85, 90, 95];

export default function QuickTargets({ currentTarget, onSelectTarget }: QuickTargetsProps) {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Target className="w-4 h-4 text-cyan-400" />
          <span>Quick Target Selection</span>
        </div>
        <span className="text-xs font-black text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 w-fit">
          Target Goal: {currentTarget}%
        </span>
      </div>

      {/* Preset Target Buttons */}
      <div className="grid grid-cols-6 gap-2 mb-4">
        {PRESET_TARGETS.map((target) => {
          const isSelected = currentTarget === target;
          return (
            <button
              key={target}
              onClick={() => onSelectTarget(target)}
              className={`py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all border ${
                isSelected
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white border-cyan-400 shadow-glow scale-105'
                  : 'bg-slate-800/80 text-slate-300 border-white/5 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {target}%
            </button>
          );
        })}
      </div>

      {/* Target Range Slider */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-slate-500">50%</span>
        <input
          type="range"
          min="50"
          max="100"
          step="1"
          value={currentTarget}
          onChange={(e) => onSelectTarget(Number(e.target.value))}
          className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
        />
        <span className="text-xs font-bold text-slate-500">100%</span>
      </div>
    </div>
  );
}
