'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';

const CATEGORIES = ['All', 'Office', 'Trade Shows', 'Shipments'] as const;

const GALLERY_ITEMS = [
  { id: '1',  image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', caption: 'TranCoreX Headquarters, New Delhi',      category: 'Office'      },
  { id: '2',  image: 'https://images.unsplash.com/photo-1494412574643-ff984856992f?w=800&q=80', caption: 'Container shipment at Mumbai Port',        category: 'Shipments'   },
  { id: '3',  image: 'https://images.unsplash.com/photo-1542744173-8e78710968b2?w=800&q=80', caption: 'Team strategy session',                      category: 'Office'      },
  { id: '4',  image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80', caption: 'Manufacturing facility tour',              category: 'Office'      },
  { id: '5',  image: 'https://images.unsplash.com/photo-1505373877841-8d25f39d466f?w=800&q=80', caption: 'Gulf Food Exhibition, Dubai',              category: 'Trade Shows' },
  { id: '6',  image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80', caption: 'Cargo loading operations',                 category: 'Shipments'   },
  { id: '7',  image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', caption: 'Hannover Messe, Germany',                  category: 'Trade Shows' },
  { id: '8',  image: 'https://images.unsplash.com/photo-1454165804604-c3d57bc86b40?w=800&q=80', caption: 'Client partnership meeting',               category: 'Office'      },
  { id: '9',  image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80', caption: 'Freight containers at port',               category: 'Shipments'   },
  { id: '10', image: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80', caption: 'International business conference',           category: 'Trade Shows' },
  { id: '11', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80', caption: 'Export documentation team',               category: 'Office'      },
  { id: '12', image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80', caption: 'Air cargo operations',                     category: 'Shipments'   },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState<string>('All');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered = filter === 'All' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((i) => i.category === filter);
  const lightboxItem = lightboxIdx !== null ? filtered[lightboxIdx] : null;

  const prev = () => setLightboxIdx((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  const next = () => setLightboxIdx((i) => (i !== null ? (i + 1) % filtered.length : null));

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-graphite overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80"
            alt="Gallery hero"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-graphite/60 via-graphite/80 to-graphite" />
        </div>
        <div className="container-custom relative z-10">
          <SectionHeading eyebrow="Visual Stories" title="Gallery" description="A glimpse into our operations, events, and global trade activities." />
          <div className="flex flex-wrap gap-3 mt-8">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`px-4 py-2 text-sm font-accent uppercase tracking-wider rounded-sm transition-colors ${
                  filter === cat ? 'bg-gold text-obsidian' : 'border border-onyx text-smoke hover:border-gold/30 hover:text-white'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="section-padding bg-obsidian">
        <div className="container-custom columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          <AnimatePresence>
            {filtered.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="break-inside-avoid relative group cursor-pointer rounded-xl overflow-hidden"
                onClick={() => setLightboxIdx(idx)}
              >
                <Image
                  src={item.image}
                  alt={item.caption}
                  width={600}
                  height={400}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <span className="px-2 py-0.5 bg-gold/90 text-obsidian text-[10px] font-accent uppercase mb-1 inline-block">{item.category}</span>
                    <p className="text-white text-sm">{item.caption}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-obsidian/97 flex items-center justify-center p-4"
            onClick={() => setLightboxIdx(null)}
          >
            <button className="absolute top-5 right-5 w-10 h-10 rounded-full bg-onyx flex items-center justify-center text-white hover:text-gold z-10" onClick={() => setLightboxIdx(null)}>
              <X size={20} />
            </button>
            <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-onyx flex items-center justify-center text-white hover:text-gold z-10" onClick={(e) => { e.stopPropagation(); prev(); }}>
              <ChevronLeft size={20} />
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-onyx flex items-center justify-center text-white hover:text-gold z-10" onClick={(e) => { e.stopPropagation(); next(); }}>
              <ChevronRight size={20} />
            </button>
            <motion.div
              key={lightboxItem.id}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={lightboxItem.image} alt={lightboxItem.caption} width={1200} height={800} className="w-full rounded-xl" />
              <p className="text-center text-champagne mt-4 text-sm">{lightboxItem.caption}</p>
              <p className="text-center text-smoke text-xs mt-1">{lightboxIdx! + 1} / {filtered.length}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
