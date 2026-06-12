import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Card } from '@/components/ui/Card';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog & Insights',
  description: 'Expert insights on global trade, export strategies, and international market trends from TranCoreX.',
};

const POSTS = [
  { title: 'Navigating GCC Export Regulations in 2025', slug: 'gcc-export-regulations-2025', excerpt: 'A comprehensive guide to the latest export regulations and compliance requirements for GCC markets.', cover_image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80', category: 'Export', author: 'TranCoreX Team', created_at: '2025-05-15', readTime: 8 },
  { title: 'Manufacturing Excellence for Global Markets', slug: 'manufacturing-excellence-global', excerpt: 'How Indian manufacturers can achieve international quality standards.', cover_image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&q=80', category: 'Manufacturing', author: 'TranCoreX Team', created_at: '2025-04-28', readTime: 6 },
  { title: 'European Market Entry: A Strategic Playbook', slug: 'european-market-entry-playbook', excerpt: 'Step-by-step strategies for Indian businesses in European markets.', cover_image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80', category: 'Strategy', author: 'TranCoreX Team', created_at: '2025-04-10', readTime: 10 },
  { title: 'Supply Chain Resilience in a Changing World', slug: 'supply-chain-resilience', excerpt: 'Building resilient supply chains that withstand global disruptions.', cover_image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80', category: 'Supply Chain', author: 'TranCoreX Team', created_at: '2025-03-22', readTime: 7 },
  { title: 'Understanding Free Trade Agreements', slug: 'understanding-ftas', excerpt: 'How to leverage FTAs for reduced tariffs and faster market access.', cover_image: 'https://images.unsplash.com/photo-1454165804604-c3d57bc86b40?w=600&q=80', category: 'Export', author: 'TranCoreX Team', created_at: '2025-03-05', readTime: 9 },
  { title: 'Digital Transformation in International Trade', slug: 'digital-transformation-trade', excerpt: 'How technology is reshaping export operations and documentation.', cover_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80', category: 'Technology', author: 'TranCoreX Team', created_at: '2025-02-18', readTime: 5 },
];

export default function BlogPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-graphite overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80"
            alt="Blog hero"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-graphite/60 via-graphite/80 to-graphite" />
        </div>
        <div className="container-custom relative z-10">
          <SectionHeading eyebrow="Insights" title="Blog & News" description="Expert perspectives on global trade, export strategies, and market trends." />
        </div>
      </section>

      {/* Featured Post */}
      <section className="bg-obsidian pt-16 pb-4">
        <div className="container-custom">
          <Link href={`/blog/${POSTS[0].slug}`}>
            <div className="group relative rounded-xl overflow-hidden h-80 md:h-96 mb-3">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=80"
                alt="Featured post"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-obsidian/90 via-obsidian/60 to-transparent" />
              <div className="absolute inset-0 flex items-center p-10 md:p-16">
                <div className="max-w-lg">
                  <span className="px-3 py-1 bg-gold text-obsidian text-xs font-accent uppercase mb-4 inline-block">Featured</span>
                  <h2 className="font-heading text-2xl md:text-3xl uppercase text-white mb-3 group-hover:text-gold transition-colors">
                    {POSTS[0].title}
                  </h2>
                  <p className="text-smoke text-sm mb-4 line-clamp-2">{POSTS[0].excerpt}</p>
                  <span className="flex items-center gap-2 text-gold text-sm font-accent uppercase tracking-wider">
                    Read More <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding bg-obsidian">
        <div className="container-custom grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card variant="feature" className="group h-full overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={post.cover_image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="33vw" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-gold/90 text-obsidian text-xs font-accent uppercase">{post.category}</span>
                </div>
                <div className="p-6">
                  <div className="flex gap-4 text-xs text-smoke mb-3">
                    <span>{formatDate(post.created_at)}</span>
                    <span className="flex items-center gap-1"><Clock size={12} />{post.readTime} min</span>
                  </div>
                  <h3 className="font-heading text-base uppercase text-white mb-3 group-hover:text-gold transition-colors">{post.title}</h3>
                  <p className="text-sm text-smoke line-clamp-2">{post.excerpt}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
