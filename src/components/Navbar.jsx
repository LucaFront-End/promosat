import { useState, useEffect } from 'react';
import { siteConfig, navLinks } from '../data/content';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Navbar hidden during Hero cinematic (first ~100vh + pin scroll)
      // Show navbar after scrolling past the hero zone
      setVisible(y > window.innerHeight * 2.2);
      setScrolled(y > window.innerHeight * 2.5);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${visible ? 'navbar--visible' : ''} ${scrolled ? 'navbar--scrolled' : ''}`} id="navbar">
      <div className="navbar__inner container">
        <a href="/" className="navbar__brand">
          <img src={scrolled ? siteConfig.logo : siteConfig.logoWhite} alt={siteConfig.name} className="navbar__logo" />
          <span className="navbar__name">Promosat</span>
        </a>

        <div className="navbar__links">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="navbar__link">
              {link.label}
            </a>
          ))}
        </div>

        <div className="navbar__actions">
          <a href={`tel:${siteConfig.phone}`} className="navbar__phone">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          </a>
          <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--primary navbar__cta">
            Cotizar
          </a>
          <button className={`navbar__hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="navbar__mobile-link"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
            <a href={siteConfig.whatsapp} className="btn btn--primary" style={{ marginTop: '1rem', width: '100%' }}>
              Cotizar Ahora
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
