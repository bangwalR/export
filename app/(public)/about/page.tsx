'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { DynamicIcon } from '@/components/shared/DynamicIcon';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CORE_VALUES, TIMELINE, GLOBAL_REGIONS } from '@/lib/constants';
import { fadeInUp, staggerContainer, cardVariants, defaultViewport } from '@/lib/animations';

const TEAM = [
  { name: 'Rajesh Sharma', role: 'Founder & CEO', bio: '25+ years in international trade and export consultancy.', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
  { name: 'Priya Mehta', role: 'Director of Operations', bio: 'Expert in supply chain optimization and GCC market entry.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
  { name: 'Vikram Singh', role: 'Head of Manufacturing', bio: 'ISO-certified manufacturing specialist with global delivery experience.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
  { name: 'Ananya Reddy', role: 'Chief Compliance Officer', bio: 'Regulatory expert across EU, US, and Australian trade frameworks.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
          alt="TranCoreX office"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent" />
        <div className="container-custom relative pb-12 pt-32">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-7xl font-bold text-white"
          >
            About <span className="text-gradient-gold">TranCoreX</span>
          </motion.h1>
        </div>
      </section>

      {/* Company Intro */}
      <section className="section-padding bg-graphite">
        <div className="container-custom max-w-4xl">
          <SectionHeading eyebrow="Our Story" title="Pioneering Global Trade Since 2010" />
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={defaultViewport} className="prose-trancorex">
            <p>TranCoreX Pvt. Ltd. was founded with a singular vision: to democratize global trade for Indian businesses. What began as a boutique export consultancy in Connaught Place, New Delhi, has evolved into a full-spectrum international trade powerhouse serving clients across 40+ countries.</p>
            <p>Our integrated approach — combining export consultancy, manufacturing, and international trading under one roof — eliminates the fragmentation that plagues traditional trade operations. We don&apos;t just advise; we execute, deliver, and stand behind every shipment that bears the TranCoreX mark of excellence.</p>
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="section-padding bg-obsidian">
        <div className="container-custom grid md:grid-cols-2 gap-8">
          {[
            { title: 'Our Mission', text: 'To empower Indian enterprises with world-class export capabilities, enabling them to compete and thrive in global markets through innovative trade solutions, uncompromising quality, and strategic partnerships.' },
            { title: 'Our Vision', text: 'To be the most trusted name in international trade from India, recognized globally for excellence in export consultancy, manufacturing, and cross-border commerce that creates lasting value for all stakeholders.' },
          ].map((item) => (
            <motion.div key={item.title} variants={cardVariants} initial="hidden" whileInView="visible" viewport={defaultViewport}>
              <Card className="p-8 md:p-10 h-full">
                <h3 className="font-heading text-xl uppercase text-gold mb-4">{item.title}</h3>
                <p className="text-smoke leading-relaxed">{item.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-graphite">
        <div className="container-custom">
          <SectionHeading eyebrow="What Drives Us" title="Core Values" align="center" />
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={defaultViewport} className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {CORE_VALUES.map((value) => (
              <motion.div key={value.title} variants={cardVariants}>
                <Card className="p-6 text-center h-full">
                  <DynamicIcon name={value.icon} size={32} className="text-gold mx-auto mb-4" />
                  <h3 className="font-heading text-sm uppercase text-white mb-2">{value.title}</h3>
                  <p className="text-xs text-smoke">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-obsidian overflow-hidden">
        <div className="container-custom">
          <SectionHeading eyebrow="Our Journey" title="Company Timeline" align="center" />
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {TIMELINE.map((item) => (
              <Card key={item.year} className="shrink-0 w-72 p-6">
                <span className="font-heading text-2xl text-gold">{item.year}</span>
                <h3 className="font-heading text-sm uppercase text-white mt-2 mb-3">{item.title}</h3>
                <p className="text-xs text-smoke leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-graphite">
        <div className="container-custom">
          <SectionHeading eyebrow="Our People" title="Leadership Team" align="center" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member) => (
              <Card key={member.name} className="group overflow-hidden">
                <div className="relative aspect-square overflow-hidden">
                  <Image src={member.image} alt={member.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian to-transparent opacity-60" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-sm uppercase text-white">{member.name}</h3>
                  <p className="text-gold text-xs font-accent uppercase tracking-wider mt-1">{member.role}</p>
                  <p className="text-xs text-smoke mt-3 opacity-0 group-hover:opacity-100 transition-opacity">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-obsidian text-center">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-5xl text-white mb-6">Join Our Global Network</h2>
          <Link href="/contact"><Button variant="primary">Partner With Us <ArrowRight size={16} /></Button></Link>
        </div>
      </section>
    </>
  );
}
