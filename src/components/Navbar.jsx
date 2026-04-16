import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig, navLinks, stationsGDL } from '../data/content';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Sub-pages: always visible from render #1 (no flash)
  // Home: hidden during hero cinematic, shows after
  const [visible, setVisible] = useState(!isHome);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Reset visibility when route changes
    if (!isHome) {
      setVisible(true);
      return;
    }

    setVisible(false); // hide on home until correct scroll depth

    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;

      // GSAP pinSpacing calculation (native scroll):
      // Hero pin adds ~250vh spacer → TextReveal starts at ~350vh DOM pos
      // TextReveal pin adds ~150vh spacer
      // PinnedShowcase starts at ~600vh DOM pos
      // Show navbar at ~85% through TextReveal = 350 + 0.85*150 ≈ 478vh
      const showAt = vh * 4.5;
      setVisible(y > showAt);
      setScrolled(y > showAt + vh * 0.3);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const handleNavClick = () => setMenuOpen(false);

  // Handle anchor clicks — accounts for GSAP pinSpacing adding real DOM height
  const handleAnchorLink = (href) => {
    setMenuOpen(false);
    if (!href.startsWith('/#')) return;

    const selector = href.slice(1); // e.g. '#about'
    const el = document.querySelector(selector);
    if (!el) return;

    // getBoundingClientRect gives the CURRENT visual position (after pinSpacing offsets)
    // Adding scrollY converts from viewport-relative to page-absolute
    const NAVBAR_HEIGHT = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  };

  return (
    <nav
      className={`navbar ${visible ? 'navbar--visible' : ''} ${scrolled ? 'navbar--scrolled' : ''}`}
      id="navbar"
    >
      <div className="navbar__inner container">
        <Link to="/" className="navbar__brand" onClick={handleNavClick}>
          <img
            src={scrolled ? siteConfig.logo : siteConfig.logoWhite}
            alt={siteConfig.name}
            className="navbar__logo"
          />
          <span className="navbar__name">Promosat</span>
        </Link>

        <div className="navbar__links">
          {navLinks.map((link) => {
            const isInternal = link.href.startsWith('/') && !link.href.startsWith('http');
            const isAnchor = link.href.startsWith('/#');

            const isNosotros = link.label === 'Nosotros';
            const isEmisoras = link.label === 'Emisoras';
            const hasSubmenu = isNosotros || isEmisoras;
            
            let LinkComponent;

            if (isAnchor) {
              LinkComponent = isHome ? (
                // On home: smooth scroll to section
                <button
                  className="navbar__link"
                  onClick={() => handleAnchorLink(link.href)}
                >
                  {link.label}
                  {hasSubmenu && <span className="navbar__chevron">▼</span>}
                </button>
              ) : (
                // Off home: navigate to home then to anchor
                <Link to={link.href} className="navbar__link" onClick={hasSubmenu ? undefined : handleNavClick}>
                  {link.label}
                  {hasSubmenu && <span className="navbar__chevron">▼</span>}
                </Link>
              );
            } else {
              LinkComponent = (
                <Link to={link.href} className="navbar__link" onClick={handleNavClick}>
                  {link.label}
                </Link>
              );
            }

            if (isEmisoras) {
              return (
                <div key={link.label} className="navbar__dropdown-wrapper">
                  {LinkComponent}
                  <div className="navbar__dropdown">
                    {stationsGDL.map((station) => (
                      <Link 
                        key={station.slug} 
                        to={`/emisora/${station.slug}`}
                        className="navbar__dropdown-item"
                        onClick={handleNavClick}
                      >
                        <img src={station.logo} alt={station.name} className="navbar__dropdown-logo" />
                        <span>{station.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            if (isNosotros) {
              return (
                <div key={link.label} className="navbar__dropdown-wrapper">
                  {LinkComponent}
                  <div className="navbar__dropdown">
                     <button className="navbar__dropdown-item" onClick={() => handleAnchorLink('/#about')}>
                        <span>Grupo Promomedios</span>
                     </button>
                     <Link to="/canal-continental" className="navbar__dropdown-item" onClick={handleNavClick}>
                        <span>Canal Continental</span>
                     </Link>
                     <Link to="/palcco" className="navbar__dropdown-item" onClick={handleNavClick}>
                        <span>PALCCO</span>
                     </Link>
                  </div>
                </div>
              );
            }

            return <div key={link.label}>{LinkComponent}</div>;
          })}
        </div>

        <div className="navbar__actions">
          <a href={`tel:${siteConfig.phone}`} className="navbar__phone">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
          </a>
          <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--primary navbar__cta">
            Cotizar
          </a>
          <button
            className={`navbar__hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
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
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link to={link.href} className="navbar__mobile-link" onClick={handleNavClick}>
                  {link.label}
                </Link>
                {link.label === 'Emisoras' && (
                  <div className="navbar__mobile-dropdown">
                    {stationsGDL.map((station) => (
                      <Link 
                        key={station.slug}
                        to={`/emisora/${station.slug}`}
                        className="navbar__mobile-dropdown-item"
                        onClick={handleNavClick}
                      >
                        <img src={station.logo} alt="" />
                        <span>{station.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
                {link.label === 'Nosotros' && (
                  <div className="navbar__mobile-dropdown">
                     <button className="navbar__mobile-dropdown-item" onClick={() => { setMenuOpen(false); handleAnchorLink('/#about'); }} style={{ textAlign: 'left' }}>
                        <span>Grupo Promomedios</span>
                     </button>
                     <Link to="/canal-continental" className="navbar__mobile-dropdown-item" onClick={handleNavClick}>
                        <span>Canal Continental</span>
                     </Link>
                     <Link to="/palcco" className="navbar__mobile-dropdown-item" onClick={handleNavClick}>
                        <span>PALCCO</span>
                     </Link>
                  </div>
                )}
              </motion.div>
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
