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
      gsap.fromTo('.canal-service', 
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.canal-services',
            start: 'top 80%',
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out(1.2)'
        }
      );
      
      // Feature Lists / Stats
      gsap.from('.canal-stats .stat-item', {
        scrollTrigger: {
          trigger: '.canal-stats',
          start: 'top 85%'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
      });

      // Gallery entrance
      gsap.fromTo('.canal-gallery__item', 
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.canal-gallery-section',
            start: 'top 80%',
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.2)'
        }
      );

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

  const images = [
    '/images/canal-continental/img1.jpeg',
    '/images/canal-continental/img2.jpeg',
    '/images/canal-continental/img4.jpeg',
    '/images/canal-continental/img5.jpeg',
    '/images/canal-continental/img6.jpeg',
    '/images/canal-continental/img7.jpeg'
  ];

  return (
    <div className="canal-page" ref={pageRef} id="canal-page">
      {/* ── Hero ── */}
      <section className="canal-hero">
        <div className="container">
          <div className="canal-hero__grid">
            <div className="canal-hero__text">
              <div className="tag tag--accent">El Único Escenario Móvil en México</div>
              <h1 className="canal-hero__title">
                Trailer<br /><span className="text-gradient">Concert</span>
              </h1>
              <p className="canal-hero__desc">
                La herramienta ideal para espectáculos masivos. <strong>Nuestra imponente unidad móvil se despliega para convertirse en un escenario completo</strong>, capaz de convocar y concentrar cómodamente a grupos de entre 1,000 a 20,000 personas en cualquier parte del país.
              </p>
              <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                Reservar Fechas
              </a>
            </div>
            <div className="canal-hero__visual">
              <div className="canal-hero__orb" />
              <img src="/images/canal-continental/trailer_hero.png" alt="Trailer Escenario Móvil" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section className="canal-stats" style={{ padding: '0 0 5rem' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem', padding: '3rem', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="stat-item text-center">
              <h3 className="heading-md text-gradient" style={{ marginBottom: '0.5rem' }}>35+</h3>
              <p>Años de Experiencia</p>
            </div>
            <div className="stat-item text-center">
              <h3 className="heading-md text-gradient" style={{ marginBottom: '0.5rem' }}>700+</h3>
              <p>Eventos Realizados</p>
            </div>
            <div className="stat-item text-center">
              <h3 className="heading-md text-gradient" style={{ marginBottom: '0.5rem' }}>680K+</h3>
              <p>Asistentes Totales</p>
            </div>
            <div className="stat-item text-center">
              <h3 className="heading-md text-gradient" style={{ marginBottom: '0.5rem' }}>70+</h3>
              <p>Marcas de Confianza</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Expertise Services ── */}
      <section className="canal-services" style={{ paddingTop: '4rem' }}>
        <div className="container">
          <div className="section-head text-center">
            <h2 className="heading-lg">El Aliado <span className="text-gradient">Perfecto</span></h2>
            <p className="body-md">Equipamiento técnico de clase mundial integrado para cualquier tipo de evento masivo.</p>
          </div>
          
          <div className="canal-services__grid">
            <div className="canal-service">
              <div className="canal-service__icon">📢</div>
              <h3>Eventos Políticos y Prensa</h3>
              <p>Versátil y fácil de transportar. Añade distinción a presentaciones y mítines con un escenario móvil de alta gama que facilita la logística de cualquier rueda de prensa o campaña.</p>
            </div>
            <div className="canal-service">
              <div className="canal-service__icon">🎸</div>
              <h3>Conciertos y Festivales</h3>
              <p>Eleva los conciertos con calidad excepcional. Integra computadora para control Martin, 49 cañones PAR 64, cámaras de humo F10 y un diseño técnico que garantiza un show impecable.</p>
            </div>
            <div className="canal-service">
              <div className="canal-service__icon">🔊</div>
              <h3>Audio Profesional de 32 Canales</h3>
              <p>Mezclamos en vivo a través de consola TAMSCH de 32 canales, amplificadores CREST de 1200 watts, procesadores YAMAHA y un muro de proyectores DAS que cubre a miles de espectadores.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Galería del Escenario ── */}
      <section className="canal-gallery-section" style={{ padding: '0 0 8rem' }}>
        <div className="container">
          <div className="section-head text-center" style={{ marginBottom: '4rem' }}>
            <h2 className="heading-md">El Escenario en <span className="text-gradient">Acción</span></h2>
          </div>
          <div className="canal-gallery" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '1.5rem' 
          }}>
            {images.map((img, i) => (
              <div key={i} className="canal-gallery__item" style={{ 
                borderRadius: '16px', 
                overflow: 'hidden', 
                aspectRatio: '4/3',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <img src={img} alt={`Trailer Concert Evento ${i+1}`} style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover'
                }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Parallax Divider ── */}
      <section className="canal-parallax">
        <img src="/images/canal-continental/img1.jpeg" alt="Trailer en evento" className="canal-parallax__img" />
        <div className="canal-parallax__overlay">
          <h2>El evento que imaginas,<br/>en el <span>Lugar que desees</span></h2>
        </div>
      </section>
    </div>
  );
}
