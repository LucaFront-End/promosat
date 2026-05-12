import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../data/content';
import PalccoCarousel from '../components/PalccoCarousel';
import './PalccoPage.css';

gsap.registerPlugin(ScrollTrigger);

export default function PalccoPage() {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Hero entrance
      gsap.from('.palcco-hero__content > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });

      // Bento Grid Entrance
      gsap.from('.palcco-bento__item', {
        scrollTrigger: {
          trigger: '.palcco-bento',
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.2)'
      });

      // Stats counter
      const stats = gsap.utils.toArray('.palcco-stat__val');
      stats.forEach(stat => {
        const targetNumber = parseInt(stat.getAttribute('data-value'), 10);
        if (targetNumber) {
          gsap.from(stat, {
            scrollTrigger: {
              trigger: stat,
              start: 'top 90%',
            },
            textContent: 0,
            duration: 2.5,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate: function() {
              const current = Math.ceil(this.targets()[0].textContent);
              this.targets()[0].innerHTML = current.toLocaleString() + (stat.getAttribute('data-suffix') || '');
            }
          });
        }
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="palcco-page" ref={pageRef} id="palcco-page">
      {/* ── Hero ── */}
      <section className="palcco-hero">
        <div className="palcco-hero__bg">
          <img src="/images/palcco-hero.jpg" alt="PALCCO Arquitectura" />
          <div className="palcco-hero__overlay"></div>
        </div>
        <div className="container">
          <div className="palcco-hero__content">
            <div className="tag tag--accent">El Palacio de la Cultura y los Congresos</div>
            <h1 className="palcco-hero__title">
              Sede Multi <span className="text-gradient">Dinámica</span>
            </h1>
            <p className="palcco-hero__desc">
              Uno de los complejos más emblemáticos de la Zona Metropolitana de Guadalajara. El entorno tecnológicamente avanzado perfecto con teatros, ágoras y centros de negocios que complementan la oferta de tu próximo gran evento.
            </p>
            <div className="palcco-hero__actions">
              <a href="/contacto" className="btn btn--primary">
                Contactar
              </a>
              <a href="#espacios" className="btn btn--outline">
                Ver Espacios
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section className="palcco-stats-section">
        <div className="container">
          <div className="palcco-stats-wrapper">
            <div className="palcco-stat">
              <div className="palcco-stat__val" data-value="55" data-suffix="">55</div>
              <div className="palcco-stat__label">Años de Experiencia en Aliados</div>
            </div>
            <div className="palcco-stat__sep"></div>
            <div className="palcco-stat">
              <div className="palcco-stat__val" data-value="6200" data-suffix="+">6200+</div>
              <div className="palcco-stat__label">Eventos Realizados</div>
            </div>
            <div className="palcco-stat__sep"></div>
            <div className="palcco-stat">
              <div className="palcco-stat__val" data-value="15" data-suffix=" Millones">15 Millones</div>
              <div className="palcco-stat__label">De Visitantes Globales</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Espacios Bento ── */}
      <section id="espacios" className="palcco-bento-section">
        <div className="container">
          <div className="section-head text-center">
            <h2 className="heading-lg">Espacios <span className="text-gradient">Majestuosos</span></h2>
            <p className="body-md">De 15 hasta 5,000 asistentes simultáneos bajo infraestructura mundial.</p>
          </div>
          
          <div className="palcco-bento">
            <div className="palcco-bento__item palcco-bento__item--large">
              <PalccoCarousel
                images={[
                  '/images/palcco/teatro-jose/teatro-moncayo_galeria-27.webp',
                  '/images/palcco/teatro-jose/teatro-moncayo_galeria-26.webp',
                  '/images/palcco/teatro-jose/teatro-moncayo_galeria-22.webp',
                  '/images/palcco/teatro-jose/teatro-moncayo_galeria-17.webp',
                  '/images/palcco/teatro-jose/teatro-moncayo_galeria-32.webp',
                  '/images/palcco/teatro-jose/teatro-moncayo_galeria-6.webp',
                  '/images/palcco/teatro-jose/teatro-moncayo_galeria-4.webp',
                  '/images/palcco/teatro-jose/teatro-moncayo_galeria-30.webp',
                  '/images/palcco/teatro-jose/teatro-moncayo_galeria-35.webp',
                  '/images/palcco/teatro-jose/teatro-moncayo_galeria-7.webp',
                  '/images/palcco/teatro-jose/sala-consuelo-velazquez_banner-1.webp',
                  '/images/palcco/teatro-jose/sala-consuelo-velazquez_banner-3.webp',
                ]}
                alt="Teatro José Pablo Moncayo"
              />
              <div className="palcco-bento__content">
                <h3>Teatro José Pablo Moncayo</h3>
                <p>1,963 espectadores. Escenario de 35x20 metros con piso Harlequin y acústica inmersiva incomparable. La joya de la corona para eventos premium.</p>
              </div>
            </div>
            <div className="palcco-bento__item">
              <PalccoCarousel
                images={[
                  '/images/palcco/sala-consuelo/sala-consuelo-velazquez_galeria-1-2.webp',
                  '/images/palcco/sala-consuelo/sala-consuelo-velazquez_galeria-17.webp',
                  '/images/palcco/sala-consuelo/sala-consuelo-velazquez_galeria-21.webp',
                  '/images/palcco/sala-consuelo/sala-consuelo-velazquez_galeria-22.webp',
                  '/images/palcco/sala-consuelo/sala-consuelo-velazquez_galeria-24.webp',
                  '/images/palcco/sala-consuelo/sala-consuelo-velazquez_galeria-25.webp',
                  '/images/palcco/sala-consuelo/sala-consuelo-velazquez_galeria-26.webp',
                  '/images/palcco/sala-consuelo/sala-consuelo-velazquez_galeria-28.webp',
                  '/images/palcco/sala-consuelo/sala-consuelo-velazquez_galeria-6.webp',
                  '/images/palcco/sala-consuelo/sala-consuelo-velazquez_galeria-7.webp',
                ]}
                alt="Sala Consuelo Velázquez"
              />
              <div className="palcco-bento__content">
                <h3>Sala Consuelo Velázquez</h3>
                <p>399 butacas íntimas. Intimidad escénica ideal para conferencias teatrales de aforo mediano, obras y recitales exclusivos.</p>
              </div>
            </div>
            <div className="palcco-bento__item">
              <PalccoCarousel
                images={[
                  '/images/palcco/sala-exposiciones/exposiciones_MET-1-2.jpg',
                  '/images/palcco/sala-exposiciones/exposiciones_MET-2.jpg',
                  '/images/palcco/sala-exposiciones/exposiciones_MET-3.jpg',
                  '/images/palcco/sala-exposiciones/exposiciones_MET-6.jpg',
                  '/images/palcco/sala-exposiciones/exposiciones_MET-7.jpg',
                  '/images/palcco/sala-exposiciones/exposiciones_MET-10.webp',
                  '/images/palcco/sala-exposiciones/exposiciones_MET-11.webp',
                  '/images/palcco/sala-exposiciones/exposiciones_MET-12.webp',
                  '/images/palcco/sala-exposiciones/exposiciones_MET-13.webp',
                  '/images/palcco/sala-exposiciones/exposiciones_MET-2-2.jpg',
                ]}
                alt="Salas de Exposiciones"
              />
              <div className="palcco-bento__content">
                <h3>Salas de Exposiciones</h3>
                <p>899 M2 y 12 salas interconectadas. Ideal para galerías comerciales y grandes muestras empresariales con facilidad de diseño.</p>
              </div>
            </div>
            <div className="palcco-bento__item palcco-bento__item--large" style={{ gridColumn: '1 / -1' }}>
              <PalccoCarousel
                images={[
                  '/images/palcco/foro-bailmex/foro-agora_banner-3.webp',
                  '/images/palcco/foro-bailmex/foro-agora_galeria-2.webp',
                  '/images/palcco/foro-bailmex/foro-agora_galeria-11.webp',
                  '/images/palcco/foro-bailmex/foro-agora_galeria-13.webp',
                  '/images/palcco/foro-bailmex/foro-agora_galeria-14.webp',
                  '/images/palcco/foro-bailmex/foro-agora_galeria-18.webp',
                  '/images/palcco/foro-bailmex/foro-agora_galeria-23.webp',
                  '/images/palcco/foro-bailmex/foro-agora_galeria-2-2.webp',
                  '/images/palcco/foro-bailmex/foro-agora_galeria-3-2.webp',
                  '/images/palcco/foro-bailmex/foro-agora_galeria-8.webp',
                ]}
                alt="Foro BAILMEX y Ágora"
              />
              <div className="palcco-bento__content" style={{ background: 'linear-gradient(90deg, rgba(13,16,23,0.95), transparent)' }}>
                <h3>Foro BAILMEX y Ágora</h3>
                <p>5,000 M2 de Velaria acústica e impermeable para experiencias multitudinarias y eventos deportivos imponentes al aire libre sin riesgos ambientales.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* ── Footer CTA ── */}
      <section className="palcco-cta">
        <div className="container">
          <div className="palcco-cta__box">
            <h2>Hagamos de tu evento una <span className="text-gradient">experiencia inolvidable</span></h2>
            <p>Contamos con 9 Foros, Salones y Salas para recibir convenciones de gran capacidad. Contacta hoy mismo a nuestro equipo comercial de Palcco.</p>
            <a href="/contacto" className="btn btn--primary btn--large">
              Contactar
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
