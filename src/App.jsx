import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PinnedShowcase from './components/PinnedShowcase';
import AdvantagesPremium from './components/AdvantagesPremium';
import StationsShowcase from './components/StationsShowcase';
import StatHighlight from './components/StatHighlight';
import PartnersMarquee from './components/PartnersMarquee';
import BlogPreview from './components/BlogPreview';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import TextReveal from './components/TextReveal';
import Preloader from './components/Preloader';
import ContactSection from './components/ContactSection';

export default function App() {
  const [loadingObj, setLoadingObj] = useState(true);

  return (
    <>
      <div className="noise-overlay"></div>
      <div className="vignette-glow"></div>
      {loadingObj && <Preloader onComplete={() => setLoadingObj(false)} />}
      <SmoothScroll>
      <CustomCursor activeBlendMode={true} />
      <Navbar />
      <main>
        <Hero />
        <TextReveal />
        <PinnedShowcase />
        <AdvantagesPremium />
        <StationsShowcase />
        <StatHighlight />
        <PartnersMarquee />
        <BlogPreview />
        <ContactSection />
        <CtaBanner />
      </main>
      <Footer />
      <WhatsAppFloat />
    </SmoothScroll>
    </>
    );
}
