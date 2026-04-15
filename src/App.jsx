import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';

/* Pages */
import HomePage from './pages/HomePage';
import StationPage from './pages/StationPage';
import ContactPage from './pages/ContactPage';
import PromediaPage from './pages/PromediaPage';

export default function App() {
  return (
    <>
      <div className="noise-overlay"></div>
      <div className="vignette-glow"></div>
      <ScrollToTop />
      <SmoothScroll>
        <CustomCursor activeBlendMode={true} />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/emisora/:slug" element={<StationPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/promedia" element={<PromediaPage />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppFloat />
      </SmoothScroll>
    </>
  );
}
