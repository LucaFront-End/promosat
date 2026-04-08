import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { advantages } from '../data/content';
import './AdvantagesPremium.css';

gsap.registerPlugin(ScrollTrigger);

const ICONS_SVG = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4.93 4.93a10 10 0 0114.14 0M7.76 7.76a6 6 0 018.48 0"/><circle cx="12" cy="12" r="2"/></svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z"/></svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  <svg key="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
];

export default function AdvantagesPremium() {
  const sectionRef = useRef(null);
  const wheelRef = useRef(null);
  const itemsRef = useRef([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const count = advantages.length;
  const angleStep = 360 / count;

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header entrance
      gsap.from('.adv-orbit__header', {
        y: 50, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      });

      // Scroll-driven orbit rotation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          const newIdx = Math.min(Math.floor(progress * count), count - 1);
          setActiveIdx(newIdx);

          // Smooth wheel rotation
          const targetAngle = -(progress * 360);
          if (wheelRef.current) {
            gsap.to(wheelRef.current, {
              rotation: targetAngle,
              duration: 0.3,
              ease: 'power1.out',
              overwrite: true,
            });
          }

          // Update each item: counter-rotate, scale & opacity based on proximity
          itemsRef.current.forEach((el, i) => {
            if (!el) return;
            // Counter-rotate so items stay upright
            const itemBaseAngle = angleStep * i;
            const counterAngle = -(targetAngle + itemBaseAngle);
            const inner = el.querySelector('.adv-orbit__item-inner');
            if (inner) {
              gsap.to(inner, {
                rotation: counterAngle,
                duration: 0.3,
                ease: 'power1.out',
                overwrite: true,
              });
            }
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [count, angleStep]);

  return (
    <section className="adv-orbit" id="ventajas" ref={sectionRef}>
      {/* Gradient transition from dark to light */}


      <div className="adv-orbit__layout">
        {/* ── Left: Active Detail ── */}
        <div className="adv-orbit__detail">
          <div className="adv-orbit__header">
            <span className="tag tag--accent"><span className="tag__dot" /> ¿POR QUÉ RADIO?</span>
            <h2 className="adv-orbit__main-title">Nuestras<br/>Ventajas</h2>
          </div>

          <div className="adv-orbit__active-card" key={activeIdx}>
            <div className="adv-orbit__active-icon">{ICONS_SVG[activeIdx]}</div>
            <div className="adv-orbit__active-text">
              <span className="adv-orbit__active-number">0{activeIdx + 1} / 0{count}</span>
              <h3 className="adv-orbit__active-title">{advantages[activeIdx].title}</h3>
              <p className="adv-orbit__active-desc">{advantages[activeIdx].description}</p>
            </div>
          </div>

          <div className="adv-orbit__progress">
            {advantages.map((_, i) => (
              <div key={i} className={`adv-orbit__bar ${i === activeIdx ? 'is-active' : i < activeIdx ? 'is-past' : ''}`} />
            ))}
          </div>
        </div>

        {/* ── Right: Orbit Wheel ── */}
        <div className="adv-orbit__wheel-wrap">
          {/* Decorative rings */}
          <div className="adv-orbit__ring adv-orbit__ring--outer" />
          <div className="adv-orbit__ring adv-orbit__ring--mid" />
          <div className="adv-orbit__ring adv-orbit__ring--inner" />

          {/* Decorative dashes on outer ring */}
          {Array.from({ length: 36 }).map((_, i) => (
            <div
              key={i}
              className="adv-orbit__tick"
              style={{ transform: `rotate(${i * 10}deg)` }}
            />
          ))}

          {/* Center frequency wave */}
          <div className="adv-orbit__center">
            <div className="adv-orbit__wave">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="adv-orbit__wave-bar"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            <span className="adv-orbit__center-label">FM</span>
          </div>

          {/* Rotating items on the orbit */}
          <div className="adv-orbit__wheel" ref={wheelRef}>
            {advantages.map((adv, i) => {
              const angle = angleStep * i;
              const isActive = i === activeIdx;
              return (
                <div
                  key={i}
                  className={`adv-orbit__item ${isActive ? 'is-active' : ''}`}
                  ref={el => itemsRef.current[i] = el}
                  style={{ '--base-angle': `${angle}deg` }}
                >
                  <div className="adv-orbit__item-inner">
                    <div className="adv-orbit__item-icon">{ICONS_SVG[i]}</div>
                    <span className="adv-orbit__item-label">{adv.title}</span>
                  </div>
                  {/* Connector line to center */}
                  <div className="adv-orbit__connector" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
