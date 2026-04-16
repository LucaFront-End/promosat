import { useState } from 'react';
import Hero from '../components/Hero';
import PinnedShowcase from '../components/PinnedShowcase';
import AdvantagesPremium from '../components/AdvantagesPremium';
import StationsShowcase from '../components/StationsShowcase';
import CoverageMap from '../components/CoverageMap';
import StatHighlight from '../components/StatHighlight';
import PartnersMarquee from '../components/PartnersMarquee';
import BlogPreview from '../components/BlogPreview';
import CtaBanner from '../components/CtaBanner';
import TextReveal from '../components/TextReveal';
import Preloader from '../components/Preloader';
import ContactSection from '../components/ContactSection';

export default function HomePage() {
  const [loadingObj, setLoadingObj] = useState(true);

  return (
    <>
      {loadingObj && <Preloader onComplete={() => setLoadingObj(false)} />}
      <Hero />
      <TextReveal />
      <PinnedShowcase />
      <AdvantagesPremium />
      <StationsShowcase />
      <CoverageMap />
      <StatHighlight />
      <PartnersMarquee />
      <BlogPreview />
      <ContactSection />
      <CtaBanner />
    </>
  );
}
