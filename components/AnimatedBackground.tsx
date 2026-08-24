'use client';

import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-slate-950 transition-colors duration-500">
      {/* Mesh Gradient 1: Top Right Neon Cyan/Indigo Blob */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          x: [0, 50, 0],
          y: [0, -40, 0],
          rotate: [0, 45, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-40 -right-40 w-[34rem] h-[34rem] rounded-full bg-gradient-to-br from-cyan-500/25 via-indigo-600/20 to-purple-600/20 blur-[120px] opacity-70"
      />

      {/* Mesh Gradient 2: Center Left Electric Purple/Violet Blob */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -60, 0],
          y: [0, 50, 0],
          rotate: [0, -45, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/3 -left-40 w-[38rem] h-[38rem] rounded-full bg-gradient-to-tr from-purple-600/20 via-cyan-500/20 to-emerald-500/15 blur-[140px] opacity-60"
      />

      {/* Mesh Gradient 3: Bottom Right Ambient Emerald/Cyan Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-32 -right-20 w-[30rem] h-[30rem] rounded-full bg-gradient-to-tl from-emerald-500/15 via-cyan-600/20 to-indigo-600/20 blur-[130px] opacity-65"
      />

      {/* Floating Particle Orbs */}
      <motion.div
        animate={{
          y: [0, -100, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_15px_#06b6d4]"
      />
      <motion.div
        animate={{
          y: [0, -120, 0],
          opacity: [0.1, 0.5, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-1/2 left-3/4 w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_20px_#a855f7]"
      />
      <motion.div
        animate={{
          y: [0, -80, 0],
          opacity: [0.2, 0.7, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
        className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_15px_#10b981]"
      />

      {/* Cybernetic Dot Matrix Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />
    </div>
  );
}
