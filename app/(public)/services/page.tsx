import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { DynamicIcon } from '@/components/shared/DynamicIcon';
import { Card } from '@/components/ui/Card';
import { SERVICES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Comprehensive export consultancy, manufacturing, international trading, and supply chain services by TranCoreX.',
};

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-graphite">
        <div className="container-custom">
          <SectionHeading
            eyebrow="What We Offer"
            title="Our Services"
            description="End-to-end trade solutions designed to accelerate your global business growth across every major international market."
          />
        </div>
      </section>

      <section className="section-padding bg-obsidian">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`}>
              <Card className="p-8 h-full group hover:border-gold/40">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-gold/10 border border-gold/20 shrink-0 group-hover:scale-110 transition-transform">
                    <DynamicIcon name={service.icon} size={28} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg uppercase text-white mb-3 group-hover:text-gold transition-colors">{service.title}</h3>
                    <p className="text-sm text-smoke leading-relaxed mb-4">{service.description}</p>
                    <span className="inline-flex items-center gap-2 text-gold text-sm font-accent uppercase tracking-wider">
                      Learn More <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
