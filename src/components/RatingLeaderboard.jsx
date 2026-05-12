import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ratingRanking } from '../data/content';
import './RatingLeaderboard.css';

gsap.registerPlugin(ScrollTrigger);

export default function RatingLeaderboard() {
  const sectionRef = useRef(null);
  const data = ratingRanking;
  const maxRating = Math.max(...data.stations.map(s => s.rating));
  const ownCount = data.stations.filter(s => s.isOwn).length;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from('.rating-lb__header > *', {
        y: 40, opacity: 0, duration: 0.7,
        stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      });

      // Rows stagger
      gsap.from('.rating-lb__row', {
        x: -60, opacity: 0, duration: 0.6,
        stagger: 0.1,
        scrollTrigger: { trigger: '.rating-lb__table', start: 'top 80%' }
      });

      // Bar fill animation
      document.querySelectorAll('.rating-lb__bar-fill').forEach((bar) => {
        const width = bar.dataset.width;
        gsap.fromTo(bar,
          { width: '0%' },
          {
            width: `${width}%`,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: bar, start: 'top 85%' }
          }
        );
      });

      // Counter animate
      gsap.from('.rating-lb__own-count', {
        textContent: 0,
        duration: 1.5,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: { trigger: '.rating-lb__stats', start: 'top 80%' }
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="rating-lb" ref={sectionRef}>
      {/* Background elements */}
      <div className="rating-lb__bg-glow" aria-hidden="true" />
      <div className="rating-lb__bg-grid" aria-hidden="true" />

      <div className="container rating-lb__container">
        {/* Header */}
        <div className="rating-lb__header">
          <span className="tag tag--accent">
            <span className="tag__dot" /> RATING {data.market.toUpperCase()}
          </span>
          <h2 className="rating-lb__title">{data.headline}</h2>
          <p className="rating-lb__subtitle">{data.subtitle}</p>
          <div className="rating-lb__period">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {data.month} {data.year}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="rating-lb__grid">
          {/* Leaderboard Table */}
          <div className="rating-lb__table-wrap">
            {/* Table Header */}
            <div className="rating-lb__table-header">
              <span className="rating-lb__th rating-lb__th--rank">#</span>
              <span className="rating-lb__th rating-lb__th--name">Emisora</span>
              <span className="rating-lb__th rating-lb__th--siglas">Siglas</span>
              <span className="rating-lb__th rating-lb__th--bar">Rating</span>
              <span className="rating-lb__th rating-lb__th--val">Valor</span>
            </div>

            {/* Table Body */}
            <div className="rating-lb__table">
              {data.stations.map((station) => {
                const pct = (station.rating / maxRating) * 100;
                return (
                  <div
                    key={station.rank}
                    className={`rating-lb__row ${station.isOwn ? 'rating-lb__row--own' : ''} ${station.rank === 1 ? 'rating-lb__row--first' : ''}`}
                  >
                    <div className="rating-lb__rank">
                      {station.rank === 1 ? (
                        <div className="rating-lb__crown">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5z"/>
                          </svg>
                          <span>{station.rank}</span>
                        </div>
                      ) : (
                        <span>{station.rank}</span>
                      )}
                    </div>

                    <div className="rating-lb__name">
                      <span className="rating-lb__name-text">{station.name}</span>
                      {station.isOwn && (
                        <span className="rating-lb__badge" title="Emisora de Promosat">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                          </svg>
                        </span>
                      )}
                    </div>

                    <div className="rating-lb__siglas">{station.siglas}</div>

                    <div className="rating-lb__bar">
                      <div className="rating-lb__bar-track">
                        <div
                          className={`rating-lb__bar-fill ${station.isOwn ? 'rating-lb__bar-fill--own' : ''}`}
                          data-width={pct}
                          style={{ width: 0 }}
                        />
                      </div>
                    </div>

                    <div className="rating-lb__val">{station.rating.toFixed(3)}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="rating-lb__stats">
            <div className="rating-lb__stat-card rating-lb__stat-card--hero">
              <div className="rating-lb__stat-number">
                <span className="rating-lb__own-count">{ownCount}</span>
                <span className="rating-lb__stat-of">/5</span>
              </div>
              <p className="rating-lb__stat-label">
                Emisoras de <strong>Promosat de México</strong> en el Top 5
              </p>
            </div>

            <div className="rating-lb__stat-card">
              <div className="rating-lb__stat-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <div className="rating-lb__stat-value">#1</div>
              <p className="rating-lb__stat-desc">Radio Mujer lidera con 0.529 de rating global</p>
            </div>

            <div className="rating-lb__stat-card">
              <div className="rating-lb__stat-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <div className="rating-lb__stat-value">60%</div>
              <p className="rating-lb__stat-desc">Del Top 5 le pertenece a Promosat de México</p>
            </div>

            <p className="rating-lb__disclaimer">
              * Datos sujetos a actualización mensual. Fuente: monitoreo de audiencias ZMG.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
