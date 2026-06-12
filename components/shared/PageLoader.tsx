'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageLoaderProps {
  onComplete: () => void;
}

export function PageLoader({ onComplete }: PageLoaderProps) {
  const [phase, setPhase] = useState<'draw' | 'fade' | 'done'>('draw');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const fadeTimer = setTimeout(() => setPhase('fade'), 1500);
    const doneTimer = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 2200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-obsidian"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-center">
            <svg
              viewBox="0 0 300 80"
              className="w-64 md:w-80 mx-auto"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.text
                x="150"
                y="45"
                textAnchor="middle"
                className="font-heading text-3xl fill-none stroke-gold"
                style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '0.15em' }}
                initial={{ strokeDasharray: 400, strokeDashoffset: 400 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                strokeWidth="1"
              >
                TRANCOREX
              </motion.text>
              <motion.line
                x1="60"
                y1="60"
                x2="240"
                y2="60"
                stroke="#C9A84C"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
              />
            </svg>
            <motion.p
              className="mt-4 text-smoke text-sm font-accent tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              Global Trade Excellence
            </motion.p>
          </div>
        </motion.div>
    </AnimatePresence>
  );
}
