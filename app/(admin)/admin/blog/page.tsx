'use client';

import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const POSTS = [
  { id: '1', title: 'Navigating GCC Export Regulations in 2025', slug: 'gcc-export-regulations-2025', category: 'Export', published: true, created_at: '2025-05-15' },
  { id: '2', title: 'Manufacturing Excellence for Global Markets', slug: 'manufacturing-excellence-global', category: 'Manufacturing', published: true, created_at: '2025-04-28' },
  { id: '3', title: 'European Market Entry Playbook', slug: 'european-market-entry-playbook', category: 'Strategy', published: false, created_at: '2025-04-10' },
];

export default function AdminBlogPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl uppercase text-white">Blog Manager</h1>
          <p className="text-smoke text-sm mt-1">{POSTS.length} posts</p>
        </div>
        <Link href="/admin/blog/new">
          <Button variant="primary" size="sm"><Plus size={16} /> New Post</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {POSTS.map((post) => (
          <Card key={post.id} variant="dark" className="p-6 flex items-center justify-between">
            <div>
              <h3 className="text-white font-medium">{post.title}</h3>
              <p className="text-xs text-smoke mt-1">{post.category} · {new Date(post.created_at).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-2 py-1 text-xs rounded-sm ${post.published ? 'bg-green-500/20 text-green-400' : 'bg-onyx text-smoke'}`}>
                {post.published ? 'Published' : 'Draft'}
              </span>
              <Link href={`/admin/blog/edit/${post.id}`} className="p-2 text-smoke hover:text-gold"><Edit size={16} /></Link>
              <button className="p-2 text-smoke hover:text-red-400"><Trash2 size={16} /></button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
