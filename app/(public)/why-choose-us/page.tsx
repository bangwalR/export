import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { DynamicIcon } from '@/components/shared/DynamicIcon';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { WHY_CHOOSE_US } from '@/lib/constants';
import { Statistics } from '@/components/sections/Statistics';

export const metadata: Metadata = {
  title: 'Why Choose Us',
  description: 'Discover why 500+ businesses trust TranCoreX for export consultancy, manufacturing, and international trading.',
};

export default function WhyChooseUsPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-graphite">
        <div className="container-custom">
          <SectionHeading
            eyebrow="The TranCoreX Difference"
            title="Why Choose Us"
            description="Fifteen years of excellence, 500+ satisfied clients, and an unwavering commitment to your global success."
          />
        </div>
      </section>

      <section className="section-padding bg-obsidian">
        <div className="container-custom grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item) => (
            <Card key={item.title} className="p-8 text-center h-full">
              <DynamicIcon name={item.icon} size={32} className="text-gold mx-auto mb-4" />
              <h3 className="font-heading text-sm uppercase text-white mb-3">{item.title}</h3>
              <p className="text-sm text-smoke">{item.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <Statistics />

      <section className="section-padding bg-graphite">
        <div className="container-custom">
          <SectionHeading eyebrow="Quality Assurance" title="Our Commitment" align="center" />
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              'ISO 9001:2015 certified processes across all operations',
              'Dedicated compliance team monitoring regulatory changes',
              'Third-party quality audits for all manufacturing output',
              'Real-time shipment tracking and transparent reporting',
              'Dedicated account managers for every client partnership',
              '99.2% on-time delivery rate across all global shipments',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle size={18} className="text-gold mt-0.5 shrink-0" />
                <p className="text-sm text-smoke">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-obsidian text-center">
        <h2 className="font-display text-3xl md:text-5xl text-white mb-6">Experience the TranCoreX Advantage</h2>
        <Link href="/contact"><Button variant="primary">Get Started Today <ArrowRight size={16} /></Button></Link>
      </section>
    </>
  );
}
