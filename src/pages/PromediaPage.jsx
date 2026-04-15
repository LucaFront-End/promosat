import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { promediaContent, siteConfig } from '../data/content';
import './PromediaPage.css';

gsap.registerPlugin(ScrollTrigger);

function animateIn(selector, container, trigger, vars = {}) {
  const els = gsap.utils.toArray(selector, container);
  if (!els.length) return;
  // Set visible immediately as fallback, then animate from
  gsap.set(els, { autoAlpha: 0, y: vars.y ?? 30 });
  gsap.to(els, {
    autoAlpha: 1, y: 0,
    duration: vars.duration ?? 0.6,
    stagger: vars.stagger ?? 0.08,
    ease: 'power2.out',
    clearProps: 'all',
    scrollTrigger: {
      trigger,
      start: 'top 85%',
      once: true,
    },
  });
}

export default function PromediaPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    // Hero content entrance (no scroll trigger — plays on mount)
    const heroEls = gsap.utils.toArray('.pm-hero__content > *', page);
    gsap.set(heroEls, { autoAlpha: 0, y: 30 });
    gsap.to(heroEls, {
      autoAlpha: 1, y: 0,
      duration: 0.7, stagger: 0.12, delay: 0.2,
      ease: 'power2.out',
      clearProps: 'all',
    });

    // Scroll-driven sections
    animateIn('.pm-service-item', page, page.querySelector('.pm-services'), { stagger: 0.04 });
    animateIn('.pm-reason',       page, page.querySelector('.pm-why'),      { x: -20, stagger: 0.08 });
    animateIn('.pm-podcast-card', page, page.querySelector('.pm-podcasts'), { y: 40, stagger: 0.1 });
    animateIn('.pm-prod-item',    page, page.querySelector('.pm-production'),{ stagger: 0.07 });
    animateIn('.pm-type-card',    page, page.querySelector('.pm-types'),    { stagger: 0.07 });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger && page.contains(st.trigger)) st.kill();
      });
    };
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
          <h2 className="pm-section__title">¿Qué Hacemos?</h2>
          <div className="pm-services__grid">
            {promediaContent.services.map((service, i) => (
              <div key={i} className="pm-service-item">
                <span className="pm-service-item__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="pm-service-item__text">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Why Podcasting ═══ */}
      <section className="pm-section pm-why">
        <div className="container">
          <div className="pm-why__layout">
            <div className="pm-why__left">
              <span className="tag tag--accent"><span className="tag__dot" /> PODCAST</span>
              <h2 className="pm-section__title">{promediaContent.whyPodcast.title}</h2>
            </div>
            <div className="pm-why__right">
              {promediaContent.whyPodcast.reasons.map((reason, i) => (
                <div key={i} className="pm-reason">
                  <div className="pm-reason__icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Podcast Types ═══ */}
      <section className="pm-section pm-types">
        <div className="container">
          <h2 className="pm-section__title" style={{ textAlign: 'center' }}>¿Qué tipo de Podcast?</h2>
          <div className="pm-types__grid">
            {promediaContent.podcastTypes.map((item, i) => (
              <div key={i} className="pm-type-card">
                <h3>{item.type}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Production ═══ */}
      <section className="pm-section pm-production">
        <div className="container">
          <span className="tag tag--accent"><span className="tag__dot" /> PRODUCCIÓN</span>
          <h2 className="pm-section__title">Diseñamos lo que tienes en Mente</h2>
          <div className="pm-prod__grid">
            {promediaContent.production.map((item, i) => (
              <div key={i} className="pm-prod-item">
                <div className="pm-prod-item__icon">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div>
                  <h3 className="pm-prod-item__title">{item.title}</h3>
                  <p className="pm-prod-item__desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Our Podcasts ═══ */}
      <section className="pm-section pm-podcasts">
        <div className="container">
          <span className="tag tag--accent"><span className="tag__dot" /> NUESTROS PODCASTS</span>
          <h2 className="pm-section__title">Podcasts en Producción</h2>
          <div className="pm-podcasts__grid">
            {promediaContent.podcasts.map((podcast, i) => (
              <div key={i} className="pm-podcast-card">
                <div className="pm-podcast-card__header">
                  <span className="pm-podcast-card__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="pm-podcast-card__category">{podcast.category}</span>
                </div>
                <h3 className="pm-podcast-card__name">{podcast.name}</h3>
                <p className="pm-podcast-card__hosts">con {podcast.hosts}</p>
                <p className="pm-podcast-card__desc">{podcast.description}</p>
                <div className="pm-podcast-card__stats">
                  {Object.entries(podcast.stats).map(([key, val]) => (
                    <div key={key} className="pm-podcast-stat">
                      <span className="pm-podcast-stat__val">{val}</span>
                      <span className="pm-podcast-stat__key">{key}</span>
                    </div>
                  ))}
                </div>
                <p className="pm-podcast-card__target">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                  Target: {podcast.target}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="pm-section pm-cta">
        <div className="container">
          <div className="pm-cta__inner">
            <h2 className="pm-cta__title">¿Quieres crear tu<br /><span>Podcast</span>?</h2>
            <p className="pm-cta__desc">Desde la idea hasta la distribución, nuestro equipo te acompaña en cada paso.</p>
            <div className="pm-cta__actions">
              <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                Contáctanos
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href={`mailto:${siteConfig.email}`} className="btn btn--outline">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>
                Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
