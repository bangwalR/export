'use client';

import { SERVICES } from '@/lib/constants';
import { Card } from '@/components/ui/Card';
import { DynamicIcon } from '@/components/shared/DynamicIcon';
import { Edit } from 'lucide-react';

export default function AdminServicesPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl uppercase text-white mb-8">Services Manager</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {SERVICES.map((s) => (
          <Card key={s.slug} variant="dark" className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <DynamicIcon name={s.icon} size={24} className="text-gold" />
              <div>
                <h3 className="text-white text-sm font-medium">{s.title}</h3>
                <p className="text-xs text-smoke">{s.slug}</p>
              </div>
            </div>
            <button className="p-2 text-smoke hover:text-gold"><Edit size={16} /></button>
          </Card>
        ))}
      </div>
    </div>
  );
}
