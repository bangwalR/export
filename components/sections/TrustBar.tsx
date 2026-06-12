'use client';

import { PARTNER_LOGOS } from '@/lib/constants';

export function TrustBar() {
  const row1 = PARTNER_LOGOS.slice(0, 6);
  const row2 = PARTNER_LOGOS.slice(6);

  const LogoItem = ({ name }: { name: string }) => (
    <div className="flex items-center justify-center px-8 py-4 mx-4 group cursor-default">
      <span className="font-heading text-lg uppercase tracking-wider text-smoke/40 group-hover:text-gold transition-colors duration-500 whitespace-nowrap">
        {name}
      </span>
    </div>
  );

  return (
    <section className="py-12 bg-obsidian overflow-hidden">
      <p className="text-center text-xs uppercase tracking-[0.3em] text-smoke mb-8 font-accent">
        Trusted by Global Leaders
      </p>
      <div className="space-y-4">
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {[...row1, ...row1, ...row1].map((name, i) => (
            <LogoItem key={`r1-${i}`} name={name} />
          ))}
        </div>
        <div className="flex animate-marquee-reverse hover:[animation-play-state:paused]">
          {[...row2, ...row2, ...row2].map((name, i) => (
            <LogoItem key={`r2-${i}`} name={name} />
          ))}
        </div>
      </div>
    </section>
  );
}
