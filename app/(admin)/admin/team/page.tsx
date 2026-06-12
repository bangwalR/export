'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';

const TEAM = [
  { id: '1', name: 'Rajesh Sharma', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80' },
  { id: '2', name: 'Priya Mehta', role: 'Director of Operations', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80' },
];

export default function AdminTeamPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl uppercase text-white">Team Manager</h1>
        <Button variant="primary" size="sm"><Plus size={16} /> Add Member</Button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEAM.map((member) => (
          <Card key={member.id} variant="dark" className="overflow-hidden">
            <div className="relative aspect-square">
              <Image src={member.image} alt={member.name} fill className="object-cover" sizes="33vw" />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">{member.name}</p>
                <p className="text-xs text-gold">{member.role}</p>
              </div>
              <div className="flex gap-1">
                <button className="p-2 text-smoke hover:text-gold"><Edit size={16} /></button>
                <button className="p-2 text-smoke hover:text-red-400"><Trash2 size={16} /></button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
