'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('trancorex-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('trancorex-cookie-consent', 'accepted');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[90] p-4 md:p-6"
        >
          <div className="container-custom">
            <div className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-smoke text-center md:text-left">
                We use cookies to enhance your experience and analyze site traffic. By continuing to browse, you agree to our use of cookies.
              </p>
              <div className="flex gap-3 shrink-0">
                <Button variant="primary" size="sm" onClick={accept}>
                  Accept
                </Button>
                <Button variant="outline" size="sm" onClick={() => setVisible(false)}>
                  Decline
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
