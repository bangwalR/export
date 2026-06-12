'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { DEFAULT_FAQS, FAQ_CATEGORIES } from '@/lib/constants';

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filtered = activeCategory === 'All'
    ? DEFAULT_FAQS
    : DEFAULT_FAQS.filter((f) => f.category === activeCategory);

  return (
    <>
      <section className="pt-32 pb-16 bg-graphite">
        <div className="container-custom">
          <SectionHeading eyebrow="Help Center" title="Frequently Asked Questions" description="Find answers to common questions about our services, processes, and pricing." />
          <div className="flex flex-wrap gap-3 mt-8">
            {['All', ...FAQ_CATEGORIES].map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                className={`px-4 py-2 text-sm font-accent uppercase tracking-wider rounded-sm transition-colors ${
                  activeCategory === cat ? 'bg-gold text-obsidian' : 'border border-onyx text-smoke hover:border-gold/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-obsidian">
        <div className="container-custom max-w-3xl space-y-4">
          {filtered.map((faq, index) => (
            <div key={index} className="glass-card overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-heading text-sm uppercase text-white pr-4">{faq.question}</span>
                <span className={`text-gold transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="px-6 pb-6 text-sm text-smoke leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: DEFAULT_FAQS.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }),
        }}
      />
    </>
  );
}
