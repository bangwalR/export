'use client';

import { motion } from 'framer-motion';
import { STATS } from '@/lib/constants';
import { staggerContainer, fadeInUp, defaultViewport } from '@/lib/animations';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { useCountUp } from '@/hooks/useCountUp';

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value);

  return (
    <motion.div ref={ref} variants={fadeInUp} className="text-center relative">
      <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#1C1F26" strokeWidth="2" />
          <motion.circle
            cx="50" cy="50" r="45" fill="none" stroke="#C9A84C" strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="283"
            initial={{ strokeDashoffset: 283 }}
            whileInView={{ strokeDashoffset: 283 - (283 * 0.75) }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: 'easeOut' }}
          />
        </svg>
        <span className="font-heading text-3xl md:text-4xl font-bold text-gold">
          {count}{suffix}
        </span>
      </div>
      <p className="text-sm uppercase tracking-wider text-smoke font-accent">{label}</p>
    </motion.div>
  );
}

export function Statistics() {
  return (
    <section className="section-padding bg-graphite relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg viewBox="0 0 1000 500" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 50 }).map((_, i) => (
            <circle
              key={i}
              cx={Math.random() * 1000}
              cy={Math.random() * 500}
              r="2"
              fill="#C9A84C"
              className="animate-pulse-gold"
              style={{ animationDelay: `${Math.random() * 2}s` }}
            />
          ))}
        </svg>
      </div>

      <div className="container-custom relative">
        <SectionHeading
          eyebrow="By The Numbers"
          title="Our Impact"
          description="Measurable results that speak to our commitment to global trade excellence."
          align="center"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {STATS.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
