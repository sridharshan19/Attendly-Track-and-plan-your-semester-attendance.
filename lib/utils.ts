import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPercentage(value: number): string {
  if (isNaN(value)) return '0.00%';
  return `${value.toFixed(2)}%`;
}

export function getStatusColorClass(status: 'healthy' | 'warning' | 'critical'): {
  bg: string;
  text: string;
  border: string;
  badge: string;
  ring: string;
} {
  switch (status) {
    case 'healthy':
      return {
        bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
        text: 'text-emerald-600 dark:text-emerald-400',
        border: 'border-emerald-500/30',
        badge: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
        ring: '#10b981',
      };
    case 'warning':
      return {
        bg: 'bg-amber-500/10 dark:bg-amber-500/20',
        text: 'text-amber-600 dark:text-amber-400',
        border: 'border-amber-500/30',
        badge: 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30',
        ring: '#f59e0b',
      };
    case 'critical':
      return {
        bg: 'bg-rose-500/10 dark:bg-rose-500/20',
        text: 'text-rose-600 dark:text-rose-400',
        border: 'border-rose-500/30',
        badge: 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/30',
        ring: '#f43f5e',
      };
  }
}
