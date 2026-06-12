'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { GLOBAL_REGIONS } from '@/lib/constants';
import { fadeInUp, defaultViewport } from '@/lib/animations';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function GlobalMap() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const region = GLOBAL_REGIONS.find((r) => r.id === selectedRegion);

  return (
    <section className="section-padding bg-obsidian relative">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Worldwide Reach"
          title="Global Presence"
          description="Strategic operations across key international markets with local expertise and global standards."
          align="center"
        />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="relative max-w-4xl mx-auto"
        >
          <svg viewBox="0 0 100 60" className="w-full h-auto">
            <rect fill="#111318" width="100" height="60" rx="2" />
            {/* Simplified world map dots */}
            {Array.from({ length: 200 }).map((_, i) => (
              <circle
                key={i}
                cx={5 + (i % 20) * 4.5 + Math.random() * 2}
                cy={5 + Math.floor(i / 20) * 5 + Math.random() * 2}
                r="0.3"
                fill="#2a2d35"
              />
            ))}

            {GLOBAL_REGIONS.map((r) => (
              <g key={r.id} className="cursor-pointer" onClick={() => setSelectedRegion(r.id)}>
                <circle cx={r.coordinates.x} cy={r.coordinates.y} r="8" fill="none" stroke="#C9A84C" strokeWidth="0.3" opacity="0.5">
                  <animate attributeName="r" values="4;10;4" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0.2;0.8" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx={r.coordinates.x} cy={r.coordinates.y} r="2" fill="#C9A84C" />
                <text
                  x={r.coordinates.x}
                  y={r.coordinates.y + 5}
                  textAnchor="middle"
                  fill="#F5EDD6"
                  fontSize="2.5"
                  className="font-accent"
                >
                  {r.name}
                </text>
              </g>
            ))}
          </svg>
        </motion.div>
      </div>

      <AnimatePresence>
        {region && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-graphite border-l border-gold/20 z-50 p-8 overflow-y-auto"
          >
            <button
              onClick={() => setSelectedRegion(null)}
              className="absolute top-6 right-6 text-smoke hover:text-gold"
            >
              <X size={24} />
            </button>
            <h3 className="font-heading text-2xl uppercase text-gold mb-2">{region.name}</h3>
            <p className="text-smoke text-sm mb-6">{region.description}</p>
            <h4 className="font-accent text-xs uppercase tracking-wider text-gold mb-3">Key Markets</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {region.markets.map((m) => (
                <span key={m} className="px-3 py-1 bg-onyx text-sm text-champagne rounded-sm">{m}</span>
              ))}
            </div>
            <h4 className="font-accent text-xs uppercase tracking-wider text-gold mb-3">Services Offered</h4>
            <ul className="space-y-2 mb-8">
              {region.services.map((s) => (
                <li key={s} className="text-sm text-smoke flex items-center gap-2">
                  <span className="w-1 h-1 bg-gold rounded-full" />{s}
                </li>
              ))}
            </ul>
            <Link href="/contact">
              <Button variant="primary" className="w-full">Contact Us</Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
