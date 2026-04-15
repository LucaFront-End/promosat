import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { promediaContent, siteConfig } from '../data/content';
import './PromediaPage.css';

gsap.registerPlugin(ScrollTrigger);

export default function PromediaPage() {
  const pageRef = useRef(null);
  const scrollWrapperRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    // Fast entrance animations (avoiding scroll triggers for base elements to prevent the "blue screen")
    const heroEls = gsap.utils.toArray('.pm-hero__content > *', page);
    gsap.fromTo(heroEls,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.2, ease: 'power3.out', clearProps: 'all' }
    );

    // Horizontal Scroll for Podcasts
    const track = scrollWrapperRef.current?.querySelector('.pm-podcasts-track');
    if (track) {
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);
      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: scrollWrapperRef.current,
          start: "top top",
          end: () => `+=${getScrollAmount() * -1}`,
          pin: true,
          animation: tween,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="promedia-page" ref={pageRef}>

      {/* ═══ Hero ═══ */}
      <section className="pm-hero">
        <div className="pm-hero__bg">
          <div className="pm-hero__orb pm-hero__orb--1" />
          <div className="pm-hero__orb pm-hero__orb--2" />
        </div>
        <div className="pm-hero__content">
          <span className="tag tag--accent"><span className="tag__dot" /> PROMEDIA</span>
          <h1 className="pm-hero__title">{promediaContent.tagline}</h1>
          <h2 className="pm-hero__brand">{promediaContent.title}</h2>
          <p className="pm-hero__sub">{promediaContent.subtitle}</p>
          <p className="pm-hero__desc">{promediaContent.description}</p>
        </div>
      </section>

      {/* ═══ Services (Bento Grid) ═══ */}
      <section className="pm-section pm-services">
        <div className="container">
          <span className="tag tag--accent"><span className="tag__dot" /> SERVICIOS</span>
          <h2 className="pm-section__title">Lo que hacemos</h2>
          <div className="pm-services__grid">
            {promediaContent.services.map((s, i) => (
              <div key={i} className="pm-service-bento">
                <span className="pm-service-bento__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="pm-service-bento__text">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Why Podcasting (Parallax Layout) ═══ */}
      <section className="pm-section pm-why">
        <div className="container">
          <span className="tag tag--accent"><span className="tag__dot" /> ¿POR QUÉ PODCAST?</span>
          <h2 className="pm-section__title">{promediaContent.whyPodcast.title}</h2>
          <div className="pm-why__layout">
            <div className="pm-why__reasons">
              {promediaContent.whyPodcast.reasons.map((r, i) => (
                <div key={i} className="pm-reason">
                  <span className="pm-reason__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="pm-reason__text">{r}</span>
                </div>
              ))}
            </div>
            <div className="pm-why__visual">
              {/* Abstract Visual representation */}
              <div style={{ position: 'absolute', width: '200px', height: '200px', background: 'var(--color-accent)', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.3 }} />
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="0.5">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="22"/>
                <line x1="8" y1="22" x2="16" y2="22"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Podcast Types & Production (Glass Cards) ═══ */}
      <section className="pm-section">
        <div className="container">
          <span className="tag tag--accent"><span className="tag__dot" /> FORMATOS</span>
          <h2 className="pm-section__title">Tipos de podcast</h2>
          <div className="pm-card-grid" style={{ marginBottom: '6rem' }}>
            {promediaContent.podcastTypes.map((t, i) => (
              <div key={i} className="pm-glass-card">
                <h3>{t.type}</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>

          <span className="tag tag--accent"><span className="tag__dot" /> PRODUCCIÓN</span>
          <h2 className="pm-section__title">Servicios de producción</h2>
          <div className="pm-card-grid">
            {promediaContent.production.map((p, i) => (
              <div key={i} className="pm-glass-card">
                <span style={{ position: 'absolute', top: '1rem', right: '1.5rem', opacity: 0.2, fontSize: '2rem', fontWeight: 900 }}>{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Horizontal Pinned Podcasts Showcase ═══ */}
      <section className="pm-podcasts-wrapper" ref={scrollWrapperRef}>
        <div className="pm-podcasts-track">
          <div style={{ paddingRight: '10vw' }}>
            <span className="tag tag--accent"><span className="tag__dot" /> SHOWCASE</span>
            <h2 className="pm-section__title" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 1, whiteSpace: 'nowrap' }}>
              Nuestros<br/>Podcasts
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '400px' }}>
              Desliza para explorar el universo de voces que confían en nosotros.
            </p>
          </div>

          {promediaContent.podcasts.map((p, i) => (
            <div key={i} className="pm-podcast-feature">
              <div>
                <div className="pm-podcast-feature__head">
                  <span className="pm-podcast-feature__tag">{p.category}</span>
                  <span style={{ opacity: 0.1, fontSize: '3rem', fontWeight: 900 }}>#{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="pm-podcast-feature__title">{p.name}</h3>
                <p className="pm-podcast-feature__hosts">🎙 {p.hosts}</p>
                <p className="pm-podcast-feature__desc">{p.description}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                  Target: {p.target}
                </div>
              </div>
              <div className="pm-podcast-feature__stats">
                {Object.entries(p.stats).map(([key, val]) => (
                  <div key={key} className="pm-podcast-stat">
                    <span className="pm-podcast-stat__val">{val}</span>
                    <span className="pm-podcast-stat__key">{key}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div style={{ paddingLeft: '5vw' }} />
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
              <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--primary" style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
                Empezar Proyecto
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href={`mailto:${siteConfig.email}`} className="btn btn--outline" style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
                Enviar Email
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
