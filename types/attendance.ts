export type CalculatorMode = 'current' | 'bunk' | 'recovery' | 'projection';

export type AttendanceStatus = 'healthy' | 'warning' | 'critical';

export interface CalculatorInputs {
  attended: number;
  total: number;
  target: number;
  futureClasses?: number;
  expectedFutureAttendance?: number;
  classesPerDay?: number;
}

export interface CalculationResults {
  currentPercentage: number;
  targetPercentage: number;
  status: AttendanceStatus;
  statusMessage: string;
  safeSkips: number;
  requiredClasses: number;
  projectedPercentage?: number;
  totalClassesAfterFuture?: number;
  attendedClassesAfterFuture?: number;
  isTargetAchievable: boolean;
  maxPossiblePercentage: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}
