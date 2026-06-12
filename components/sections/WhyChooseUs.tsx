'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { WHY_CHOOSE_US } from '@/lib/constants';
import { staggerContainer, cardVariants, defaultViewport } from '@/lib/animations';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { DynamicIcon } from '@/components/shared/DynamicIcon';

const itemImages = [
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&q=80',
  'https://images.unsplash.com/photo-1454165804604-c3d57bc86b40?w=300&q=80',
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300&q=80',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=300&q=80',
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-graphite relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?w=1600&q=80"
          alt="Global trade background"
          fill
          className="object-cover opacity-10"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-graphite/80" />
      </div>

      <div className="container-custom">
        <SectionHeading
          eyebrow="The TranCoreX Advantage"
          title="Why Choose Us"
          description="What sets us apart in the competitive landscape of global trade and export consultancy."
          align="center"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {WHY_CHOOSE_US.map((item, index) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group"
            >
              <div className="flex flex-row h-full rounded-xl overflow-hidden border border-white/5 bg-obsidian/70 backdrop-blur-sm shadow-md hover:shadow-gold/10 hover:border-gold/20 transition-all duration-300">
                {/* Left — image */}
                <div className="relative w-36 shrink-0 overflow-hidden">
                  <Image
                    src={itemImages[index] ?? itemImages[0]}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="144px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-obsidian/60" />
                </div>

                {/* Right — content */}
                <div className="flex flex-col justify-center p-6 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gold/10 border border-gold/20 shrink-0 group-hover:shadow-gold transition-shadow">
                      <DynamicIcon name={item.icon} size={20} className="text-gold" />
                    </div>
                    <h3 className="font-heading text-sm uppercase text-white group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-smoke leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
