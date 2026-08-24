'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function useScrollAnimation(once = true, amount = 0.2) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  return { ref, isInView };
}
