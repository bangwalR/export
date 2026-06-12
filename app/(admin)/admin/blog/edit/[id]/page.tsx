'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success('Blog post updated!');
    router.push('/admin/blog');
  };

  return (
    <div>
      <h1 className="font-heading text-2xl uppercase text-white mb-8">Edit Blog Post</h1>
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
        <Input label="Title" name="title" required defaultValue="Navigating GCC Export Regulations in 2025" />
        <Input label="Slug" name="slug" defaultValue="gcc-export-regulations-2025" />
        <Input label="Category" name="category" defaultValue="Export" />
        <Textarea label="Content" name="content" rows={15} defaultValue="Blog content here..." />
        <div className="flex gap-4">
          <Button type="submit" variant="primary" isLoading={loading}>Update Post</Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
