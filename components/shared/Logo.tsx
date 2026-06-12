import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const sizes = {
  sm: { icon: 32, text: 'text-base' },
  md: { icon: 44, text: 'text-xl' },
  lg: { icon: 60, text: 'text-2xl' },
};

export function Logo({ size = 'md', showText = false, className }: LogoProps) {
  const s = sizes[size];
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <Image
        src="/images/logo.svg"
        alt="TranCoreX Logo"
        width={s.icon}
        height={s.icon}
        className="shrink-0"
        priority
      />
      {showText && (
        <span className={cn('font-heading font-bold tracking-[0.15em] text-white', s.text)}>
          TRAN<span className="text-gold">COREX</span>
        </span>
      )}
    </span>
  );
}
