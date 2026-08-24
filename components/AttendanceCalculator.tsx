'use client';

import { motion } from 'framer-motion';
import { AlertCircle, Minus, Plus, RefreshCw, Zap } from 'lucide-react';
import { useState } from 'react';
import { useAttendance } from '../hooks/useAttendance';
import { CalculatorMode } from '../types/attendance';
import AttendanceChart from './AttendanceChart';
import CalculatorTabs from './CalculatorTabs';
import QuickTargets from './QuickTargets';
import ResultCard from './ResultCard';

const QUICK_PRESETS = [
  { label: '45 / 60 Days', attended: 45, total: 60, target: 75 },
  { label: '30 / 50 Days', attended: 30, total: 50, target: 75 },
  { label: '50 / 60 Days', attended: 50, total: 60, target: 80 },
  { label: '18 / 25 Days', attended: 18, total: 25, target: 75 },
];

export default function AttendanceCalculator() {
  const [activeTab, setActiveTab] = useState<CalculatorMode>('current');
  const { inputs, results, updateInput, setTarget, resetInputs, setInputs } = useAttendance();
  const [inputErrors, setInputErrors] = useState<{ attended?: string; total?: string }>({});

  const handleAttendedChange = (val: number) => {
    if (val < 0) return;
    if (val > inputs.total) {
      setInputErrors((prev) => ({
        ...prev,
        attended: 'Attended days cannot exceed total days.',
      }));
    } else {
      setInputErrors((prev) => ({ ...prev, attended: undefined }));
    }
    updateInput('attended', val);
  };

  const handleTotalChange = (val: number) => {
    if (val < 0) return;
    if (val < inputs.attended) {
      updateInput('attended', val);
    }
    setInputErrors((prev) => ({ ...prev, attended: undefined }));
    updateInput('total', val);
  };



  const handleApplyPreset = (preset: typeof QUICK_PRESETS[0]) => {
    setInputErrors({});
    setInputs({
      attended: preset.attended,
      total: preset.total,
      target: preset.target,
      futureClasses: 10,
      expectedFutureAttendance: 100,
    });
  };

  return (
    <section id="calculator" className="py-2 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1 mr-1">
          <Zap className="w-3 h-3 text-amber-400" />
          Presets:
        </span>
        {QUICK_PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => handleApplyPreset(preset)}
            className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900/90 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 text-[10px] font-extrabold border border-slate-205 border-slate-200 dark:border-white/10 transition-all"
          >
            {preset.label}
          </button>
        ))}
      </div>

      <CalculatorTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch animate-fade-in">
        <div className="lg:col-span-7">
          <div className="p-5 sm:p-6 rounded-3xl glass-panel shadow-2xl h-full flex flex-col justify-between">
            <div>
              <QuickTargets currentTarget={inputs.target} onSelectTarget={setTarget} />

              <div className="space-y-4 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-black text-slate-700 dark:text-slate-300 block mb-1">
                      Days Attended (Present)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleAttendedChange(Math.max(0, inputs.attended - 1))}
                        className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all border border-slate-200 dark:border-white/5 active:scale-95"
                        aria-label="Decrease attended"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <input
                        type="number"
                        min="0"
                        max={inputs.total}
                        value={inputs.attended === 0 ? '' : inputs.attended}
                        onChange={(e) => handleAttendedChange(Number(e.target.value))}
                        placeholder="e.g. 45"
                        className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-extrabold text-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all text-center"
                      />
                      <button
                        type="button"
                        onClick={() => handleAttendedChange(inputs.attended + 1)}
                        className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all border border-slate-200 dark:border-white/5 active:scale-95"
                        aria-label="Increase attended"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {inputErrors.attended && (
                      <p className="text-[10px] text-rose-400 font-semibold flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        {inputErrors.attended}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-black text-slate-700 dark:text-slate-300 block mb-1">
                      Total Days Conducted
                    </label>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleTotalChange(Math.max(0, inputs.total - 1))}
                        className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all border border-slate-200 dark:border-white/5 active:scale-95"
                        aria-label="Decrease total"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <input
                        type="number"
                        min="0"
                        value={inputs.total === 0 ? '' : inputs.total}
                        onChange={(e) => handleTotalChange(Number(e.target.value))}
                        placeholder="e.g. 60"
                        className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-extrabold text-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all text-center"
                      />
                      <button
                        type="button"
                        onClick={() => handleTotalChange(inputs.total + 1)}
                        className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all border border-slate-200 dark:border-white/5 active:scale-95"
                        aria-label="Increase total"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>


                {activeTab === 'projection' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-3 pt-3 border-t border-slate-200 dark:border-white/10"
                  >
                    <div>
                      <label className="text-xs font-black text-slate-700 dark:text-slate-300 block mb-1">
                        Upcoming Future Classes Count
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={inputs.futureClasses || 0}
                        onChange={(e) => updateInput('futureClasses', Number(e.target.value))}
                        className="w-full px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-black text-slate-700 dark:text-slate-300 block mb-1">
                        Expected Attendance in Future Classes ({inputs.expectedFutureAttendance || 100}%)
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={inputs.expectedFutureAttendance || 100}
                        onChange={(e) => updateInput('expectedFutureAttendance', Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer focus:outline-none"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/5 mt-4">
              <button
                type="button"
                onClick={resetInputs}
                className="flex items-center gap-1 text-[10px] font-extrabold text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset values</span>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <ResultCard
            results={results}
            attended={inputs.attended}
            total={inputs.total}
          />
        </div>
      </div>

      <AttendanceChart
        attended={inputs.attended}
        total={inputs.total}
        target={inputs.target}
      />
    </section>
  );
}
