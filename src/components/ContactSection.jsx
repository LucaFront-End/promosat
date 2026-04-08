import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig, offices } from '../data/content';
import './ContactSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
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
                  <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="office-card__wa">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
