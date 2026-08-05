import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ratingRanking } from '../data/content';
import { fetchTop5Rating } from '../lib/wixClient';
import './RatingLeaderboard.css';

gsap.registerPlugin(ScrollTrigger);

export default function RatingLeaderboard() {
  const sectionRef = useRef(null);
  const [data, setData] = useState({
    market: ratingRanking.market,
    headline: ratingRanking.headline,
    subtitle: ratingRanking.subtitle,
    periodo: 'Marzo, 2026',
    personas: 'Personas 25-54 AB',
    stations: [], // Start empty so initial state doesn't hardcode 3/5
  });

  useEffect(() => {
    async function loadWixData() {
      const wixData = await fetchTop5Rating();
      if (wixData && wixData.stations && wixData.stations.length > 0) {
        setData(prev => ({
          ...prev,
          periodo: wixData.periodo,
          personas: wixData.personas,
          stations: wixData.stations,
        }));
      } else {
        // Fallback if fetch fails
        setData(prev => ({
          ...prev,
          stations: ratingRanking.stations,
        }));
      }
    }
    loadWixData();
  }, []);

  const activeStations = data.stations.length > 0 ? data.stations : ratingRanking.stations;
  const maxRating = Math.max(...activeStations.map(s => s.rating || 0.001));
  const totalCount = activeStations.length;
  const ownCount = activeStations.filter(s => s.isOwn).length;
  const ownPercentage = Math.round((ownCount / (totalCount || 1)) * 100);

  // Find the highest ranking Promosat station (the top station belonging to Promosat)
  const isBestOwn = !!activeStations.find(s => s.isOwn);
  const bestOwnStation = activeStations.find(s => s.isOwn) || activeStations[0];
  
  // The crown 👑 is assigned to the top Promosat station with the most points
  const crownStationName = bestOwnStation ? bestOwnStation.name : (activeStations[0] && activeStations[0].name);

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

      // Stat cards fade in
      gsap.from('.rating-lb__stat-card', {
        y: 30, opacity: 0, duration: 0.8,
        stagger: 0.15,
        scrollTrigger: { trigger: '.rating-lb__stats', start: 'top 80%' }
      });

    }, sectionRef);
    return () => ctx.revert();
  }, [activeStations]);

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
            INRA {data.periodo}
          </div>
          <div className="rating-lb__demographic">{data.personas}</div>
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
              {activeStations.map((station) => {
                const pct = maxRating > 0 ? (station.rating / maxRating) * 100 : 0;
                const hasCrown = station.name === crownStationName;

                return (
                  <div
                    key={station.rank || station.name}
                    className={`rating-lb__row ${station.isOwn ? 'rating-lb__row--own' : ''} ${hasCrown ? 'rating-lb__row--first' : ''}`}
                  >
                    <div className="rating-lb__rank">
                      {hasCrown ? (
                        <div className="rating-lb__crown" title="Emisora líder de Promosat">
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
                          style={{ width: `${pct}%` }}
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
            {/* Card 1: Count of own stations */}
            <div className="rating-lb__stat-card rating-lb__stat-card--hero">
              <div className="rating-lb__stat-number">
                <span className="rating-lb__own-count">{ownCount}</span>
                <span className="rating-lb__stat-of">/{totalCount}</span>
              </div>
              <p className="rating-lb__stat-label">
                {ownCount === 1 ? 'Emisora' : 'Emisoras'} de <strong>Promosat de México</strong> en el Top {totalCount}
              </p>
            </div>

            {/* Card 2: Best position of Promosat */}
            <div className="rating-lb__stat-card">
              <div className="rating-lb__stat-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <div className="rating-lb__stat-value">#{bestOwnStation ? bestOwnStation.rank : 1}</div>
              <p className="rating-lb__stat-desc">
                {bestOwnStation
                  ? isBestOwn
                    ? `${bestOwnStation.name} posicionada en el lugar #${bestOwnStation.rank} con ${bestOwnStation.rating.toFixed(3)} de rating`
                    : `${bestOwnStation.name} lidera con ${bestOwnStation.rating.toFixed(3)} de rating global`
                  : ''}
              </p>
            </div>

            {/* Card 3: Percentage of representation */}
            <div className="rating-lb__stat-card">
              <div className="rating-lb__stat-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <div className="rating-lb__stat-value">{ownPercentage}%</div>
              <p className="rating-lb__stat-desc">Del Top {totalCount} le pertenece a Promosat de México</p>
            </div>

            <p className="rating-lb__disclaimer">
              * Fuente: INRA {data.periodo} · {data.personas} · ZMG.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
