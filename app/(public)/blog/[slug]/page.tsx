import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Clock, Share2 } from 'lucide-react';
import { formatDate, calculateReadTime } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/constants';

const POSTS: Record<string, { title: string; content: string; cover_image: string; category: string; author: string; created_at: string; tags: string[] }> = {
  'gcc-export-regulations-2025': {
    title: 'Navigating GCC Export Regulations in 2025',
    content: `The Gulf Cooperation Council (GCC) represents one of the most dynamic export destinations for Indian businesses. With combined GDP exceeding $2 trillion and a population of over 50 million, the GCC markets offer unparalleled opportunities for exporters across sectors.

## Key Regulatory Changes in 2025

Several GCC nations have updated their import regulations this year. The UAE has streamlined its customs procedures through the new digital trade platform, while Saudi Arabia's Vision 2030 initiatives have opened new sectors for foreign suppliers.

## Documentation Requirements

Exporting to GCC countries requires specific documentation including Certificate of Origin (preferably from Indian Chamber of Commerce), Halal certification for food products, and conformity certificates for regulated goods.

## TranCoreX GCC Expertise

Our dedicated GCC desk in Dubai handles over 200 shipments monthly, ensuring compliance with each nation's specific requirements. From pre-shipment inspection to final delivery, we manage the entire export cycle.`,
    cover_image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80',
    category: 'Export',
    author: 'TranCoreX Team',
    created_at: '2025-05-15',
    tags: ['GCC', 'Export', 'Compliance'],
  },
  'manufacturing-excellence-global': {
    title: 'Manufacturing Excellence for Global Markets',
    content: `Indian manufacturing has evolved dramatically over the past decade. Today, Indian manufacturers compete on quality, not just cost — and global buyers are taking notice.

## Quality Standards That Matter

ISO 9001, CE marking, FDA compliance, and sector-specific certifications are non-negotiable for international markets. TranCoreX manufacturing division maintains all major certifications.

## Scaling for Export

The transition from domestic production to export-scale manufacturing requires careful planning — capacity planning, quality systems, packaging standards, and logistics integration.`,
    cover_image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&q=80',
    category: 'Manufacturing',
    author: 'TranCoreX Team',
    created_at: '2025-04-28',
    tags: ['Manufacturing', 'Quality', 'Export'],
  },
  'european-market-entry-playbook': {
    title: 'European Market Entry: A Strategic Playbook',
    content: `Europe remains one of the most lucrative yet complex markets for Indian exporters. With 27 EU member states and distinct regulatory frameworks, a strategic approach is essential.

## Market Selection

Not all European markets are equal for every product. Germany leads in engineering imports, the Netherlands serves as a logistics hub, while Southern Europe offers growing opportunities in food and textile sectors.`,
    cover_image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    category: 'Strategy',
    author: 'TranCoreX Team',
    created_at: '2025-04-10',
    tags: ['Europe', 'Strategy', 'Market Entry'],
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.content.slice(0, 160),
    openGraph: { images: [post.cover_image] },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) notFound();

  const readTime = calculateReadTime(post.content);
  const shareUrl = `${SITE_CONFIG.url}/blog/${slug}`;

  return (
    <>
      <section className="pt-32 pb-8 bg-graphite">
        <div className="container-custom max-w-4xl">
          <span className="section-eyebrow">{post.category}</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">{post.title}</h1>
          <div className="flex items-center gap-6 text-sm text-smoke">
            <span>{post.author}</span>
            <span>{formatDate(post.created_at)}</span>
            <span className="flex items-center gap-1"><Clock size={14} />{readTime} min read</span>
          </div>
        </div>
      </section>

      <div className="container-custom max-w-4xl mb-12">
        <div className="relative aspect-[21/9] rounded-xl overflow-hidden">
          <Image src={post.cover_image} alt={post.title} fill className="object-cover" priority />
        </div>
      </div>

      <article className="container-custom max-w-3xl pb-16">
        <div className="prose-trancorex whitespace-pre-line">{post.content}</div>

        <div className="mt-12 pt-8 border-t border-onyx">
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-onyx text-xs text-smoke rounded-sm">{tag}</span>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Share2 size={18} className="text-gold" />
            <a href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + shareUrl)}`} target="_blank" rel="noopener noreferrer" className="text-sm text-smoke hover:text-gold">WhatsApp</a>
            <a href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="text-sm text-smoke hover:text-gold">LinkedIn</a>
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="text-sm text-smoke hover:text-gold">Twitter</a>
          </div>
        </div>
      </article>
    </>
  );
}
