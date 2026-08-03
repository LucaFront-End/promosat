import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../data/content';
import './CtaBanner.css';

gsap.registerPlugin(ScrollTrigger);

export default function CtaBanner() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.cta-banner__content > *', {
        y: 50, opacity: 0, duration: 0.7,
        stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="cta-banner section--flush" ref={sectionRef}>
      <div className="cta-banner__bg" aria-hidden="true">
        <div className="cta-banner__orb cta-banner__orb--1" />
        <div className="cta-banner__orb cta-banner__orb--2" />
      </div>
      <div className="cta-banner__content container">
        <span className="tag tag--accent"><span className="tag__dot" /> ¿Listo para crecer?</span>
        <h2 className="heading-lg cta-banner__title">
          Impulsa tu marca<br />con el poder de la Radio
        </h2>
        <p className="body-lg cta-banner__desc">
          Conecta con millones de oyentes a nivel nacional. Nuestro equipo de expertos te ayudará a crear la estrategia perfecta.
        </p>
        <div className="cta-banner__actions">
          <a href="/contacto" className="btn btn--primary">
            Contactar
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <button className="btn btn--outline" data-open-brochure style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Descargar Brochure
          </button>
          <a href={`tel:${siteConfig.phone}`} className="btn btn--outline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            Llamar
          </a>
        </div>
      </div>
    </section>
  );
}
