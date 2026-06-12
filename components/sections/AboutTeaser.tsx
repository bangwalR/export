'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeInUp, slideInLeft, slideInRight, defaultViewport } from '@/lib/animations';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Button } from '@/components/ui/Button';

const collageImages = [
  { src: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500&q=80', alt: 'Cargo port operations' },
  { src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80', alt: 'Global business headquarters' },
  { src: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&q=80', alt: 'Business documents and trade' },
  { src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&q=80', alt: 'Partnership handshake' },
];

const staggerImages = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const imageVariant = {
  hidden: { opacity: 0, scale: 0.92, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export function AboutTeaser() {
  return (
    <section className="section-padding bg-graphite">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — 2x2 image collage */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="relative"
          >
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-gold/30 rounded-xl -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gold/10 rounded-xl -z-10" />

            <motion.div
              variants={staggerImages}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              className="grid grid-cols-2 gap-3"
            >
              {collageImages.map((img, i) => (
                <motion.div
                  key={i}
                  variants={imageVariant}
                  className="relative overflow-hidden rounded-xl"
                  style={{ aspectRatio: '4/3' }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 to-transparent" />
                </motion.div>
              ))}
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={defaultViewport}
              transition={{ delay: 0.55, duration: 0.45, type: 'spring', bounce: 0.4 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center justify-center w-24 h-24 rounded-full bg-obsidian border-2 border-gold shadow-lg shadow-gold/20"
            >
              <span className="font-display text-xl font-bold text-gold leading-none">15+</span>
              <span className="font-accent text-[10px] uppercase tracking-widest text-smoke mt-0.5">Years</span>
            </motion.div>
          </motion.div>

          {/* Right — content */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <SectionHeading
              eyebrow="Who We Are"
              title="Bridging India to the World"
              description="Founded in Delhi, TranCoreX Pvt. Ltd. has spent over 15 years building bridges between Indian enterprises and global markets. We combine deep local expertise with international trade mastery to deliver results that matter."
            />

            <motion.div variants={fadeInUp} className="space-y-4 mb-8">
              {[
                'Headquartered in New Delhi with operations across 40+ countries',
                'Full-spectrum services from consultancy to manufacturing to delivery',
                'Trusted by 500+ businesses across diverse industries worldwide',
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1 h-8 bg-gradient-gold shrink-0 mt-1" />
                  <p className="text-smoke text-sm leading-relaxed">{point}</p>
                </div>
              ))}
            </motion.div>

            <Link href="/about">
              <Button variant="outline">
                Discover Our Story
                <ArrowRight size={16} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
