'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { fadeInUp, defaultViewport } from '@/lib/animations';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Card } from '@/components/ui/Card';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const TESTIMONIALS = [
  {
    name: 'Ahmed Al-Rashid',
    company: 'Gulf Trading Co.',
    country: 'UAE',
    rating: 5,
    message: 'TranCoreX transformed our export operations to the GCC region. Their documentation expertise and local market knowledge saved us months of setup time and significant costs.',
  },
  {
    name: 'Sarah Mitchell',
    company: 'EuroTrade Partners',
    country: 'Germany',
    rating: 5,
    message: 'Working with TranCoreX for our European market entry was seamless. Their compliance team ensured every regulation was met, and our products reached shelves within weeks.',
  },
  {
    name: 'James Patterson',
    company: 'NorthStar Imports',
    country: 'USA',
    rating: 5,
    message: 'The manufacturing quality and supply chain management from TranCoreX exceeded our expectations. They are a true partner in every sense of the word.',
  },
  {
    name: 'David Chen',
    company: 'Pacific Trade Group',
    country: 'Australia',
    rating: 5,
    message: 'From market research to final delivery, TranCoreX handled our Australian expansion with professionalism and precision. Highly recommended for any business going global.',
  },
];

export function Testimonials() {
  return (
    <section className="section-padding bg-obsidian">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Client Voices"
          title="Testimonials"
          description="Hear from businesses that have transformed their global trade with TranCoreX."
          align="center"
        />

        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={defaultViewport}>
          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            effect="fade"
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className="max-w-3xl mx-auto pb-12 [&_.swiper-pagination-bullet]:bg-gold/30 [&_.swiper-pagination-bullet-active]:bg-gold"
          >
            {TESTIMONIALS.map((t) => (
              <SwiperSlide key={t.name}>
                <Card className="p-8 md:p-12 text-center">
                  <div className="flex justify-center gap-1 mb-6">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Star size={18} className="text-gold fill-gold" />
                      </motion.div>
                    ))}
                  </div>
                  <blockquote className="font-display text-xl md:text-2xl text-champagne leading-relaxed mb-8 italic">
                    &ldquo;{t.message}&rdquo;
                  </blockquote>
                  <div>
                    <p className="font-heading text-sm uppercase text-white">{t.name}</p>
                    <p className="text-sm text-smoke">{t.company} · {t.country}</p>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
