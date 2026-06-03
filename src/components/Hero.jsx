import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../data/content';
import { HERO_VIDEO } from '../data/videos';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const maskRef = useRef(null);
  const playerCaptionRef = useRef(null);
  const bgRef = useRef(null);
  const ctaRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    const vid = videoRef.current;
    if (!vid) return;
    const newMuted = !vid.muted;
    vid.muted = newMuted;
    vid.volume = 1;
    if (!newMuted) vid.play().catch(() => {});
    setIsMuted(newMuted);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            if (ctaRef.current) {
              if (self.progress > 0.78) {
                ctaRef.current.classList.add('is-visible');
              } else {
                ctaRef.current.classList.remove('is-visible');
              }
            }
          },
        },
      });

      tl.to('.hero-cinematic__scroll-hint', { opacity: 0, duration: 0.15, ease: 'power2.in' }, 0);
      tl.fromTo(titleRef.current, { scale: 1 }, { scale: 40, duration: 0.7, ease: 'power2.in' }, 0.05);
      tl.to(maskRef.current, { opacity: 0, duration: 0.25, ease: 'power1.in' }, 0.55);
      tl.fromTo(
        playerCaptionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.2, ease: 'power1.out' },
        0.75
      );
      tl.to(bgRef.current, { scale: 1.1, duration: 0.3, ease: 'none' }, 0.55);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero-cinematic" id="hero">

      {/* ── Layer 1: Video Background ── */}
      <div className="hero-cinematic__bg" ref={bgRef}>
        <video
          ref={videoRef}
          className="hero-cinematic__bg-video"
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>

      {/* ── Layer 2: Text Mask (mix-blend-mode trick) ── */}
      <div ref={maskRef} className="hero-cinematic__mask">
        <h1 ref={titleRef} className="hero-cinematic__title">PROMOSAT</h1>
      </div>

      {/* ── Sound Toggle ── */}
      <button
        className="hero-cinematic__sound-toggle"
        onClick={toggleSound}
        aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
      >
        {isMuted ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
        <span>{isMuted ? 'Sonido' : 'Silenciar'}</span>
      </button>

      {/* ── Layer 3: Scroll Hint ── */}
      <div className="hero-cinematic__scroll-hint">
        <span>Scroll</span>
        <div className="hero-cinematic__scroll-line" />
      </div>

      {/* ── Layer 4: Video Caption ── */}
      <div ref={playerCaptionRef} className="hero-cinematic__player-caption">
        <span className="tag tag--accent"><span className="tag__dot" /> REEL PROMOCIONAL</span>
        <p>Promosat de México — 55 Años de Experiencia</p>
      </div>

      {/* ── Layer 5: Floating Contact CTA (appears over video at progress > 0.78) ── */}
      <div className="hero-cinematic__cta" ref={ctaRef}>
        <div className="hero-cinematic__cta-inner">
          <h3 className="hero-cinematic__cta-hook">¿Listo para llegar a millones?</h3>
          <p className="hero-cinematic__cta-excerpt">
            Conecta tu marca con la mayor red de emisoras de México.
          </p>
          <a
            href="/contacto"
            className="hero-cinematic__cta-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            Contáctanos
          </a>
        </div>
      </div>

    </section>
  );
}
