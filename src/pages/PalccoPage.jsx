import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../data/content';
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
        gsap.from(stat, {
          scrollTrigger: {
            trigger: stat,
            start: 'top 90%',
          },
          textContent: 0,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          stagger: 0.2
        });
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="palcco-page" ref={pageRef} id="palcco-page">
      {/* ── Hero ── */}
      <section className="palcco-hero">
        <div className="palcco-hero__bg">
          <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2000" alt="Auditorio" />
          <div className="palcco-hero__overlay"></div>
        </div>
        <div className="container">
          <div className="palcco-hero__content">
            <div className="tag tag--accent">Sede Oficial</div>
            <h1 className="palcco-hero__title">
              Palacio de la Cultura<br />
              <span className="text-gradient">y los Congresos</span>
            </h1>
            <p className="palcco-hero__desc">
              Uno de los complejos más emblemáticos de la Zona Metropolitana de Guadalajara. El lugar perfecto, majestuoso y tecnológicamente avanzado para tu próximo gran evento.
            </p>
            <div className="palcco-hero__actions">
              <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                Cotizar Evento
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
              <div className="palcco-stat__val">3</div>
              <div className="palcco-stat__label">Teatros de Clase Mundial</div>
            </div>
            <div className="palcco-stat__sep"></div>
            <div className="palcco-stat">
              <div className="palcco-stat__val">5000</div>
              <div className="palcco-stat__label">Capacidad de Asistentes</div>
            </div>
            <div className="palcco-stat__sep"></div>
            <div className="palcco-stat">
              <div className="palcco-stat__val">35</div>
              <div className="palcco-stat__label">Salones Flexibles</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Espacios Bento ── */}
      <section id="espacios" className="palcco-bento-section">
        <div className="container">
          <div className="section-head text-center">
            <h2 className="heading-lg">Espacios <span className="text-gradient">Majestuosos</span></h2>
            <p className="body-md">Adaptables para cualquier tipo de congreso, convención o concierto.</p>
          </div>
          
          <div className="palcco-bento">
            <div className="palcco-bento__item palcco-bento__item--large">
              <img src="https://images.unsplash.com/photo-1507676184212-d0330a151b14?auto=format&fit=crop&q=80&w=1200" alt="Teatro Principal" className="palcco-bento__img" />
              <div className="palcco-bento__content">
                <h3>Teatro Principal</h3>
                <p>Acústica impecable y capacidad masiva para los shows más exigentes.</p>
              </div>
            </div>
            <div className="palcco-bento__item">
              <img src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800" alt="Salones" className="palcco-bento__img" />
              <div className="palcco-bento__content">
                <h3>Salas de Convenciones</h3>
                <p>Módulos ajustables con tecnología audiovisual.</p>
              </div>
            </div>
            <div className="palcco-bento__item">
              <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800" alt="Exposiciones" className="palcco-bento__img" />
              <div className="palcco-bento__content">
                <h3>Área de Exposiciones</h3>
                <p>Miles de metros cuadrados para stands comerciales.</p>
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
            <p>Contamos con el soporte de Grupo Promomedios para potenciar la difusión de tu conferencia o congreso.</p>
            <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--large">
              Solicitar Fechas y Disponibilidad
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
