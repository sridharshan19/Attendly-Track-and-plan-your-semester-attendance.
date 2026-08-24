'use client';

import { useMemo, useState } from 'react';
import { evaluateAttendance } from '../lib/calculations';
import { CalculationResults, CalculatorInputs } from '../types/attendance';

const DEFAULT_INPUTS: CalculatorInputs = {
  attended: 45,
  total: 60,
  target: 75,
  futureClasses: 10,
  expectedFutureAttendance: 100,
};

export function useAttendance(initialInputs: Partial<CalculatorInputs> = {}) {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    ...DEFAULT_INPUTS,
    ...initialInputs,
  });

  const results: CalculationResults = useMemo(() => {
    return evaluateAttendance(inputs);
  }, [inputs]);

  const updateInput = (key: keyof CalculatorInputs, value: number) => {
    setInputs((prev) => {
      const updated = { ...prev, [key]: value };
      // Enforce attended <= total constraint if total drops below attended
      if (key === 'total' && value < updated.attended) {
        updated.attended = value;
      }
      return updated;
    });
  };

  const setTarget = (targetPercentage: number) => {
    updateInput('target', targetPercentage);
  };

  const resetInputs = () => {
    setInputs(DEFAULT_INPUTS);
  };

  return {
    inputs,
    results,
    updateInput,
    setTarget,
    resetInputs,
    setInputs,
  };
}
