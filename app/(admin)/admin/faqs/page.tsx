'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { DEFAULT_FAQS } from '@/lib/constants';

export default function AdminFAQsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl uppercase text-white">FAQ Manager</h1>
        <Button variant="primary" size="sm"><Plus size={16} /> Add FAQ</Button>
      </div>
      <div className="space-y-4">
        {DEFAULT_FAQS.map((faq, i) => (
          <Card key={i} variant="dark" className="p-6 flex items-start justify-between">
            <div>
              <span className="text-xs text-gold font-accent uppercase">{faq.category}</span>
              <p className="text-white text-sm mt-1">{faq.question}</p>
              <p className="text-xs text-smoke mt-2">{faq.answer.slice(0, 100)}...</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button className="p-2 text-smoke hover:text-gold"><Edit size={16} /></button>
              <button className="p-2 text-smoke hover:text-red-400"><Trash2 size={16} /></button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
