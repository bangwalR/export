import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-obsidian relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-gold/30 rounded-full animate-pulse-gold" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-gold/20 rounded-full" />
      </div>
      <div className="text-center relative z-10 px-4">
        <p className="font-display text-8xl md:text-[12rem] font-bold text-gold/20 leading-none">404</p>
        <h1 className="font-heading text-2xl md:text-3xl uppercase text-white mt-4 mb-4">Page Not Found</h1>
        <p className="text-smoke mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us guide you back to safe harbor.
        </p>
        <Link href="/">
          <Button variant="primary">Return Home</Button>
        </Link>
      </div>
    </section>
  );
}
