import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutContent } from '../data/content';
import './PinnedShowcase.css';

gsap.registerPlugin(ScrollTrigger);

export default function PinnedShowcase() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Stagger cards on scroll
      gsap.from('.showcase-card', {
        y: 100, opacity: 0, duration: 0.8,
        stagger: 0.25,
        scrollTrigger: {
          trigger: '.pinned-showcase__right',
          start: 'top 75%',
        }
      });

      // Fade in the left content
      gsap.from('.pinned-showcase__content', {
        x: -60, opacity: 0, duration: 1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="pinned-showcase" id="about" ref={sectionRef}>
      <div className="pinned-showcase__container container">
        
        {/* Left Column (Sticky) */}
        <div className="pinned-showcase__left">
          <div className="pinned-showcase__content">
            <span className="tag tag--accent"><span className="tag__dot" /> NOSOTROS</span>
            <h2 className="heading-xl pinned-showcase__title">
              <span className="text-accent">Grupo Promomedios</span>
            </h2>
            <p className="body-lg" style={{ color: 'var(--color-text-secondary)', maxWidth: '420px', lineHeight: 1.7 }}>
              {aboutContent.description}
            </p>
          </div>
        </div>

        {/* Right Column (Scrolling) */}
        <div className="pinned-showcase__right">
          {aboutContent.companies.map((company, i) => (
            <ShowcaseCard key={i} company={company} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

import { Link } from 'react-router-dom';

function ShowcaseCard({ company, index }) {
  const waMessage = encodeURIComponent(`Hola quisiera más información de ${company.name}`);
  const waLink = `https://wa.me/525552508990?text=${waMessage}`;

  const renderActionBtn = () => {
    if (company.href) {
      return (
        <Link to={company.href} className="showcase-card__contact-btn">
          Ver Más Detalle
        </Link>
      );
    }
    return (
      <Link
        to="/contacto"
        className="showcase-card__contact-btn"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
        Contactar
      </Link>
    );
  };

  return (
    <div className="showcase-card">
      <div className="showcase-card__number">0{index + 1}</div>
      <div className={`showcase-card__img-wrap ${index === 0 ? 'showcase-card__img-wrap--dark' : ''}`}>
        <img src={company.logo} alt={company.name} className="showcase-card__logo" />
      </div>
      <h3 className="heading-md" style={{ marginTop: '1.5rem', marginBottom: '0.75rem' }}>{company.name}</h3>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>{company.description}</p>
      {renderActionBtn()}
    </div>
  );
}
