'use client';

import { motion } from 'framer-motion';
import { AttendanceStatus } from '../types/attendance';
import AnimatedCounter from './AnimatedCounter';

interface AttendanceRingProps {
  percentage: number;
  target: number;
  status: AttendanceStatus;
  size?: number;
  strokeWidth?: number;
}

export default function AttendanceRing({
  percentage,
  target,
  status,
  size = 220,
  strokeWidth = 16,
}: AttendanceRingProps) {
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const normalizedPercentage = Math.min(100, Math.max(0, percentage));
  const strokeDashoffset = circumference - (normalizedPercentage / 100) * circumference;

  const getRingColor = () => {
    switch (status) {
      case 'healthy':
        return { stroke: '#10b981', glow: 'shadow-[0_0_30px_rgba(16,185,129,0.15)] dark:shadow-[0_0_30px_rgba(16,185,129,0.25)]', text: 'text-emerald-550 text-emerald-600 dark:text-emerald-400' };
      case 'warning':
        return { stroke: '#f59e0b', glow: 'shadow-[0_0_30px_rgba(245,158,11,0.15)] dark:shadow-[0_0_30px_rgba(245,158,11,0.25)]', text: 'text-amber-600 dark:text-amber-400' };
      case 'critical':
        return { stroke: '#f43f5e', glow: 'shadow-[0_0_30px_rgba(244,63,94,0.15)] dark:shadow-[0_0_30px_rgba(244,63,94,0.25)]', text: 'text-rose-600 dark:text-rose-400' };
    }
  };

  const ringStyle = getRingColor();

  return (
    <div className={`relative flex flex-col items-center justify-center rounded-full p-2 ${ringStyle.glow} transition-shadow duration-500`}>
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id="healthyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>
          <linearGradient id="warningGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="criticalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>
        </defs>

        {/* Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="rgba(0, 0, 0, 0.05)"
          className="dark:stroke-white/5"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Progress Arc */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={
            status === 'healthy'
              ? 'url(#healthyGradient)'
              : status === 'warning'
              ? 'url(#warningGradient)'
              : 'url(#criticalGradient)'
          }
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          style={{
            transition: 'stroke-dashoffset 0.8s ease-out',
          }}
        />
      </svg>

      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-[11px] uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400">
          Attendance
        </span>
        <AnimatedCounter
          value={percentage}
          decimals={2}
          suffix="%"
          className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
        />
        <motion.span
          key={target}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-sky-700 dark:text-sky-400 font-bold mt-1 bg-slate-100 dark:bg-white/5 px-3 py-0.5 rounded-full border border-slate-200 dark:border-white/10"
        >
          Target: {target}%
        </motion.span>
      </div>
    </div>
  );
}
