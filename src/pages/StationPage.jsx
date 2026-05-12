import { useParams, Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stationsGDL, siteConfig } from '../data/content';
import { STATION_VIDEOS } from '../data/videos';
import './StationPage.css';

gsap.registerPlugin(ScrollTrigger);

export default function StationPage() {
  const { slug } = useParams();
  const station = stationsGDL.find(s => s.slug === slug);
  const heroRef = useRef(null);

  useEffect(() => {
    if (!station) return;
    const container = heroRef.current;
    if (!container) return;

    const heroEls = gsap.utils.toArray('.sp-hero__content > *', container);
    gsap.fromTo(heroEls,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, delay: 0.15, ease: 'power2.out', clearProps: 'all' }
    );

    const sections = gsap.utils.toArray('.sp-section', container);
    gsap.fromTo(sections,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, delay: 0.3, ease: 'power2.out', clearProps: 'all' }
    );
  }, [station]);

  if (!station) {
    return (
      <div className="sp-not-found">
        <h1>Emisora no encontrada</h1>
        <Link to="/" className="btn btn--primary">Volver al inicio</Link>
      </div>
    );
  }

  const videoSrc = STATION_VIDEOS[station.videoId];
  const waMessage = encodeURIComponent(`SW- Hola quisiera información para publicidad en Radio en ${station.name}`);
  const waLink = `https://wa.me/525552508990?text=${waMessage}`;

  return (
    <div className="station-page" ref={heroRef} style={{ paddingBottom: '100px' }}>
      {/* ═══ Hero Banner ═══ */}
      <section className="sp-hero" style={{ '--station-accent': station.accentColor }}>
        <div className="sp-hero__bg">
          <div className="sp-hero__gradient" />
          <div className="sp-hero__pattern" />
        </div>
        <div className="sp-hero__content container">
          <Link to="/#cobertura" className="sp-hero__back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Volver a Emisoras
          </Link>
          <div className="sp-hero__logo-wrap">
            <img src={station.logo} alt={station.name} className="sp-hero__logo" />
          </div>
          <h1 className="sp-hero__name">{station.name}</h1>
          <div className="sp-hero__meta">
            <span className="sp-hero__dial">{station.dial}</span>
            <span className="sp-hero__sep">•</span>
            <span className="sp-hero__freq">{station.freq}</span>
            <span className="sp-hero__sep">•</span>
            <span className="sp-hero__city">{station.city}</span>
          </div>
          <span className="sp-hero__genre">{station.genre}</span>
        </div>
      </section>

      {/* ═══ Content Sections ═══ */}
      <div className="sp-sections">
        {/* ── Unified About & Video ── */}
        <section className="sp-section sp-about">
          <div className="container">
            <div className={`sp-about__grid ${!videoSrc ? 'sp-about__grid--single' : ''}`}>
              {/* Left Column: Info & Details */}
              <div className="sp-about__text">
                <span className="tag tag--accent"><span className="tag__dot" /> ACERCA DE</span>
                <h2 className="sp-section__title">Sobre {station.name}</h2>
                <p className="sp-about__desc">{station.description}</p>
                <div className="sp-about__stats">
                  <div className="sp-stat">
                    <span className="sp-stat__value">{station.dial}</span>
                    <span className="sp-stat__label">Frecuencia</span>
                  </div>
                  <div className="sp-stat">
                    <span className="sp-stat__value">{station.audience}</span>
                    <span className="sp-stat__label">Audiencia</span>
                  </div>
                </div>
                <p className="sp-about__schedule" style={{ marginBottom: '2rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {station.schedule}
                </p>
                
                <div className="sp-about__cta-area" style={{ maxWidth: '400px' }}>
                  <Link to="/contacto" className="btn btn--primary sp-cta-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                    Contactar
                  </Link>
                </div>
              </div>

              {/* Right Column: Premium Video Player */}
              {videoSrc && (
                <div className="sp-player__embed-wrapper" style={{ '--station-accent': station.accentColor, width: '100%', margin: '0 auto' }}>
                  <div className="sp-player__embed-header">
                    <div className="sp-player__badge">
                      <span className="sp-player__pulse" />
                      Señal de Video
                    </div>
                    <div className="sp-player__visualizer">
                      <span className="sp-bar"></span>
                      <span className="sp-bar"></span>
                      <span className="sp-bar"></span>
                      <span className="sp-bar"></span>
                    </div>
                  </div>
                  <div className="sp-player__embed" style={{ display: 'block', width: '100%', aspectRatio: '16 / 9', background: '#000' }}>
                    <video
                      src={videoSrc}
                      controls
                      preload="metadata"
                      playsInline
                      className="sp-video__player"
                      style={{ border: 'none', display: 'block', width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section className="sp-section sp-final-cta" style={{ '--station-accent': station.accentColor }}>
          <div className="container">
            <div className="sp-final-cta__inner">
              <h2 className="sp-final-cta__title">
                ¿Quieres anunciarte en<br /><span>{station.name}</span>?
              </h2>
              <p className="sp-final-cta__desc">
                Llega a miles de oyentes cada día. Nuestro equipo comercial te ayudará a crear la campaña publicitaria perfecta y con el mejor alcance.
              </p>
              <div className="sp-final-cta__actions">
                <Link to="/contacto" className="btn btn--primary">
                  Contactar
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Floating Live Radio Player ── */}
      <div className="sp-floating-player" style={{ '--station-accent': station.accentColor }}>
        <div className="sp-floating-player__inner container">
          <div className="sp-floating-player__info">
            <span className="sp-player__pulse" />
            Escuchando en vivo: <strong>{station.name}</strong>
          </div>
          <iframe
            src={`${station.tuneinEmbed}?autoplay=true`}
            title="Radio en vivo"
            className="sp-floating-player__iframe"
            allow="autoplay; encrypted-media; fullscreen"
          />
        </div>
      </div>
    </div>
  );
}
