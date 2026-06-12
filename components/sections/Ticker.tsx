'use client';

export function Ticker() {
  const items = [
    'Export Consultancy',
    'Manufacturing',
    'International Trading',
    'GCC Markets',
    'Europe',
    'North America',
    'Australia',
    'Supply Chain',
    'Compliance',
  ];

  const tickerContent = items.map((item) => (
    <span key={item} className="flex items-center gap-4 mx-8">
      <span className="w-1.5 h-1.5 bg-gold rounded-full" />
      {item}
    </span>
  ));

  return (
    <div className="bg-gold/10 border-y border-gold/20 py-4 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...tickerContent, ...tickerContent]}
      </div>
    </div>
  );
}
