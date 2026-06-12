'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus, Edit, Trash2, Star } from 'lucide-react';

const TESTIMONIALS = [
  { id: '1', name: 'Ahmed Al-Rashid', company: 'Gulf Trading Co.', country: 'UAE', rating: 5, message: 'TranCoreX transformed our export operations.' },
  { id: '2', name: 'Sarah Mitchell', company: 'EuroTrade Partners', country: 'Germany', rating: 5, message: 'Seamless European market entry.' },
];

export default function AdminTestimonialsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl uppercase text-white">Testimonials Manager</h1>
        <Button variant="primary" size="sm"><Plus size={16} /> Add Testimonial</Button>
      </div>
      <div className="space-y-4">
        {TESTIMONIALS.map((t) => (
          <Card key={t.id} variant="dark" className="p-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-white font-medium">{t.name}</p>
                <div className="flex">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={12} className="text-gold fill-gold" />)}</div>
              </div>
              <p className="text-xs text-smoke">{t.company} · {t.country}</p>
              <p className="text-sm text-smoke mt-2 italic">&ldquo;{t.message}&rdquo;</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-smoke hover:text-gold"><Edit size={16} /></button>
              <button className="p-2 text-smoke hover:text-red-400"><Trash2 size={16} /></button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
