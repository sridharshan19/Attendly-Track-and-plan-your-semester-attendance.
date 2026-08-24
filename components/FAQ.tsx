'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { FAQItem } from '../types/attendance';

const FAQS: FAQItem[] = [
  {
    question: 'How is current attendance percentage calculated?',
    answer:
      'Attendance Percentage = (Present Classes / Total Classes) × 100. For example, 45 present out of 60 conducted classes equals (45 / 60) × 100 = 75.00%.',
  },
  {
    question: 'How are safe bunks calculated?',
    answer:
      'Safe bunks is the maximum number of classes you can miss while keeping your attendance at or above your target. Formula: Safe Skips = Math.floor((100 × Present / Target) - Total).',
  },
  {
    question: 'How are recovery classes calculated?',
    answer:
      'Recovery classes is the minimum number of consecutive future classes you must attend to raise your attendance to your target percentage. Formula: Required Classes = Math.ceil((Target × Total - 100 × Present) / (100 - Target)).',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-6 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <span className="px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 inline-block mb-1.5">
          Formula Reference
        </span>
        <h2 className="text-2xl font-black text-white tracking-tight">
          Calculation Guide
        </h2>
      </div>

      <div className="space-y-2">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.question}
              className="rounded-2xl glass-panel shadow-lg overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-white text-sm focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="flex items-center gap-3">
                  <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-cyan-400' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-4 pb-4 text-slate-300 text-xs leading-relaxed border-t border-white/5 pt-2"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
