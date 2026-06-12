'use client';

import { useState, useCallback, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Toaster } from 'sonner';
import { PageLoader } from '@/components/shared/PageLoader';
import { SmoothScroll } from '@/components/shared/SmoothScroll';
import { ScrollProgressBar } from '@/components/shared/ScrollProgressBar';
import { CustomCursor } from '@/components/shared/CustomCursor';
import { BackToTop } from '@/components/shared/BackToTop';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import { CookieConsent } from '@/components/shared/CookieConsent';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export function Providers({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  if (isAdmin) {
    return (
      <>
        {children}
        <Toaster
          theme="dark"
          position="top-right"
          toastOptions={{
            style: {
              background: '#111318',
              border: '1px solid rgba(201,168,76,0.2)',
              color: '#FAF8F3',
            },
          }}
        />
      </>
    );
  }

  return (
    <>
      {loading && <PageLoader onComplete={handleLoadComplete} />}
      <SmoothScroll>
        <ScrollProgressBar />
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <BackToTop />
        <WhatsAppButton />
        <CookieConsent />
        <Toaster
          theme="dark"
          position="top-right"
          toastOptions={{
            style: {
              background: '#111318',
              border: '1px solid rgba(201,168,76,0.2)',
              color: '#FAF8F3',
            },
          }}
        />
      </SmoothScroll>
    </>
  );
}
