import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../data/content';
import './CanalContinentalPage.css';

gsap.registerPlugin(ScrollTrigger);

export default function CanalContinentalPage() {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Hero entrance
      gsap.from('.canal-hero__title', {
        y: 60, opacity: 0, duration: 1, ease: 'power4.out', delay: 0.1
      });
      gsap.from('.canal-hero__desc', {
        y: 30, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.3
      });

      // Services float in
      gsap.from('.canal-service', {
        scrollTrigger: {
          trigger: '.canal-services',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.2)'
      });

      // Parallax image
      gsap.to('.canal-parallax__img', {
        scrollTrigger: {
          trigger: '.canal-parallax',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        yPercent: 20,
        scale: 1.1
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="canal-page" ref={pageRef} id="canal-page">
      {/* ── Hero ── */}
      <section className="canal-hero">
        <div className="container">
          <div className="canal-hero__grid">
            <div className="canal-hero__text">
              <div className="tag tag--accent">Studio & Producción</div>
              <h1 className="canal-hero__title">
                Canal<br /><span className="text-gradient">Continental</span>
              </h1>
              <p className="canal-hero__desc">
                Creamos todo el soporte operativo, producción y talento que ayuda a satisfacer el gusto radiofónico y activaciones en locación a nivel local y nacional.
              </p>
              <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                Contactar Producción
              </a>
            </div>
            <div className="canal-hero__visual">
              <div className="canal-hero__orb" />
              <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1000" alt="Estudio de Grabación" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Expertise Services ── */}
      <section className="canal-services">
        <div className="container">
          <div className="section-head text-center">
            <h2 className="heading-lg">Nuestro <span className="text-gradient">Core</span></h2>
            <p className="body-md">Detrás de cada transmisión exitosa hay tecnología, talento y metodología impecable.</p>
          </div>
          
          <div className="canal-services__grid">
            <div className="canal-service">
              <div className="canal-service__icon">🎙️</div>
              <h3>Talento y Locución</h3>
              <p>Desarrollo y gestión de voces profesionales y conductores líderes de opinión que conectan con la audiencia.</p>
            </div>
            <div className="canal-service">
              <div className="canal-service__icon">🎛️</div>
              <h3>Soporte Operativo</h3>
              <p>Infraestructura técnica de última generación para garantizar transmisiones ininterrumpidas y de máxima fidelidad 24/7.</p>
            </div>
            <div className="canal-service">
              <div className="canal-service__icon">🎪</div>
              <h3>Activaciones BTL</h3>
              <p>Unidades móviles, dinámicas en locación y stands interactivos para llevar tu marca directamente al público.</p>
            </div>
            <div className="canal-service">
              <div className="canal-service__icon">📻</div>
              <h3>Producción de Audio</h3>
              <p>Diseño sonoro, masterización y creación de spots comerciales que destacan dentro del saturado espectro radiofónico.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Parallax Divider ── */}
      <section className="canal-parallax">
        <img src="https://images.unsplash.com/photo-1516280440503-a2941faeb8c4?auto=format&fit=crop&q=80&w=2000" alt="Consola de Sonido" className="canal-parallax__img" />
        <div className="canal-parallax__overlay">
          <h2>El estándar más alto <br/>en <span>Producción Radiofónica</span></h2>
        </div>
      </section>
    </div>
  );
}
