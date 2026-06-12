'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { heroWordVariants, lineDrawVariants } from '@/lib/animations';
import { useParallax } from '@/hooks/useParallax';
import { Button } from '@/components/ui/Button';
import { STATS } from '@/lib/constants';

const headlineWords = ['Global', 'Trade', 'Excellence', 'Starts', 'Here'];

export function Hero() {
  const parallaxRef = useParallax(0.15);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !particlesRef.current) return;

    import('gsap').then(({ gsap }) => {
      const particles = particlesRef.current?.children;
      if (!particles) return;

      Array.from(particles).forEach((particle) => {
        gsap.to(particle, {
          y: `random(-30, 30)`,
          x: `random(-20, 20)`,
          opacity: 'random(0.2, 0.8)',
          duration: 'random(3, 6)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div ref={parallaxRef} className="absolute inset-0 scale-110">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1494412574643-ff984856992f?w=1920&q=80"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-obsidian/70" />
        <div className="noise-overlay" />
      </div>

      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center pt-20">
        <motion.span
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="section-eyebrow inline-block"
        >
          Export Consultancy · Manufacturing · International Trading
        </motion.span>

        <h1 className="hero-headline mb-6">
          {headlineWords.map((word, i) => (
            <motion.span
              key={word}
              custom={i}
              variants={heroWordVariants}
              initial="hidden"
              animate="visible"
              className={`inline-block mr-[0.25em] ${word === 'Excellence' ? 'text-gradient-gold' : ''}`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.div
          variants={lineDrawVariants}
          initial="hidden"
          animate="visible"
          className="w-32 h-0.5 bg-gradient-gold mx-auto mb-8 origin-left"
        />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-lg md:text-xl text-smoke max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Empowering Indian businesses to conquer global markets across GCC, Europe, North America, and Australia with end-to-end trade solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/contact">
            <Button variant="primary">
              Start Your Export Journey
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link href="/services">
            <Button variant="outline">Explore Services</Button>
          </Link>
        </motion.div>

        {/* Floating Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-3xl md:text-4xl font-bold text-gold">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-xs uppercase tracking-wider text-smoke mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={28} className="text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
