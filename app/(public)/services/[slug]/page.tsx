import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, ArrowRight } from 'lucide-react';
import { DynamicIcon } from '@/components/shared/DynamicIcon';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SERVICES } from '@/lib/constants';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: 'Service Not Found' };
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const related = SERVICES.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="pt-32 pb-16 bg-graphite relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dark opacity-50" />
        <div className="container-custom relative">
          <div className="flex items-center gap-6 mt-4">
            <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-gold/10 border border-gold/20">
              <DynamicIcon name={service.icon} size={32} className="text-gold" />
            </div>
            <div>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-white">{service.title}</h1>
              <p className="text-smoke mt-2 max-w-2xl">{service.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-obsidian">
        <div className="container-custom grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="section-title mb-8">Overview</h2>
            <p className="text-smoke leading-relaxed mb-8">{service.description}</p>
            <h3 className="font-heading text-sm uppercase text-gold mb-4">Key Features</h3>
            <ul className="space-y-3">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-smoke">
                  <Check size={16} className="text-gold mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4">
            {service.benefits.map((b) => (
              <Card key={b.title} className="p-6">
                <h4 className="font-heading text-sm uppercase text-white mb-2">{b.title}</h4>
                <p className="text-sm text-smoke">{b.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-graphite">
        <div className="container-custom">
          <h2 className="section-title mb-12 text-center mx-auto">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {service.process.map((step, i) => (
              <div key={step} className="text-center relative">
                <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-gold/10 border border-gold/30 text-gold font-heading font-bold mb-4">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="text-sm text-smoke font-accent uppercase tracking-wider">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-obsidian">
        <div className="container-custom">
          <h2 className="section-title mb-8">Related Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`}>
                <Card className="p-6 group hover:border-gold/40">
                  <DynamicIcon name={s.icon} size={24} className="text-gold mb-4" />
                  <h3 className="font-heading text-sm uppercase text-white group-hover:text-gold transition-colors">{s.title}</h3>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-graphite text-center">
        <h2 className="font-display text-3xl text-white mb-6">Ready to Get Started?</h2>
        <Link href="/contact"><Button variant="primary">Request a Consultation <ArrowRight size={16} /></Button></Link>
      </section>
    </>
  );
}
