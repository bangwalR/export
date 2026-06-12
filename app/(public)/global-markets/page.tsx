'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Button } from '@/components/ui/Button';
import { GLOBAL_REGIONS } from '@/lib/constants';
import Link from 'next/link';

const REGION_IMAGES: Record<string, string> = {
  gcc: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
  europe: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',
  'north-america': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80',
  australia: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
};

export default function GlobalMarketsPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const region = GLOBAL_REGIONS.find((r) => r.id === selected);

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-graphite overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80"
            alt="Global Markets"
            fill
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-graphite/50 via-graphite/75 to-graphite" />
        </div>
        <div className="container-custom relative z-10">
          <SectionHeading
            eyebrow="Worldwide Operations"
            title="Global Markets"
            description="Click on a region to explore our services, key markets, and local expertise."
          />
        </div>
      </section>

      {/* Interactive Map */}
      <section className="section-padding bg-obsidian">
        <div className="container-custom max-w-5xl mx-auto">
          <svg viewBox="0 0 100 60" className="w-full h-auto rounded-xl border border-onyx">
            <rect fill="#111318" width="100" height="60" />
            {Array.from({ length: 300 }).map((_, i) => (
              <circle key={i} cx={(i * 7) % 100} cy={(i * 3) % 60} r="0.25" fill="#2a2d35" />
            ))}
            {GLOBAL_REGIONS.map((r) => (
              <g key={r.id} className="cursor-pointer" onClick={() => setSelected(r.id)}>
                <circle cx={r.coordinates.x} cy={r.coordinates.y} r="6" fill="none" stroke="#C9A84C" strokeWidth="0.4">
                  <animate attributeName="r" values="3;8;3" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx={r.coordinates.x} cy={r.coordinates.y} r="2.5" fill="#C9A84C" />
                <text x={r.coordinates.x} y={r.coordinates.y + 5.5} textAnchor="middle" fill="#F5EDD6" fontSize="2.8">{r.name}</text>
              </g>
            ))}
          </svg>
        </div>
      </section>

      {/* Region Cards with Images */}
      <section className="section-padding bg-graphite">
        <div className="container-custom grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GLOBAL_REGIONS.map((r, i) => (
            <motion.button
              key={r.id}
              onClick={() => setSelected(r.id)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="glass-card overflow-hidden text-left group hover:border-gold/40 transition-colors"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={REGION_IMAGES[r.id]}
                  alt={r.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/30 to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-1.5">
                  <MapPin size={13} className="text-gold" />
                  <span className="text-gold text-xs font-accent uppercase tracking-wider">{r.markets.length} Markets</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg uppercase text-gold mb-2">{r.name}</h3>
                <p className="text-xs text-smoke mb-4 line-clamp-2">{r.description}</p>
                <span className="text-xs text-gold font-accent uppercase tracking-wider group-hover:underline">Explore →</span>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Region Drawer */}
      <AnimatePresence>
        {region && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-obsidian/60 z-40"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-graphite border-l border-gold/20 z-50 overflow-y-auto"
            >
              {/* Region hero image */}
              <div className="relative h-56">
                <Image
                  src={REGION_IMAGES[region.id]}
                  alt={region.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-graphite" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-obsidian/60 flex items-center justify-center text-white hover:text-gold transition-colors"
                >
                  <X size={18} />
                </button>
                <h3 className="absolute bottom-4 left-6 font-heading text-2xl uppercase text-gold">{region.name}</h3>
              </div>

              <div className="p-6">
                <p className="text-smoke text-sm mb-6">{region.description}</p>
                <h4 className="font-accent text-xs uppercase text-gold mb-3 tracking-wider">Key Markets</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {region.markets.map((m) => (
                    <span key={m} className="px-3 py-1 bg-onyx text-sm text-white rounded-sm">{m}</span>
                  ))}
                </div>
                <h4 className="font-accent text-xs uppercase text-gold mb-3 tracking-wider">Our Services</h4>
                <ul className="space-y-2 mb-8">
                  {region.services.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-smoke">
                      <span className="w-1 h-1 rounded-full bg-gold" />
                      {s}
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button variant="primary" className="w-full">Contact Us About {region.name}</Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
