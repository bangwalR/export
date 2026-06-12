'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Instagram, Facebook, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG, NAV_LINKS, SERVICES } from '@/lib/constants';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { Logo } from '@/components/shared/Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-graphite border-t border-onyx relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-gold" />

      <div className="container-custom section-padding">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp}>
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <Logo size="md" showText={true} />
            </Link>
            <p className="text-smoke text-sm leading-relaxed mb-6">
              Premier export consultancy, manufacturing, and international trading company serving global markets from Delhi, India.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: SITE_CONFIG.social.linkedin },
                { icon: Twitter, href: SITE_CONFIG.social.twitter },
                { icon: Instagram, href: SITE_CONFIG.social.instagram },
                { icon: Facebook, href: SITE_CONFIG.social.facebook },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-onyx rounded-sm text-smoke hover:text-gold hover:border-gold/30 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="font-heading text-sm uppercase tracking-wider text-gold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.slice(0, 6).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-smoke hover:text-gold transition-colors flex items-center gap-1 group">
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeInUp}>
            <h4 className="font-heading text-sm uppercase tracking-wider text-gold mb-6">Services</h4>
            <ul className="space-y-3">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="text-sm text-smoke hover:text-gold transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeInUp}>
            <h4 className="font-heading text-sm uppercase tracking-wider text-gold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-smoke">
                <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                {SITE_CONFIG.address}
              </li>
              <li>
                <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-3 text-sm text-smoke hover:text-gold transition-colors">
                  <Mail size={16} className="text-gold shrink-0" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-3 text-sm text-smoke hover:text-gold transition-colors">
                  <Phone size={16} className="text-gold shrink-0" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <div className="mt-16 pt-8 border-t border-onyx flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-smoke">
            © {currentYear} {SITE_CONFIG.name} All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-smoke">
            <Link href="/faqs" className="hover:text-gold transition-colors">FAQs</Link>
            <Link href="/contact" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
