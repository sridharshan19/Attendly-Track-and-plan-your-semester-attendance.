import { z } from 'zod';

export const CalculatorInputSchema = z
  .object({
    attended: z
      .number({ invalid_type_error: 'Classes attended must be a number' })
      .min(0, 'Classes attended cannot be negative'),
    total: z
      .number({ invalid_type_error: 'Total classes must be a number' })
      .min(0, 'Total classes cannot be negative'),
    target: z
      .number({ invalid_type_error: 'Target percentage must be a number' })
      .min(1, 'Target must be at least 1%')
      .max(100, 'Target cannot exceed 100%'),
    futureClasses: z.number().min(0, 'Future classes cannot be negative').optional(),
    expectedFutureAttendance: z
      .number()
      .min(0, 'Expected attendance cannot be negative')
      .max(100, 'Expected attendance cannot exceed 100%')
      .optional(),
  })
  .refine((data) => data.attended <= data.total, {
    message: 'Attended classes cannot exceed total classes',
    path: ['attended'],
  });
