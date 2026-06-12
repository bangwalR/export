'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { staggerContainer, cardVariants, defaultViewport } from '@/lib/animations';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Card } from '@/components/ui/Card';
import { formatDate } from '@/lib/utils';

const BLOG_POSTS = [
  {
    title: 'Navigating GCC Export Regulations in 2025',
    slug: 'gcc-export-regulations-2025',
    excerpt: 'A comprehensive guide to the latest export regulations and compliance requirements for GCC markets.',
    cover_image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
    category: 'Export',
    author: 'TranCoreX Team',
    created_at: '2025-05-15',
    readTime: 8,
  },
  {
    title: 'Manufacturing Excellence for Global Markets',
    slug: 'manufacturing-excellence-global',
    excerpt: 'How Indian manufacturers can achieve international quality standards and scale production for export.',
    cover_image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&q=80',
    category: 'Manufacturing',
    author: 'TranCoreX Team',
    created_at: '2025-04-28',
    readTime: 6,
  },
  {
    title: 'European Market Entry: A Strategic Playbook',
    slug: 'european-market-entry-playbook',
    excerpt: 'Step-by-step strategies for Indian businesses looking to establish a foothold in European markets.',
    cover_image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
    category: 'Strategy',
    author: 'TranCoreX Team',
    created_at: '2025-04-10',
    readTime: 10,
  },
];

export function BlogPreview() {
  return (
    <section className="section-padding bg-graphite">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Insights & Updates"
          title="Latest Blog"
          description="Expert insights on global trade, export strategies, and market trends."
          align="center"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {BLOG_POSTS.map((post) => (
            <motion.div key={post.slug} variants={cardVariants}>
              <Link href={`/blog/${post.slug}`}>
                <Card variant="feature" className="group overflow-hidden h-full">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.cover_image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-gold/90 text-obsidian text-xs font-accent uppercase tracking-wider rounded-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-smoke mb-3">
                      <span>{formatDate(post.created_at)}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime} min read</span>
                    </div>
                    <h3 className="font-heading text-base uppercase text-white mb-3 group-hover:text-gold transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-smoke line-clamp-2 mb-4">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-2 text-gold text-sm font-accent uppercase tracking-wider group-hover:gap-3 transition-all">
                      Read More <ArrowRight size={14} />
                    </span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link href="/blog" className="btn-ghost">
            View All Articles <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
