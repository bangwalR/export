'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeInUp, slideInLeft, slideInRight, defaultViewport } from '@/lib/animations';
import { Button } from '@/components/ui/Button';

export function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-obsidian">
      {/* Full-bleed background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=1600&q=80"
          alt="Business team"
          fill
          className="object-cover opacity-[0.12]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-obsidian/70" />
      </div>

      {/* Glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse-gold" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-gold/3 rounded-full blur-3xl" />
      </div>

      {/* Split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">

        {/* Left — text */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="flex items-center section-padding"
        >
          <div className="max-w-xl">
            <motion.p variants={fadeInUp} className="font-accent text-xs uppercase tracking-[0.2em] text-gold mb-4">
              Global Trade Partner
            </motion.p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Expand Your{' '}
              <span className="text-gradient-gold">Global Reach</span>?
            </h2>
            <p className="text-lg text-smoke mb-10 leading-relaxed">
              Partner with TranCoreX and unlock access to 40+ international markets. Our experts are ready to craft your customized export strategy.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Schedule a Consultation
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg">View Our Services</Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Right — image panel */}
        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="relative hidden lg:block"
        >
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
            alt="TranCoreX global trade consultant"
            fill
            className="object-cover object-center"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-gold/10 to-obsidian/80" />

          {/* Floating trust badge */}
          <div className="absolute bottom-8 left-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-obsidian/70 backdrop-blur-sm border border-gold/30">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="font-accent text-xs text-gold uppercase tracking-widest">Trusted Globally</span>
            </div>
          </div>

          {/* Stats overlay */}
          <div className="absolute top-8 right-8 flex flex-col gap-3">
            {[{ val: '40+', label: 'Countries' }, { val: '500+', label: 'Clients' }].map((s) => (
              <div key={s.label} className="text-right bg-obsidian/60 backdrop-blur-sm border border-gold/20 rounded-lg px-4 py-2">
                <p className="font-heading text-xl text-gold">{s.val}</p>
                <p className="text-[10px] text-smoke font-accent uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
