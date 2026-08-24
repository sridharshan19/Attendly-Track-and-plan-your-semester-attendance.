'use client';

import { motion } from 'framer-motion';
import { Target, Check } from 'lucide-react';
import { calculateAttendancePercentage, calculateRequiredClasses, calculateSafeSkips } from '../lib/calculations';

interface AttendanceChartProps {
  attended: number;
  total: number;
  target: number;
}

export default function AttendanceChart({ attended, total, target }: AttendanceChartProps) {
  const currentPct = Number(calculateAttendancePercentage(attended, total).toFixed(2));
  const milestones = [70, 75, 80, 85, 90, 95];

  return (
    <section id="trajectory" className="p-5 sm:p-6 rounded-3xl glass-panel shadow-2xl mt-4">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-white/5 text-white">
            <Target className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white">Target Milestone Gauges</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Current attendance ({currentPct}%) vs key benchmarks.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span>Target Goal Marker</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {milestones.map((t) => {
          const skips = calculateSafeSkips(attended, total, t);
          const { required } = calculateRequiredClasses(attended, total, t);
          const isAbove = currentPct >= t;
          const isCurrentTarget = t === target;

          const radius = 34;
          const center = 40;
          const size = 80;
          const circumference = 2 * Math.PI * radius;

          const progressRatio = Math.min(1, currentPct / 100);
          const strokeDashoffset = circumference - progressRatio * circumference;

          const targetAngle = -Math.PI / 2 + (t / 100) * 2 * Math.PI;
          const markerX = Number((center + radius * Math.cos(targetAngle)).toFixed(4));
          const markerY = Number((center + radius * Math.sin(targetAngle)).toFixed(4));

          return (
            <motion.div
              key={t}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`relative p-5 rounded-2xl border flex flex-col items-center justify-between text-center gap-4 transition-all duration-300 ${
                isCurrentTarget
                  ? 'bg-white/5 border-white/20 shadow-glow'
                  : 'bg-slate-900/40 border-white/5 hover:border-white/10'
              }`}
            >
              {isCurrentTarget && (
                <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
              )}

              <div>
                <span className="text-sm font-black text-slate-100 block">{t}% Goal</span>
                <span
                  className={`text-[9px] font-bold uppercase tracking-wider block mt-1 ${
                    isCurrentTarget ? 'text-sky-400' : 'text-slate-500'
                  }`}
                >
                  {isCurrentTarget ? 'Active Target' : 'Benchmark'}
                </span>
              </div>

              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg width={size} height={size} className="transform -rotate-90">
                  <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    className="stroke-slate-800/60 fill-transparent"
                    strokeWidth="4.5"
                  />
                  <motion.circle
                    cx={center}
                    cy={center}
                    r={radius}
                    className={`fill-transparent transition-all duration-700 ${
                      isAbove
                        ? 'stroke-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.3)]'
                        : 'stroke-sky-500 drop-shadow-[0_0_6px_rgba(14,165,233,0.3)]'
                    }`}
                    strokeWidth="5"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    strokeLinecap="round"
                  />
                  <circle
                    cx={markerX}
                    cy={markerY}
                    r="4"
                    className="fill-sky-400 stroke-slate-950 stroke-1 drop-shadow-[0_0_6px_#0ea5e9]"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-base font-black text-white">{t}%</span>
                  <div className="mt-0.5 flex justify-center">
                    {isAbove ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <span className="text-[10px] font-bold text-sky-400">
                        -{Math.ceil(t - currentPct)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 pt-2.5 w-full">
                {isAbove ? (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Safe to Bunk
                    </span>
                    <span className="text-sm font-extrabold text-emerald-400 block mt-0.5">
                      {skips} {skips === 1 ? 'Class' : 'Classes'}
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Need to Attend
                    </span>
                    <span className="text-sm font-extrabold text-sky-400 block mt-0.5">
                      {required} {required === 1 ? 'Class' : 'Classes'}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
