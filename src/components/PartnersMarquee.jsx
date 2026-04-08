import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { partnerLogos } from '../data/content';
import './PartnersMarquee.css';

gsap.registerPlugin(ScrollTrigger);

export default function PartnersMarquee() {
  const sectionRef = useRef(null);
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);

  const row1 = partnerLogos.slice(0, Math.ceil(partnerLogos.length / 2));
  const row2 = partnerLogos.slice(Math.ceil(partnerLogos.length / 2));

  // Double for seamless loop
  const row1Double = [...row1, ...row1];
  const row2Double = [...row2, ...row2];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Row 1 → moves left
      gsap.to(track1Ref.current, {
        xPercent: -50,
        ease: 'none',
        duration: 35,
        repeat: -1,
      });

      // Row 2 → moves right
      gsap.fromTo(track2Ref.current,
        { xPercent: -50 },
        { xPercent: 0, ease: 'none', duration: 40, repeat: -1 }
      );

      // Header entrance
      gsap.from('.partners-header', {
        y: 30, opacity: 0, duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="partners-section" id="partners" ref={sectionRef}>
      <div className="partners-header">
        <span className="tag tag--accent"><span className="tag__dot" /> CONFIANZA</span>
        <h2 className="partners-title">Marcas que Confían</h2>
      </div>

      <div className="partners-marquee">
        {/* Fade edges */}
        <div className="partners-marquee__fade partners-marquee__fade--left" />
        <div className="partners-marquee__fade partners-marquee__fade--right" />

        {/* Row 1 */}
        <div className="partners-track" ref={track1Ref}>
          {row1Double.map((logo, i) => (
            <div key={i} className="partners-logo">
              <img src={logo} alt="Partner" loading="lazy" />
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="partners-track" ref={track2Ref}>
          {row2Double.map((logo, i) => (
            <div key={i} className="partners-logo">
              <img src={logo} alt="Partner" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
