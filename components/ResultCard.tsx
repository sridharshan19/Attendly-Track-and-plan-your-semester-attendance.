'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';
import { CalculationResults } from '../types/attendance';
import AnimatedCounter from './AnimatedCounter';
import AttendanceRing from './AttendanceRing';

interface ResultCardProps {
  results: CalculationResults;
  attended: number;
  total: number;
}

export default function ResultCard({ results, attended, total }: ResultCardProps) {
  const getStatusBadge = () => {
    switch (results.status) {
      case 'healthy':
        return {
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
          label: 'Healthy Status',
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="w-4 h-4 text-amber-400" />,
          label: 'Warning Status',
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        };
      case 'critical':
        return {
          icon: <XCircle className="w-4 h-4 text-rose-400" />,
          label: 'Critical Status',
          badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        };
    }
  };

  const statusBadge = getStatusBadge();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 sm:p-8 rounded-3xl glass-panel shadow-2xl flex flex-col justify-between relative overflow-hidden"
    >
      <div className="flex flex-col items-center">
        {/* Status Badge */}
        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${statusBadge.badge} mb-6`}>
          {statusBadge.icon}
          <span>{statusBadge.label}</span>
        </div>

        {/* Radial Attendance Gauge */}
        <AttendanceRing
          percentage={results.currentPercentage}
          target={results.targetPercentage}
          status={results.status}
        />

        {/* Dynamic Status Text */}
        <p className="text-sm font-medium text-slate-300 text-center mt-6 max-w-xs leading-relaxed">
          {results.statusMessage}
        </p>
      </div>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-2 gap-3 mt-8 pt-6 border-t border-white/10">
        {/* Attended / Total */}
        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5">
          <span className="text-xs text-slate-400 font-semibold block">Attended Record</span>
          <span className="text-lg font-extrabold text-white">
            {attended} / {total}
          </span>
        </div>

        {/* Target Goal */}
        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5">
          <span className="text-xs text-slate-400 font-semibold block">Target Goal</span>
          <span className="text-lg font-extrabold text-white">
            {results.targetPercentage}%
          </span>
        </div>

        {/* Safe Skips */}
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
          <span className="text-xs text-emerald-300 font-bold block">Safe to Bunk</span>
          <AnimatedCounter
            value={results.safeSkips}
            decimals={0}
            className="text-2xl font-black text-emerald-400"
          />
          <span className="text-[11px] text-emerald-300/80 block font-medium">
            {results.safeSkips === 1 ? 'class can be missed' : 'classes can be missed'}
          </span>
        </div>

        {/* Required Classes */}
        <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
          <span className="text-xs text-cyan-300 font-bold block">Needed to Attend</span>
          {results.requiredClasses === -1 ? (
            <span className="text-sm font-extrabold text-rose-400">Unachievable</span>
          ) : (
            <AnimatedCounter
              value={results.requiredClasses}
              decimals={0}
              className="text-2xl font-black text-cyan-400"
            />
          )}
          <span className="text-[11px] text-cyan-300/80 block font-medium">
            {results.requiredClasses === 0
              ? 'Already on target!'
              : results.requiredClasses === -1
              ? 'Target exceeds max'
              : 'consecutive classes'}
          </span>
        </div>
      </div>

      {results.projectedPercentage !== undefined && results.projectedPercentage > 0 && (
        <div className="mt-4 p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 text-xs text-slate-300 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <span>
            Projected end-of-semester attendance:{' '}
            <strong className="text-cyan-400 font-bold">
              {results.projectedPercentage}%
            </strong>
          </span>
        </div>
      )}
    </motion.div>
  );
}
