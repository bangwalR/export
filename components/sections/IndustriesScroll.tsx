'use client';

import { motion } from 'framer-motion';
import { INDUSTRIES } from '@/lib/constants';
import { staggerContainer, cardVariants, defaultViewport } from '@/lib/animations';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { DynamicIcon } from '@/components/shared/DynamicIcon';
import { Card } from '@/components/ui/Card';

export function IndustriesScroll() {
  return (
    <section className="section-padding bg-graphite overflow-hidden">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Sectors We Serve"
          title="Industries"
          description="Deep expertise across diverse sectors, delivering tailored export solutions for every industry."
          align="center"
        />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="flex gap-6 overflow-x-auto pb-4 px-4 md:px-8 scrollbar-hide"
      >
        {INDUSTRIES.map((industry) => (
          <motion.div key={industry.name} variants={cardVariants} className="shrink-0 w-64">
            <Card className="p-6 h-full group hover:border-gold/40">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gold/10 mb-4 group-hover:scale-110 transition-transform">
                <DynamicIcon name={industry.icon} size={24} className="text-gold" />
              </div>
              <h3 className="font-heading text-sm uppercase text-white mb-2">{industry.name}</h3>
              <p className="text-xs text-smoke leading-relaxed">{industry.description}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
