import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TextReveal.css';

gsap.registerPlugin(ScrollTrigger);

const text = "No somos solo una red de emisoras. Somos el canal directo entre tu marca y millones de mexicanos todos los días. Con más de 52 años dominando el espectro radiofónico, conectamos a través del sonido, la emoción y la inmediatez.";

export default function TextReveal() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const words = gsap.utils.toArray('.reveal-word');
      
      gsap.fromTo(words, 
        { opacity: 0.1 },
        {
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=150%',
            pin: true,
            scrub: true,
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
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
