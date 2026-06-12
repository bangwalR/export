'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success('Blog post created!');
    router.push('/admin/blog');
  };

  return (
    <div>
      <h1 className="font-heading text-2xl uppercase text-white mb-8">New Blog Post</h1>
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
        <Input label="Title" name="title" required placeholder="Enter post title" />
        <Input label="Slug" name="slug" placeholder="auto-generated-from-title" />
        <Input label="Category" name="category" required placeholder="Export, Manufacturing, etc." />
        <Input label="Cover Image URL" name="cover_image" placeholder="https://..." />
        <Textarea label="Content (Markdown)" name="content" rows={15} required placeholder="Write your blog content in Markdown..." />
        <Input label="Meta Title" name="meta_title" placeholder="SEO title" />
        <Textarea label="Meta Description" name="meta_desc" rows={3} placeholder="SEO description" />
        <div className="flex items-center gap-3">
          <input type="checkbox" id="published" name="published" className="accent-gold" />
          <label htmlFor="published" className="text-sm text-smoke">Publish immediately</label>
        </div>
        <div className="flex gap-4">
          <Button type="submit" variant="primary" isLoading={loading}>Create Post</Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
