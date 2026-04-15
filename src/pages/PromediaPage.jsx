import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { promediaContent, siteConfig } from '../data/content';
import './PromediaPage.css';

export default function PromediaPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const heroEls = gsap.utils.toArray('.pm-hero__content > *', page);
    gsap.fromTo(heroEls,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, delay: 0.15, ease: 'power2.out', clearProps: 'all' }
    );

    const sections = gsap.utils.toArray('.pm-section', page);
    gsap.fromTo(sections,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, delay: 0.3, ease: 'power2.out', clearProps: 'all' }
    );
  }, []);

  return (
    <div className="promedia-page" ref={pageRef}>

      {/* ═══ Hero ═══ */}
      <section className="pm-hero">
        <div className="pm-hero__bg">
          <div className="pm-hero__wave" />
          <div className="pm-hero__orb pm-hero__orb--1" />
          <div className="pm-hero__orb pm-hero__orb--2" />
        </div>
        <div className="pm-hero__content container">
          <span className="tag tag--accent"><span className="tag__dot" /> PROMEDIA</span>
          <h1 className="pm-hero__title">{promediaContent.tagline}</h1>
          <h2 className="pm-hero__brand">{promediaContent.title}</h2>
          <p className="pm-hero__sub">{promediaContent.subtitle}</p>
          <p className="pm-hero__desc">{promediaContent.description}</p>
        </div>
      </section>

      {/* ═══ Services ═══ */}
      <section className="pm-section pm-services">
        <div className="container">
          <span className="tag tag--accent"><span className="tag__dot" /> SERVICIOS</span>
          <h2 className="pm-section__title">Lo que hacemos</h2>
          <div className="pm-services__grid">
            {promediaContent.services.map((s, i) => (
              <div key={i} className="pm-service-item">
                <span className="pm-service-item__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="pm-service-item__text">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Why Podcasting ═══ */}
      <section className="pm-section pm-why">
        <div className="container">
          <span className="tag tag--accent"><span className="tag__dot" /> ¿POR QUÉ PODCAST?</span>
          <h2 className="pm-section__title">{promediaContent.whyPodcast.title}</h2>
          <div className="pm-why__layout">
            <div className="pm-why__reasons">
              {promediaContent.whyPodcast.reasons.map((r, i) => (
                <div key={i} className="pm-reason">
                  <div className="pm-reason__icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  {r}
                </div>
              ))}
            </div>
            <div className="pm-why__visual">
              <div className="pm-podcast-wave">
                {Array.from({ length: 20 }).map((_, i) => (
                  <span key={i} className="pm-podcast-wave__bar" style={{ animationDelay: `${i * 0.08}s`, height: `${20 + Math.random() * 60}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Podcast Types ═══ */}
      <section className="pm-section pm-types">
        <div className="container">
          <span className="tag tag--accent"><span className="tag__dot" /> FORMATOS</span>
          <h2 className="pm-section__title">Tipos de podcast</h2>
          <div className="pm-types__grid">
            {promediaContent.podcastTypes.map((t, i) => (
              <div key={i} className="pm-type-card">
                <h3>{t.type}</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Production ═══ */}
      <section className="pm-section pm-production">
        <div className="container">
          <span className="tag tag--accent"><span className="tag__dot" /> PRODUCCIÓN</span>
          <h2 className="pm-section__title">Servicios de producción</h2>
          <div className="pm-prod__grid">
            {promediaContent.production.map((p, i) => (
              <div key={i} className="pm-prod-item">
                <div className="pm-prod-item__icon"><span>{String(i + 1).padStart(2, '0')}</span></div>
                <div>
                  <div className="pm-prod-item__title">{p.title}</div>
                  <div className="pm-prod-item__desc">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Podcasts ═══ */}
      <section className="pm-section pm-podcasts">
        <div className="container">
          <span className="tag tag--accent"><span className="tag__dot" /> PODCASTS</span>
          <h2 className="pm-section__title">Nuestros podcasts</h2>
          <div className="pm-podcasts__grid">
            {promediaContent.podcasts.map((p, i) => (
              <div key={i} className="pm-podcast-card">
                <div className="pm-podcast-card__header">
                  <span className="pm-podcast-card__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="pm-podcast-card__category">{p.category}</span>
                </div>
                <h3 className="pm-podcast-card__name">{p.name}</h3>
                <p className="pm-podcast-card__hosts">{p.hosts}</p>
                <p className="pm-podcast-card__desc">{p.description}</p>
                <div className="pm-podcast-card__stats">
                  {Object.entries(p.stats).map(([key, val]) => (
                    <div key={key} className="pm-podcast-stat">
                      <span className="pm-podcast-stat__val">{val}</span>
                      <span className="pm-podcast-stat__key">{key}</span>
                    </div>
                  ))}
                </div>
                <div className="pm-podcast-card__target">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                  {p.target}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="pm-cta">
        <div className="container">
          <div className="pm-cta__inner">
            <h2 className="pm-cta__title">
              Tu mensaje,<br /><span>nuestra voz</span>
            </h2>
            <p className="pm-cta__desc">
              Conecta con tu audiencia a través del poder del podcasting y la producción de audio profesional.
            </p>
            <div className="pm-cta__actions">
              <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                Empezar Proyecto
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href={`mailto:${siteConfig.email}`} className="btn btn--outline">
                Enviar Email
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
