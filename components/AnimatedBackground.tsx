'use client';

import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-slate-950 transition-colors duration-500">
      {/* Mesh Gradient 1: Cold Silver / Steel Blue Orb */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-40 -right-40 w-[32rem] h-[32rem] rounded-full bg-gradient-to-br from-slate-400/10 via-slate-600/5 to-sky-500/10 blur-[130px] opacity-80"
      />

      {/* Mesh Gradient 2: Ice Blue / Platinum Gray Orb */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/3 -left-40 w-[36rem] h-[36rem] rounded-full bg-gradient-to-tr from-sky-500/10 via-slate-500/5 to-slate-400/5 blur-[150px] opacity-70"
      />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />
    </div>
  );
}
