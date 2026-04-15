import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { promediaContent, siteConfig } from '../data/content';
import './PromediaPage.css';

gsap.registerPlugin(ScrollTrigger);

export default function PromediaPage() {
  const pageRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  const counterRefs = useRef([]);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      /* ── Hero staggered entrance ── */
      const heroEls = gsap.utils.toArray('.pm-hero__content > *', page);
      gsap.fromTo(heroEls,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.12, delay: 0.2, ease: 'power3.out', clearProps: 'all' }
      );

      /* ── Bento cards stagger in ── */
      const bentos = gsap.utils.toArray('.pm-bento', page);
      gsap.fromTo(bentos,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.08, delay: 0.4, ease: 'power3.out', clearProps: 'all' }
      );

      /* ── Sections fade-in ── */
      const sections = gsap.utils.toArray('.pm-section', page);
      gsap.fromTo(sections,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, delay: 0.5, ease: 'power3.out', clearProps: 'all' }
      );

      /* ── Horizontal Pinned Podcast scroll ── */
      const track = scrollWrapperRef.current?.querySelector('.pm-podcasts-track');
      if (track) {
        const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);
        gsap.to(track, {
          x: getScrollAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: scrollWrapperRef.current,
            start: 'top top',
            end: () => `+=${getScrollAmount() * -1}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true
          }
        });
      }
    }, page);

    return () => ctx.revert();
  }, []);


  const heroStats = [
    { value: '52+', label: 'Años experiencia' },
    { value: '70+', label: 'Emisoras' },
    { value: '4', label: 'Podcasts activos' },
    { value: '1M+', label: 'Alcance digital' },
  ];

  return (
    <div className="promedia-page" ref={pageRef}>

      {/* ═══ Cinematic Hero ═══ */}
      <section className="pm-hero">
        <div className="pm-hero__bg">
          <div className="pm-hero__orb pm-hero__orb--1" />
          <div className="pm-hero__orb pm-hero__orb--2" />
          <div className="pm-hero__orb pm-hero__orb--3" />
        </div>
        <div className="pm-hero__content">
          <span className="tag tag--accent"><span className="tag__dot" /> PROMEDIA</span>
          <h1 className="pm-hero__title">{promediaContent.tagline}</h1>
          <h2 className="pm-hero__brand">{promediaContent.title}</h2>
          <p className="pm-hero__sub">{promediaContent.subtitle}</p>

          {/* Glassmorphism Stats Strip */}
          <div className="pm-hero__stats">
            {heroStats.map((s, i) => (
              <div key={i} className="pm-hero-stat">
                <span className="pm-hero-stat__val">{s.value}</span>
                <span className="pm-hero-stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="pm-hero__scroll">
          <div className="pm-hero__scroll-line" />
          <span>Explora</span>
        </div>
      </section>

      {/* ═══ Bento Grid (Services) with Images ═══ */}
      <section className="pm-section pm-services">
        <div className="container">
          <span className="tag tag--accent"><span className="tag__dot" /> SERVICIOS</span>
          <h2 className="pm-section__title">Todo lo que<br /><span className="pm-gradient-text">hacemos por ti</span></h2>
          <div className="pm-bento-grid">
            {/* Large featured card with image */}
            <div className="pm-bento pm-bento--hero">
              <img src="/images/podcast-studio.png" alt="Estudio Podcast" className="pm-bento__img" loading="lazy" />
              <div className="pm-bento__overlay" />
              <div className="pm-bento__content">
                <span className="pm-bento__label">Principal</span>
                <h3>{promediaContent.services[0]}</h3>
                <p>Creamos la estrategia perfecta para conectar tu marca con la audiencia ideal.</p>
              </div>
            </div>

            {/* Text cards */}
            <div className="pm-bento pm-bento--text">
              <span className="pm-bento__num">02</span>
              <h3>{promediaContent.services[1]}</h3>
            </div>
            <div className="pm-bento pm-bento--text">
              <span className="pm-bento__num">03</span>
              <h3>{promediaContent.services[2]}</h3>
            </div>

            {/* Waveform image card */}
            <div className="pm-bento pm-bento--visual">
              <img src="/images/audio-waveform.png" alt="Audio Waveform" className="pm-bento__img" loading="lazy" />
              <div className="pm-bento__overlay pm-bento__overlay--light" />
            </div>

            {/* Services 4-6 */}
            <div className="pm-bento pm-bento--accent">
              <span className="pm-bento__num">04</span>
              <h3>{promediaContent.services[3]}</h3>
            </div>
            <div className="pm-bento pm-bento--text">
              <span className="pm-bento__num">05</span>
              <h3>{promediaContent.services[4]}</h3>
            </div>

            {/* Content creation image */}
            <div className="pm-bento pm-bento--visual pm-bento--wide">
              <img src="/images/content-creation.png" alt="Content Creation" className="pm-bento__img" loading="lazy" />
              <div className="pm-bento__overlay" />
              <div className="pm-bento__content">
                <h3>Contenidos de Valor</h3>
                <p>Podcast, Series, Conciertos, Cápsulas, Documentales y Streaming</p>
              </div>
            </div>

            {/* Services 6-9 */}
            <div className="pm-bento pm-bento--text">
              <span className="pm-bento__num">06</span>
              <h3>{promediaContent.services[5]}</h3>
            </div>

            {/* Video Production */}
            <div className="pm-bento pm-bento--visual">
              <img src="/images/video-production.png" alt="Video Production" className="pm-bento__img" loading="lazy" />
              <div className="pm-bento__overlay pm-bento__overlay--light" />
            </div>

            <div className="pm-bento pm-bento--accent">
              <span className="pm-bento__num">07</span>
              <h3>{promediaContent.services[6]}</h3>
            </div>
            <div className="pm-bento pm-bento--text">
              <span className="pm-bento__num">08</span>
              <h3>{promediaContent.services[7]}</h3>
            </div>
            <div className="pm-bento pm-bento--text">
              <span className="pm-bento__num">09</span>
              <h3>{promediaContent.services[8]}</h3>
            </div>

            {/* Full-width CTA bento */}
            <div className="pm-bento pm-bento--cta">
              <div>
                <h3>¿Listo para crear algo increíble?</h3>
                <p>{promediaContent.services[9]}</p>
              </div>
              <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                Hablemos →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Why Podcasting — Split Visual ═══ */}
      <section className="pm-section pm-why">
        <div className="container">
          <span className="tag tag--accent"><span className="tag__dot" /> ¿POR QUÉ PODCAST?</span>
          <h2 className="pm-section__title">{promediaContent.whyPodcast.title}</h2>
          <div className="pm-why__layout">
            <div className="pm-why__reasons">
              {promediaContent.whyPodcast.reasons.map((r, i) => (
                <div key={i} className="pm-reason">
                  <div className="pm-reason__counter">
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <div className="pm-reason__line" />
                  </div>
                  <div className="pm-reason__body">
                    <h4>{r}</h4>
                  </div>
                </div>
              ))}
            </div>
            <div className="pm-why__visual">
              <div className="pm-mic-glow" />
              <svg className="pm-mic-icon" width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="0.5">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="22"/>
                <line x1="8" y1="22" x2="16" y2="22"/>
              </svg>
              {/* Animated rings */}
              <div className="pm-ring pm-ring--1" />
              <div className="pm-ring pm-ring--2" />
              <div className="pm-ring pm-ring--3" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Podcast Types & Production — Glass Cards ═══ */}
      <section className="pm-section">
        <div className="container">
          <span className="tag tag--accent"><span className="tag__dot" /> FORMATOS</span>
          <h2 className="pm-section__title">Tipos de <span className="pm-gradient-text">podcast</span></h2>
          <div className="pm-card-grid" style={{ marginBottom: '8rem' }}>
            {promediaContent.podcastTypes.map((t, i) => (
              <div key={i} className="pm-glass-card">
                <div className="pm-glass-card__icon">{['🎙', '🎭', '💡', '📚'][i]}</div>
                <h3>{t.type}</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>

          <span className="tag tag--accent"><span className="tag__dot" /> PRODUCCIÓN</span>
          <h2 className="pm-section__title">Servicios de <span className="pm-gradient-text">producción</span></h2>
          <div className="pm-prod-grid">
            {promediaContent.production.map((p, i) => (
              <div key={i} className="pm-prod-card">
                <div className="pm-prod-card__num">{String(i + 1).padStart(2, '0')}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="pm-prod-card__glow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Horizontal Pinned Podcasts Showcase ═══ */}
      <section className="pm-podcasts-wrapper" ref={scrollWrapperRef}>
        <div className="pm-podcasts-track">
          {/* Intro panel */}
          <div className="pm-podcasts-intro">
            <span className="tag tag--accent"><span className="tag__dot" /> SHOWCASE</span>
            <h2 className="pm-section__title" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 1 }}>
              Nuestros<br/>Podcasts
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '400px', marginTop: '1.5rem' }}>
              Desliza para explorar el universo de voces que confían en nosotros.
            </p>
            <div className="pm-scroll-hint">
              <span>scroll</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </div>

          {/* Podcast cards */}
          {promediaContent.podcasts.map((p, i) => (
            <div key={i} className="pm-podcast-feature">
              <div className="pm-podcast-feature__accent" />
              <div>
                <div className="pm-podcast-feature__head">
                  <span className="pm-podcast-feature__tag">{p.category}</span>
                  <span className="pm-podcast-feature__idx">#{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="pm-podcast-feature__title">{p.name}</h3>
                <p className="pm-podcast-feature__hosts">🎙 {p.hosts}</p>
                <p className="pm-podcast-feature__desc">{p.description}</p>
                <div className="pm-podcast-feature__target">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                  {p.target}
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
          <div style={{ width: '10vw', flexShrink: 0 }} />
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="pm-cta">
        <div className="pm-cta__bg">
          <div className="pm-hero__orb pm-hero__orb--1" />
          <div className="pm-hero__orb pm-hero__orb--2" />
        </div>
        <div className="container">
          <div className="pm-cta__inner">
            <span className="tag tag--accent"><span className="tag__dot" /> EMPEZAR</span>
            <h2 className="pm-cta__title">
              Tu mensaje,<br /><span>nuestra voz</span>
            </h2>
            <p className="pm-cta__desc">
              Conecta con tu audiencia a través del poder del podcasting y la producción de audio profesional.
            </p>
            <div className="pm-cta__actions">
              <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--primary" style={{ padding: '1.2rem 3rem', fontSize: '1.05rem' }}>
                Empezar Proyecto
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href={`mailto:${siteConfig.email}`} className="btn btn--outline" style={{ padding: '1.2rem 3rem', fontSize: '1.05rem' }}>
                Enviar Email
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
