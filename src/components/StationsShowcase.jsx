import { useRef, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stationsGDL as stations } from '../data/content';
import './StationsShowcase.css';

gsap.registerPlugin(ScrollTrigger);

export default function StationsShowcase() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const count = stations.length;

  // 3D tilt on entire card
  const handleMouseMove = (e, idx) => {
    const card = cardsRef.current[idx];
    if (!card || idx !== activeIdx) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    
    gsap.to(card.querySelector('.stack-card__inner'), {
      rotateY: x * 8,
      rotateX: -y * 8,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: true,
    });

    // Move shine overlay
    const shine = card.querySelector('.stack-card__shine');
    if (shine) {
      shine.style.background = `radial-gradient(circle at ${(x + 1) * 50}% ${(y + 1) * 50}%, rgba(255,255,255,0.15) 0%, transparent 60%)`;
    }
  };

  const handleMouseLeave = (idx) => {
    const card = cardsRef.current[idx];
    if (!card) return;
    gsap.to(card.querySelector('.stack-card__inner'), {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: true,
    });
    const shine = card.querySelector('.stack-card__shine');
    if (shine) shine.style.background = 'transparent';
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${count * 80}%`,
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress;
          const newIdx = Math.min(Math.floor(progress * count), count - 1);
          setActiveIdx(newIdx);

          cardsRef.current.forEach((card, i) => {
            if (!card) return;
            const cardProgress = progress * count - i;

            if (cardProgress < 0) {
              // Not yet visible
              gsap.set(card, {
                y: '110%',
                scale: 1,
                rotationZ: 3,
                opacity: 0,
                zIndex: i,
              });
            } else if (cardProgress >= 0 && cardProgress < 1) {
              // Entering — sweeps up with slight rotation
              const t = cardProgress;
              const ease = t * t * (3 - 2 * t); // smoothstep
              gsap.set(card, {
                y: `${(1 - ease) * 110}%`,
                scale: 1,
                rotationZ: (1 - ease) * 3,
                opacity: Math.min(t * 3, 1),
                zIndex: count + i,
              });
            } else {
              // Stacked behind — push back with offset
              const depth = Math.min(cardProgress - 1, 4);
              gsap.set(card, {
                y: -depth * 28,
                x: -depth * 6,
                scale: 1 - depth * 0.035,
                rotationZ: -depth * 0.8,
                opacity: Math.max(1 - depth * 0.22, 0.15),
                zIndex: count - Math.floor(depth),
              });
            }
          });
        },
      });

      // Entrance animations
      gsap.from('.stations-stack__title-word', {
        y: 80, opacity: 0, duration: 0.8,
        stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [count]);

  return (
    <section className="stations-stack" id="cobertura" ref={sectionRef}>
      {/* Floating background frequencies */}
      <div className="stations-stack__bg-freqs" aria-hidden="true">
        <span className="bg-freq" style={{ top: '15%', left: '5%' }}>88.1</span>
        <span className="bg-freq" style={{ top: '60%', left: '8%' }}>95.5</span>
        <span className="bg-freq" style={{ top: '30%', right: '5%' }}>102.1</span>
        <span className="bg-freq" style={{ top: '75%', right: '10%' }}>91.5</span>
        <span className="bg-freq" style={{ top: '45%', left: '15%' }}>104.3</span>
      </div>

      <div className="stations-stack__inner">
        {/* ── Left: Sidebar ── */}
        <div className="stations-stack__sidebar">
          <div className="stations-stack__header">
            <span className="tag tag--accent"><span className="tag__dot" /> EMISORAS</span>
            <h2 className="stations-stack__title">
              <span className="stations-stack__title-word">Las mejores</span>
              <span className="stations-stack__title-word">emisoras</span>
              <span className="stations-stack__title-word stations-stack__title-word--accent">a nivel Nacional</span>
            </h2>
            <p className="stations-stack__sub">
              Las {count} emisoras de la casa, estratégicamente posicionadas en todo México para maximizar el alcance de tu marca.
            </p>
          </div>

          {/* Counter */}
          <div className="stations-stack__counter">
            <span className="stations-stack__counter-current" key={activeIdx}>
              {String(activeIdx + 1).padStart(2, '0')}
            </span>
            <div className="stations-stack__counter-right">
              <span className="stations-stack__counter-sep">/</span>
              <span className="stations-stack__counter-total">{String(count).padStart(2, '0')}</span>
              <span className="stations-stack__counter-label">emisoras</span>
            </div>
          </div>

          {/* Progress */}
          <div className="stations-stack__progress-track">
            <div
              className="stations-stack__progress-fill"
              style={{ height: `${((activeIdx + 1) / count) * 100}%` }}
            />
          </div>

          {/* Active station name */}
          <div className="stations-stack__active-name" key={`name-${activeIdx}`}>
            {stations[activeIdx].name}
          </div>
        </div>

        {/* ── Right: Stacking Cards ── */}
        <div className="stations-stack__cards-area">
          {stations.map((station, i) => (
            <div
              key={i}
              className={`stack-card ${i === activeIdx ? 'is-front' : ''}`}
              ref={el => cardsRef.current[i] = el}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
              style={{ perspective: '800px' }}
            >
              <div className="stack-card__inner">
                {/* Shine overlay for mouse */}
                <div className="stack-card__shine" />

                {/* Accent stripe */}
                <div className="stack-card__stripe" />

                {/* Logo */}
                <div className="stack-card__logo-wrap">
                  <img
                    src={station.logo}
                    alt={station.name}
                    className="stack-card__logo-img"
                    loading="lazy"
                  />
                </div>

                {/* Info */}
                <div className="stack-card__info">
                  <h3 className="stack-card__name">{station.name}</h3>
                  <div className="stack-card__meta">
                    <span className="stack-card__freq">{station.freq}</span>
                    <span className="stack-card__divider">•</span>
                    <span className="stack-card__city">{station.city}</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="stack-card__actions">
                  <a
                    href={`https://wa.me/525552508990?text=${encodeURIComponent(`SW- Hola quisiera información para publicidad en Radio en ${station.name}`)}`}
                    className="stack-card__cta"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Cotizar Espacio</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                  <Link
                    to={`/emisora/${station.slug}`}
                    className="stack-card__link"
                  >
                    Conocer más →
                  </Link>
                </div>

                {/* Big number */}
                <span className="stack-card__big-number">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
