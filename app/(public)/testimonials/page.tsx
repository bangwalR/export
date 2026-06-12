'use client';

import { Star } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Testimonials } from '@/components/sections/Testimonials';

const ALL_TESTIMONIALS = [
  { name: 'Ahmed Al-Rashid', company: 'Gulf Trading Co.', country: '🇦🇪 UAE', rating: 5, message: 'TranCoreX transformed our export operations to the GCC region.' },
  { name: 'Sarah Mitchell', company: 'EuroTrade Partners', country: '🇩🇪 Germany', rating: 5, message: 'Working with TranCoreX for our European market entry was seamless.' },
  { name: 'James Patterson', company: 'NorthStar Imports', country: '🇺🇸 USA', rating: 5, message: 'The manufacturing quality exceeded our expectations.' },
  { name: 'David Chen', company: 'Pacific Trade Group', country: '🇦🇺 Australia', rating: 5, message: 'From market research to final delivery, handled with precision.' },
  { name: 'Fatima Al-Zahra', company: 'Desert Commerce LLC', country: '🇶🇦 Qatar', rating: 5, message: 'Outstanding compliance support for our textile exports.' },
  { name: 'Michael O\'Brien', company: 'Celtic Imports Ltd', country: '🇮🇪 Ireland', rating: 4, message: 'Reliable partner for our ongoing European supply needs.' },
];

export default function TestimonialsPage() {
  const featured = ALL_TESTIMONIALS[0];

  return (
    <>
      <section className="pt-32 pb-16 bg-graphite">
        <div className="container-custom">
          <SectionHeading eyebrow="Client Success" title="Testimonials" description="Real stories from businesses that have achieved global growth with TranCoreX." />
        </div>
      </section>

      <section className="section-padding bg-obsidian">
        <div className="container-custom">
          <Card className="p-10 md:p-16 text-center max-w-4xl mx-auto mb-16">
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: featured.rating }).map((_, i) => (
                <Star key={i} size={20} className="text-gold fill-gold" />
              ))}
            </div>
            <blockquote className="font-display text-2xl md:text-4xl text-champagne italic leading-relaxed mb-8">
              &ldquo;{featured.message}&rdquo;
            </blockquote>
            <p className="font-heading uppercase text-white">{featured.name}</p>
            <p className="text-smoke text-sm">{featured.company} · {featured.country}</p>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_TESTIMONIALS.slice(1).map((t) => (
              <Card key={t.name} className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-sm text-smoke mb-4 italic">&ldquo;{t.message}&rdquo;</p>
                <p className="font-heading text-xs uppercase text-white">{t.name}</p>
                <p className="text-xs text-smoke">{t.company} · {t.country}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
}
