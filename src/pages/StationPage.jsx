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
    gsap.set(heroEls, { autoAlpha: 0, y: 30 });
    gsap.to(heroEls, {
      autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1, delay: 0.2,
      ease: 'power2.out', clearProps: 'all',
    });

    const sections = gsap.utils.toArray('.sp-section', container);
    gsap.set(sections, { autoAlpha: 0, y: 40 });
    gsap.to(sections, {
      autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.12, delay: 0.4,
      ease: 'power2.out', clearProps: 'all',
    });
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
  const waMessage = encodeURIComponent(`Hola, me interesa cotizar publicidad en ${station.name}`);
  const waLink = `https://wa.me/525552508990?text=${waMessage}`;

  return (
    <div className="station-page" ref={heroRef}>
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
        {/* ── About ── */}
        <section className="sp-section sp-about">
          <div className="container">
            <div className="sp-about__grid">
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
                <p className="sp-about__schedule">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {station.schedule}
                </p>
              </div>
              <div className="sp-about__cta-area">
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn--primary sp-cta-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Cotizar Espacio Publicitario
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Video Section (if available) ── */}
        {videoSrc && (
          <section className="sp-section sp-video">
            <div className="container">
              <span className="tag tag--accent"><span className="tag__dot" /> VIDEO</span>
              <h2 className="sp-section__title">Conoce {station.name}</h2>
              <div className="sp-video__frame">
                <video
                  src={videoSrc}
                  controls
                  preload="metadata"
                  playsInline
                  className="sp-video__player"
                  poster=""
                />
              </div>
            </div>
          </section>
        )}

        {/* ── Live Radio Player ── */}
        <section className="sp-section sp-player">
          <div className="container">
            <div className="sp-player__layout">
              <div className="sp-player__info">
                <span className="tag tag--accent"><span className="tag__dot" /> EN VIVO</span>
                <h2 className="sp-section__title">Escucha {station.name}</h2>
                <p className="sp-player__desc">
                  Sintoniza {station.name} en vivo desde {station.city}. {station.dial} — {station.genre}.
                </p>
                <a href={station.tuneinUrl} target="_blank" rel="noopener noreferrer" className="sp-player__tunein-link">
                  Abrir en TuneIn
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                </a>
              </div>
              <div className="sp-player__embed">
                <iframe
                  src={station.tuneinEmbed}
                  title={`${station.name} en vivo`}
                  className="sp-player__iframe"
                  allow="autoplay"
                  loading="lazy"
                />
              </div>
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
                Llega a miles de oyentes cada día. Nuestro equipo te ayudará a crear la campaña perfecta.
              </p>
              <div className="sp-final-cta__actions">
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                  Cotizar Ahora
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <a href={`tel:${siteConfig.phone}`} className="btn btn--outline">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  Llamar
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
