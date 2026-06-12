import type { Metadata } from 'next';
import Image from 'next/image';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { DynamicIcon } from '@/components/shared/DynamicIcon';
import { INDUSTRIES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Industries We Serve',
  description: 'TranCoreX serves diverse industries including automobile, engineering, textile, electronics, healthcare, and more.',
};

const INDUSTRY_IMAGES: Record<string, string> = {
  Automobile: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80',
  Engineering: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&q=80',
  Textile: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  Electronics: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
  Healthcare: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
  Agriculture: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4e6?w=600&q=80',
  'Food Processing': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
  Chemicals: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80',
  Construction: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
  'Industrial Equipment': 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&q=80',
};

export default function IndustriesPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-graphite overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80"
            alt="Industries hero"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-graphite/50 via-graphite/75 to-graphite" />
        </div>
        <div className="container-custom relative z-10">
          <SectionHeading
            eyebrow="Sectors"
            title="Industries We Serve"
            description="Deep sector expertise delivering tailored export and trade solutions across diverse industries."
          />
        </div>
      </section>

      {/* Industry Cards with Images */}
      <section className="section-padding bg-obsidian">
        <div className="container-custom grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {INDUSTRIES.map((industry) => (
            <div
              key={industry.name}
              className="group rounded-xl overflow-hidden border border-onyx hover:border-gold/40 transition-all duration-300 hover:-translate-y-1 bg-graphite"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={INDUSTRY_IMAGES[industry.name] || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80'}
                  alt={industry.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/40 to-transparent" />
                {/* Icon overlay */}
                <div className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-obsidian/70 border border-gold/20 flex items-center justify-center">
                  <DynamicIcon name={industry.icon} size={18} className="text-gold" />
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-heading text-base uppercase text-white mb-2 group-hover:text-gold transition-colors">
                  {industry.name}
                </h3>
                <p className="text-xs text-smoke leading-relaxed">{industry.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-graphite py-16">
        <div className="container-custom">
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?w=1400&q=80"
              alt="Global trade"
              fill
              className="object-cover opacity-15"
            />
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-onyx rounded-2xl overflow-hidden border border-onyx">
              {[
                { value: '10+', label: 'Industries' },
                { value: '40+', label: 'Countries' },
                { value: '500+', label: 'Clients' },
                { value: '15+', label: 'Years' },
              ].map((s) => (
                <div key={s.label} className="bg-graphite p-8 text-center">
                  <p className="font-heading text-3xl text-gold mb-1">{s.value}</p>
                  <p className="text-xs text-smoke font-accent uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
