import { NextResponse } from 'next/server';
import { SITE_CONFIG, SERVICES } from '@/lib/constants';

export async function GET() {
  const baseUrl = SITE_CONFIG.url;

  const staticPages = [
    '', '/about', '/services', '/industries', '/global-markets',
    '/why-choose-us', '/testimonials', '/gallery', '/blog',
    '/contact', '/faqs',
  ];

  const servicePages = SERVICES.map((s) => `/services/${s.slug}`);

  const urls = [...staticPages, ...servicePages].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.8,
  }));

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${u.url}</loc>
    <lastmod>${u.lastModified}</lastmod>
    <changefreq>${u.changeFrequency}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
