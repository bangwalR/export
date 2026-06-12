'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-obsidian">
      <div className="text-center px-4">
        <h1 className="font-heading text-3xl uppercase text-white mb-4">Something Went Wrong</h1>
        <p className="text-smoke mb-8">An unexpected error occurred. Please try again.</p>
        <Button variant="primary" onClick={reset}>Try Again</Button>
      </div>
    </section>
  );
}
