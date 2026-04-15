import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TextReveal.css';

gsap.registerPlugin(ScrollTrigger);

const text = "No somos solo una red de emisoras. Somos el canal directo entre tu marca y millones de mexicanos todos los días. Con más de 52 años dominando el espectro radiofónico, conectamos a través del sonido, la emoción y la inmediatez.";

export default function TextReveal() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const words = gsap.utils.toArray('.reveal-word', container);

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=150%',
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        words.forEach((word, i) => {
          const wordProgress = (self.progress - (i / words.length) * 0.8) / 0.2;
          word.style.opacity = Math.max(0.08, Math.min(1, wordProgress * 5));
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section className="text-reveal-section" ref={containerRef}>
      <div className="container">
        <p className="text-reveal-paragraph">
          {text.split(' ').map((word, i) => (
            <span key={i} className="reveal-word">
              {word}{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
