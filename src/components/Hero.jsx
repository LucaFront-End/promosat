import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../data/content';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const HERO_VIDEO_URL = '/videos/hero_reel.mp4';

export default function Hero() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const maskRef = useRef(null);
  const playerCaptionRef = useRef(null);
  const bgRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            // Show floating CTA once the video is fully revealed (progress > 0.78)
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

      // Phase 1 (0→0.15): Fade out scroll hint
      tl.to('.hero-cinematic__scroll-hint', { opacity: 0, duration: 0.15, ease: 'power2.in' }, 0);

      // Phase 2 (0.05→0.75): Scale title massively
      tl.fromTo(titleRef.current, { scale: 1 }, { scale: 40, duration: 0.7, ease: 'power2.in' }, 0.05);

      // Phase 3 (0.55→0.8): Fade out mask → reveals full video
      tl.to(maskRef.current, { opacity: 0, duration: 0.25, ease: 'power1.in' }, 0.55);

      // Phase 4 (0.75→0.95): Fade in video caption
      tl.fromTo(
        playerCaptionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.2, ease: 'power1.out' },
        0.75
      );

      // Phase 5: Slight bg zoom for depth
      tl.to(bgRef.current, { scale: 1.1, duration: 0.3, ease: 'none' }, 0.55);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero-cinematic" id="hero">

      {/* ── Layer 1: Video Background ── */}
      <div className="hero-cinematic__bg" ref={bgRef}>
        <video
          className="hero-cinematic__bg-video"
          src={HERO_VIDEO_URL}
          autoPlay muted loop playsInline preload="auto"
        />
      </div>

      {/* ── Layer 2: Text Mask (mix-blend-mode trick) ── */}
      <div ref={maskRef} className="hero-cinematic__mask">
        <h1 ref={titleRef} className="hero-cinematic__title">PROMOSAT</h1>
      </div>

      {/* ── Layer 3: Scroll Hint ── */}
      <div className="hero-cinematic__scroll-hint">
        <span>Scroll</span>
        <div className="hero-cinematic__scroll-line" />
      </div>

      {/* ── Layer 4: Video Caption ── */}
      <div ref={playerCaptionRef} className="hero-cinematic__player-caption">
        <span className="tag tag--accent"><span className="tag__dot" /> REEL PROMOCIONAL</span>
        <p>Promosat de México — Grupo Promomedios</p>
      </div>

      {/* ── Layer 5: Floating Contact CTA (appears over video at progress > 0.78) ── */}
      <div className="hero-cinematic__cta" ref={ctaRef}>
        <div className="hero-cinematic__cta-inner">
          <h3 className="hero-cinematic__cta-hook">¿Listo para llegar a millones?</h3>
          <p className="hero-cinematic__cta-excerpt">
            Conecta tu marca con la mayor red de emisoras de México.
          </p>
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cinematic__cta-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Contáctanos
          </a>
        </div>
      </div>

    </section>
  );
}
