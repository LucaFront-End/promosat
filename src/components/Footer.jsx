import { Link } from 'react-router-dom';
import { siteConfig, navLinks, offices } from '../data/content';
import { useState } from 'react';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Suscrito: ${email}`);
    setEmail('');
  };

  return (
    <footer className="footer" id="footer">
      <div className="footer__glow" aria-hidden="true" />
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__col footer__col--brand">
            <div className="footer__brand">
              <img src={siteConfig.logoWhite} alt={siteConfig.name} className="footer__logo" />
              <span className="footer__brand-name">Promosat</span>
            </div>
            <p className="body-sm footer__brand-desc">
              Con más de 35 años como uno de los grupos líderes en la industria de la Radio local a nivel nacional.
            </p>
            <div className="footer__social">
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>

          {/* Nav */}
          <div className="footer__col">
            <h4 className="footer__col-title">Nosotros</h4>
            {navLinks.map((link) => {
              const isExternal = link.href.startsWith('http') || link.href.startsWith('#');
              return isExternal ? (
                <a key={link.label} href={link.href} className="footer__link">{link.label}</a>
              ) : (
                <Link key={link.label} to={link.href} className="footer__link">{link.label}</Link>
              );
            })}
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contacto</h4>
            <a href={`tel:${siteConfig.phone}`} className="footer__link footer__link--icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="footer__link footer__link--icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>
              {siteConfig.email}
            </a>
            {offices.map((office, i) => (
              <div key={i} className="footer__office">
                <span className="footer__office-name">{office.name}</span>
                <a href={office.mapLink} target="_blank" rel="noopener noreferrer" className="footer__link body-sm">
                  {office.address}
                </a>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="footer__col">
            <h4 className="footer__col-title">Newsletter</h4>
            <p className="body-sm">Suscríbete a nuestras noticias y novedades.</p>
            <form className="footer__form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Tu email"
                className="footer__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn--primary footer__submit">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </form>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="body-sm">© {new Date().getFullYear()} Promosat de México. Todos los derechos reservados.</span>
          <span className="body-sm">Sitio realizado por DDMX Dilo Digital México</span>
        </div>
      </div>
    </footer>
  );
}
