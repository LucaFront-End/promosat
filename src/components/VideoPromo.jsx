import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './VideoPromo.css';

gsap.registerPlugin(ScrollTrigger);

export default function VideoPromo() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Scale up the video container on scroll
      gsap.fromTo(videoRef.current,
        { scale: 0.85, borderRadius: '2rem' },
        {
          scale: 1,
          borderRadius: '0rem',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: true,
          }
        }
      );

      // Fade in title
      gsap.from('.video-promo__title', {
        y: 60, opacity: 0, duration: 1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="video-promo" ref={sectionRef} id="video">
      <div className="container">
        <div className="video-promo__header">
          <span className="tag tag--accent"><span className="tag__dot" /> CONÓCENOS</span>
          <h2 className="heading-xl video-promo__title" style={{ marginTop: '1rem' }}>
            Reel Promocional
          </h2>
          <p className="body-lg" style={{ color: 'var(--color-text-secondary)', marginTop: '1rem', maxWidth: 600 }}>
            Descubre quiénes somos y por qué más de 70 emisoras nos respaldan a nivel nacional.
          </p>
        </div>
      </div>

      <div className="video-promo__frame" ref={videoRef}>
        {!isPlaying ? (
          <div className="video-promo__thumbnail" onClick={() => setIsPlaying(true)}>
            <img
              src="https://img.youtube.com/vi/6YiAX_o74_U/maxresdefault.jpg"
              alt="Reel Promocional Promosat"
              className="video-promo__thumb-img"
            />
            <div className="video-promo__play-btn">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <div className="video-promo__thumb-overlay" />
          </div>
        ) : (
          <iframe
            src="https://www.youtube.com/embed/6YiAX_o74_U?autoplay=1&rel=0"
            title="Reel Promocional Promosat"
            className="video-promo__iframe"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        )}
      </div>
    </section>
  );
}
