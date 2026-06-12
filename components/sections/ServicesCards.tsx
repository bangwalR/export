'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '@/lib/constants';
import { staggerContainer, cardVariants, defaultViewport } from '@/lib/animations';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { DynamicIcon } from '@/components/shared/DynamicIcon';
import { Card } from '@/components/ui/Card';

const SERVICE_IMAGES: Record<string, string> = {
  'export-consultancy': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80',
  'manufacturing': 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400&q=80',
  'international-trading': 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=400&q=80',
  'supply-chain-management': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80',
  'documentation-compliance': 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=400&q=80',
  'market-entry-strategy': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80',
};

const FALLBACK = 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80';

export function ServicesCards() {
  return (
    <section className="section-padding bg-obsidian">
      <div className="container-custom">
        <SectionHeading
          eyebrow="What We Do"
          title="Our Services"
          description="Comprehensive trade solutions designed to accelerate your global business growth."
          align="center"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.slice(0, 6).map((service) => {
            const imageSrc = SERVICE_IMAGES[service.slug] ?? FALLBACK;
            return (
              <motion.div
                key={service.slug}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group"
              >
                <Link href={`/services/${service.slug}`}>
                  <Card className="h-full overflow-hidden cursor-pointer transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/10 p-0">
                    {/* Top image */}
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                      <Image
                        src={imageSrc}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
                      {/* Category chip */}
                      <div className="absolute top-3 left-3 px-2 py-1 bg-obsidian/70 backdrop-blur-sm border border-gold/20 rounded-sm">
                        <span className="text-[10px] text-gold font-accent uppercase tracking-wider">Service</span>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-7">
                      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gold/10 border border-gold/20 mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                        <DynamicIcon name={service.icon} size={24} className="text-gold" />
                      </div>
                      <h3 className="font-heading text-base uppercase text-white mb-3 group-hover:text-gold transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-smoke leading-relaxed mb-5">
                        {service.description.slice(0, 120)}...
                      </p>
                      <span className="inline-flex items-center gap-2 text-gold text-sm font-accent uppercase tracking-wider group-hover:gap-3 transition-all duration-300">
                        Learn More <ArrowRight size={14} />
                      </span>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="text-center mt-12">
          <Link href="/services" className="btn-ghost">
            View All Services <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
