'use client';

import { motion } from 'framer-motion';
import { fadeInUp, defaultViewport } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export function SectionHeading({ eyebrow, title, description, align = 'left', light }: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      className={cn('mb-12 md:mb-16', align === 'center' && 'text-center')}
    >
      {eyebrow && (
        <motion.span
          variants={fadeInUp}
          className="section-eyebrow"
        >
          {eyebrow}
        </motion.span>
      )}
      <h2 className={cn('section-title', align === 'center' && 'mx-auto')}>
        {title}
      </h2>
      {description && (
        <motion.p
          variants={fadeInUp}
          className={cn(
            'mt-8 text-base md:text-lg text-smoke max-w-2xl leading-relaxed',
            align === 'center' && 'mx-auto',
            light && 'text-smoke'
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
