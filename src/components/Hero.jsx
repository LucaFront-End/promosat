import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const maskRef = useRef(null);
  const playerCaptionRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 1,
        }
      });

      // Phase 1 (0→0.15): Fade out the scroll hint
      tl.to('.hero-cinematic__scroll-hint', {
        opacity: 0,
        duration: 0.15,
        ease: 'power2.in'
      }, 0);

      // Phase 2 (0.05→0.75): Scale title MASSIVELY (1x → 40x)
      tl.fromTo(titleRef.current,
        { scale: 1 },
        { scale: 40, duration: 0.7, ease: 'power2.in' },
        0.05
      );

      // Phase 3 (0.55→0.8): Fade out the black mask overlay → reveals full video
      tl.to(maskRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power1.in'
      }, 0.55);

      // Phase 4 (0.75→0.95): Fade in the video caption
      tl.fromTo(playerCaptionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.2, ease: 'power1.out' },
        0.75
      );

      // Phase 5: Slight bg zoom for depth
      tl.to(bgRef.current, {
        scale: 1.1,
        duration: 0.3,
        ease: 'none'
      }, 0.55);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero-cinematic" id="hero">

      {/* ── Layer 1: YouTube Video Background (playing from the start) ── */}
      <div className="hero-cinematic__bg" ref={bgRef}>
        <iframe
          src="https://www.youtube.com/embed/6YiAX_o74_U?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playlist=6YiAX_o74_U&playsinline=1"
          title="Background Video"
          className="hero-cinematic__bg-video"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>

      {/* ── Layer 2: Text Mask (mix-blend-mode: multiply) ── */}
      <div ref={maskRef} className="hero-cinematic__mask">
        <h1 ref={titleRef} className="hero-cinematic__title">
          PROMOSAT
        </h1>
      </div>

      {/* ── Layer 3: Scroll Hint ── */}
      <div className="hero-cinematic__scroll-hint">
        <span>Scroll</span>
        <div className="hero-cinematic__scroll-line" />
      </div>

      {/* ── Layer 4: Video Caption (appears after zoom completes) ── */}
      <div ref={playerCaptionRef} className="hero-cinematic__player-caption">
        <span className="tag tag--accent"><span className="tag__dot" /> REEL PROMOCIONAL</span>
        <p>Promosat de México — Grupo Promomedios</p>
      </div>

    </section>
  );
}
