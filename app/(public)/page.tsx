import { Hero } from '@/components/sections/Hero';
import { Ticker } from '@/components/sections/Ticker';
import { TrustBar } from '@/components/sections/TrustBar';
import { AboutTeaser } from '@/components/sections/AboutTeaser';
import { ServicesCards } from '@/components/sections/ServicesCards';
import { GlobalMap } from '@/components/sections/GlobalMap';
import { Statistics } from '@/components/sections/Statistics';
import { IndustriesScroll } from '@/components/sections/IndustriesScroll';
import { Testimonials } from '@/components/sections/Testimonials';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { CTABanner } from '@/components/sections/CTABanner';
import { BlogPreview } from '@/components/sections/BlogPreview';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <TrustBar />
      <AboutTeaser />
      <ServicesCards />
      <GlobalMap />
      <Statistics />
      <IndustriesScroll />
      <Testimonials />
      <WhyChooseUs />
      <CTABanner />
      <BlogPreview />
    </>
  );
}
