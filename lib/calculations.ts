import { AttendanceStatus, CalculationResults, CalculatorInputs } from '../types/attendance';

export function calculateAttendancePercentage(attended: number, total: number): number {
  if (total <= 0 || attended < 0) return 0;
  if (attended > total) return 100;
  return (attended / total) * 100;
}

export function calculateSafeSkips(attended: number, total: number, target: number): number {
  if (total <= 0 || target <= 0 || target > 100) return 0;
  
  const currentPct = calculateAttendancePercentage(attended, total);
  if (currentPct < target) return 0;

  const maxSkips = Math.floor((100 * attended) / target - total);
  return Math.max(0, maxSkips);
}

export function calculateRequiredClasses(
  attended: number,
  total: number,
  target: number
): { required: number; isAchievable: boolean } {
  if (target <= 0) return { required: 0, isAchievable: true };
  if (target > 100) return { required: 0, isAchievable: false };
  
  const currentPct = calculateAttendancePercentage(attended, total);
  if (currentPct >= target) return { required: 0, isAchievable: true };

  if (target === 100) {
    if (attended < total) {
      return { required: Infinity, isAchievable: false };
    }
    return { required: 0, isAchievable: true };
  }

  const numerator = target * total - 100 * attended;
  const denominator = 100 - target;
  
  if (denominator <= 0) return { required: Infinity, isAchievable: false };
  
  const required = Math.ceil(numerator / denominator);
  return {
    required: Math.max(0, required),
    isAchievable: true,
  };
}

export function calculateProjectedAttendance(
  attended: number,
  total: number,
  futureClasses: number = 0,
  expectedFutureAttendance: number = 100
): { projectedPercentage: number; totalAfter: number; attendedAfter: number } {
  const safeFutureClasses = Math.max(0, futureClasses);
  const safeRate = Math.min(100, Math.max(0, expectedFutureAttendance));
  
  const futurePresent = (safeFutureClasses * safeRate) / 100;
  const attendedAfter = attended + futurePresent;
  const totalAfter = total + safeFutureClasses;
  
  const projectedPercentage = totalAfter > 0 ? (attendedAfter / totalAfter) * 100 : 0;
  
  return {
    projectedPercentage,
    totalAfter,
    attendedAfter,
  };
}

export function getAttendanceStatus(currentPercentage: number, targetPercentage: number): {
  status: AttendanceStatus;
  message: string;
} {
  if (currentPercentage >= targetPercentage) {
    return {
      status: 'healthy',
      message: "You're on track to meet your target.",
    };
  }
  
  if (currentPercentage >= targetPercentage - 5) {
    return {
      status: 'warning',
      message: "You're slightly below target. Attend upcoming classes to recover.",
    };
  }

  return {
    status: 'critical',
    message: "Below target. Prioritize upcoming classes.",
  };
}

export function evaluateAttendance(inputs: CalculatorInputs): CalculationResults {
  const safeAttended = Math.max(0, inputs.attended);
  const safeTotal = Math.max(0, inputs.total);
  const safeTarget = Math.min(100, Math.max(1, inputs.target));

  const currentPercentage = calculateAttendancePercentage(safeAttended, safeTotal);
  const safeSkips = calculateSafeSkips(safeAttended, safeTotal, safeTarget);
  const { required, isAchievable } = calculateRequiredClasses(safeAttended, safeTotal, safeTarget);
  const { status, message } = getAttendanceStatus(currentPercentage, safeTarget);

  const projection = calculateProjectedAttendance(
    safeAttended,
    safeTotal,
    inputs.futureClasses || 0,
    inputs.expectedFutureAttendance ?? 100
  );

  const maxPossiblePercentage = safeTotal === 0 ? 100 : ((safeAttended + 100) / (safeTotal + 100)) * 100;

  return {
    currentPercentage: Number(currentPercentage.toFixed(2)),
    targetPercentage: safeTarget,
    status,
    statusMessage: message,
    safeSkips,
    requiredClasses: required === Infinity ? -1 : required,
    projectedPercentage: Number(projection.projectedPercentage.toFixed(2)),
    totalClassesAfterFuture: projection.totalAfter,
    attendedClassesAfterFuture: Number(projection.attendedAfter.toFixed(1)),
    isTargetAchievable: isAchievable,
    maxPossiblePercentage: Number(maxPossiblePercentage.toFixed(2)),
  };
}
