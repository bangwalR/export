'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20TranCoreX,%20I%20would%20like%20to%20inquire%20about%20your%20services.`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Contact on WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />
      <span className="relative flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
        <MessageCircle size={28} className="text-white" fill="white" />
      </span>
    </Link>
  );
}
