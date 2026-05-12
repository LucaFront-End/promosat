import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig, offices } from '../data/content';
import './ContactSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Header entrance
      gsap.from('.offices__header > *', {
        y: 40, opacity: 0, duration: 0.7,
        stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      });

      // Stacking cards on scroll
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length > 1) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${cards.length * 80}%`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            cards.forEach((card, i) => {
              const cardProgress = progress * cards.length - i;

              if (cardProgress < 0) {
                // Not yet — below
                gsap.set(card, {
                  y: '100vh',
                  scale: 1,
                  opacity: 0,
                  zIndex: i,
                });
              } else if (cardProgress >= 0 && cardProgress < 1) {
                // Entering
                const t = cardProgress * cardProgress * (3 - 2 * cardProgress);
                gsap.set(card, {
                  y: `${(1 - t) * 80}vh`,
                  scale: 1,
                  opacity: Math.min(cardProgress * 2.5, 1),
                  zIndex: cards.length + i,
                });
              } else {
                // Stacked behind
                const depth = Math.min(cardProgress - 1, 2);
                gsap.set(card, {
                  y: -depth * 24,
                  scale: 1 - depth * 0.03,
                  opacity: Math.max(1 - depth * 0.3, 0.5),
                  zIndex: cards.length - Math.floor(depth),
                });
              }
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Build card data: 2 offices + 1 contact card
  const allCards = [
    ...offices.map(o => ({ type: 'office', ...o })),
    { type: 'contact' },
  ];

  return (
    <section className="offices-section" ref={sectionRef} id="contacto">


      <div className="offices__inner">
        {/* Header */}
        <div className="offices__header">
          <span className="tag tag--dark"><span className="tag__dot tag__dot--dark" /> CONTACTO</span>
          <h2 className="offices__title">Nuestras Oficinas</h2>
          <p className="offices__sub">
            Contáctanos y nuestro equipo te ayudará a crear la estrategia perfecta para tu marca.
          </p>
        </div>

        {/* Stacking cards */}
        <div className="offices__cards-area">
          {allCards.map((card, i) => (
            <div
              key={i}
              className="office-card"
              ref={el => cardsRef.current[i] = el}
            >
              {card.type === 'office' ? (
                <div className="office-card__inner">
                  <div className="office-card__icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <h3 className="office-card__name">{card.name}</h3>
                  <p className="office-card__address">{card.address}</p>
                  <a href={card.mapLink} target="_blank" rel="noopener noreferrer" className="office-card__map-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    Ver en Google Maps
                  </a>
                </div>
              ) : (
                <div className="office-card__inner office-card__inner--cta">
                  <div className="office-card__icon office-card__icon--accent">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                  </div>
                  <h3 className="office-card__name">Contacto Directo</h3>
                  <a href={`tel:${siteConfig.phone}`} className="office-card__phone">{siteConfig.phone}</a>
                  <a href={`mailto:${siteConfig.email}`} className="office-card__email">{siteConfig.email}</a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
