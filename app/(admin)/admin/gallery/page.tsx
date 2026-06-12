'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Upload, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

const ITEMS = [
  { id: '1', image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80', caption: 'Headquarters', category: 'Office' },
  { id: '2', image_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80', caption: 'Port Shipment', category: 'Shipments' },
  { id: '3', image_url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&q=80', caption: 'Trade Show Dubai', category: 'Trade Shows' },
];

export default function AdminGalleryPage() {
  const [items, setItems] = useState(ITEMS);

  const handleUpload = () => {
    toast.success('Upload functionality connects to Supabase Storage');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl uppercase text-white">Gallery Manager</h1>
        <Button variant="primary" size="sm" onClick={handleUpload}><Upload size={16} /> Upload Image</Button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card key={item.id} variant="dark" className="overflow-hidden">
            <div className="relative aspect-video">
              <Image src={item.image_url} alt={item.caption} fill className="object-cover" sizes="33vw" />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="text-white text-sm">{item.caption}</p>
                <p className="text-xs text-smoke">{item.category}</p>
              </div>
              <button onClick={() => setItems((prev) => prev.filter((i) => i.id !== item.id))} className="p-2 text-smoke hover:text-red-400">
                <Trash2 size={16} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
