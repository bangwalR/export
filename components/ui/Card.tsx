import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'dark' | 'feature';
}

export function Card({ className, variant = 'glass', children, ...props }: CardProps) {
  const variants = {
    glass: 'glass-card',
    dark: 'bg-graphite border border-onyx border-t-gold/30 rounded-xl',
    feature: 'bg-graphite rounded-2xl overflow-hidden border border-onyx',
  };

  return (
    <div className={cn(variants[variant], 'card-hover', className)} {...props}>
      {children}
    </div>
  );
}
