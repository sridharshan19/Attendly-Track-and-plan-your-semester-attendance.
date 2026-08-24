import { describe, expect, it } from 'vitest';
import {
  calculateAttendancePercentage,
  calculateProjectedAttendance,
  calculateRequiredClasses,
  calculateSafeSkips,
  evaluateAttendance,
  getAttendanceStatus,
} from '../lib/calculations';

describe('Attendly Calculation Logic Tests', () => {
  it('1. Calculates current attendance percentage correctly (45 / 60 = 75%)', () => {
    const result = calculateAttendancePercentage(45, 60);
    expect(result).toBe(75);
  });

  it('2. Calculates decimal attendance percentage correctly (50 / 60 = 83.33%)', () => {
    const result = calculateAttendancePercentage(50, 60);
    expect(Number(result.toFixed(2))).toBe(83.33);
  });

  it('3. Calculates maximum safe skips at 75% target (45 / 60)', () => {
    // At 45/60 (75%), user can miss 0 classes to stay >= 75%
    const skipsAt75 = calculateSafeSkips(45, 60, 75);
    expect(skipsAt75).toBe(0);

    // At 50/60 (83.33%), user can miss (100 * 50 / 75) - 60 = 66.66 - 60 = 6 classes
    const skipsAt83 = calculateSafeSkips(50, 60, 75);
    expect(skipsAt83).toBe(6);
  });

  it('4. Calculates required classes to reach 75% target (30 / 50 = 60%)', () => {
    // Attended: 30, Total: 50 (60%). Target: 75%
    // Formula: ceil((75*50 - 100*30) / (100 - 75)) = ceil((3750 - 3000)/25) = ceil(750/25) = 30
    const { required, isAchievable } = calculateRequiredClasses(30, 50, 75);
    expect(isAchievable).toBe(true);
    expect(required).toBe(30);

    // Check verification: (30+30)/(50+30) = 60/80 = 75%
    expect((30 + 30) / (50 + 30)).toBe(0.75);
  });

  it('5. Handles already above target gracefully', () => {
    const { required } = calculateRequiredClasses(50, 60, 75);
    expect(required).toBe(0);
  });

  it('6. Handles exactly at target', () => {
    const { required } = calculateRequiredClasses(45, 60, 75);
    expect(required).toBe(0);
    expect(calculateSafeSkips(45, 60, 75)).toBe(0);
  });

  it('7. Handles below target status detection', () => {
    const status1 = getAttendanceStatus(70, 75);
    expect(status1.status).toBe('warning');

    const status2 = getAttendanceStatus(60, 75);
    expect(status2.status).toBe('critical');

    const status3 = getAttendanceStatus(75, 75);
    expect(status3.status).toBe('healthy');
  });

  it('8. Handles 100% target correctly', () => {
    // If missed even 1 class (45/60), 100% target is unachievable
    const { required, isAchievable } = calculateRequiredClasses(45, 60, 100);
    expect(isAchievable).toBe(false);
    expect(required).toBe(Infinity);

    // If 60/60, 100% is achievable with 0 required
    const perfect = calculateRequiredClasses(60, 60, 100);
    expect(perfect.isAchievable).toBe(true);
    expect(perfect.required).toBe(0);
  });

  it('9. Handles invalid / negative / out of bounds inputs gracefully', () => {
    const p1 = calculateAttendancePercentage(-5, 10);
    expect(p1).toBe(0);

    const p2 = calculateAttendancePercentage(15, 10);
    expect(p2).toBe(100);

    const skips = calculateSafeSkips(-5, 0, 75);
    expect(skips).toBe(0);
  });

  it('10. Handles zero total classes without crashing (0 / 0)', () => {
    const evaluation = evaluateAttendance({
      attended: 0,
      total: 0,
      target: 75,
    });
    expect(evaluation.currentPercentage).toBe(0);
    expect(evaluation.safeSkips).toBe(0);
    expect(evaluation.requiredClasses).toBe(0);
  });

  it('11. Calculates projected attendance with future classes', () => {
    // Current: 40/50 (80%). Future 10 classes with 100% expected attendance
    const projection = calculateProjectedAttendance(40, 50, 10, 100);
    expect(projection.projectedPercentage).toBe(83.33333333333334);
    expect(projection.totalAfter).toBe(60);
    expect(projection.attendedAfter).toBe(50);
  });
});
