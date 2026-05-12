import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { siteConfig, offices } from '../data/content';
import RadioWaveCanvas from '../components/RadioWaveCanvas';
import './ContactPage.css';

export default function ContactPage() {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', message: '' });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Smooth Entrance animation for Header
      const heroEls = gsap.utils.toArray('.cp-hero__content > *', container);
      gsap.fromTo(heroEls,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.2, ease: 'power3.out', clearProps: 'all' }
      );

      // Staggered floating cards entrance
      const cards = gsap.utils.toArray('.cp-glass-panel', container);
      gsap.fromTo(cards,
        { opacity: 0, y: 50, rotateX: 5 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.15, delay: 0.4, ease: 'power3.out', clearProps: 'all' }
      );
    }, container);

    return () => ctx.revert();
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hola, mi nombre es ${formData.name}.\nEmpresa: ${formData.company || 'N/A'}\nEmail: ${formData.email}\nTeléfono: ${formData.phone || 'N/A'}\n\n${formData.message}`
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent('Contacto desde sitio web - ' + formData.name)}&body=${msg}`;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="contact-page" ref={containerRef}>
      
      {/* ═══ Immersive Background ═══ */}
      <div className="cp-bg-layer">
        <RadioWaveCanvas />
        <div className="cp-ambient-glow cp-ambient-glow--1" />
        <div className="cp-ambient-glow cp-ambient-glow--2" />
        <div className="cp-ambient-glow cp-ambient-glow--3" />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* ═══ Header ═══ */}
        <section className="cp-hero">
          <div className="cp-hero__content">
            <span className="tag tag--accent"><span className="tag__dot" /> INICIA TU PROYECTO</span>
            <h1 className="cp-hero__title">
              Hablemos de tu<br /><span>próxima campaña</span>
            </h1>
            <p className="cp-hero__sub">
              Nuestro equipo está listo para ayudarte a conectar tu marca con millones de oyentes.
            </p>
          </div>
        </section>

        {/* ═══ Interactive Content ═══ */}
        <section className="cp-content">
          <div className="cp-layout">
            
            {/* Form Panel */}
            <div className="cp-glass-panel cp-form-container">
              <div className="cp-glass-edges"></div>
              <h2 className="cp-panel-title">Envíanos un mensaje</h2>
              <form className="cp-form" onSubmit={handleSubmit}>
                <div className="cp-form__row">
                  <div className="cp-input-group">
                    <input type="text" name="name" id="cname" value={formData.name} onChange={handleChange} required placeholder=" " />
                    <label htmlFor="cname">Nombre completo *</label>
                    <div className="cp-input-border"></div>
                  </div>
                  <div className="cp-input-group">
                    <input type="email" name="email" id="cemail" value={formData.email} onChange={handleChange} required placeholder=" " />
                    <label htmlFor="cemail">Correo electrónico *</label>
                    <div className="cp-input-border"></div>
                  </div>
                </div>
                <div className="cp-form__row">
                  <div className="cp-input-group">
                    <input type="tel" name="phone" id="cphone" value={formData.phone} onChange={handleChange} placeholder=" " />
                    <label htmlFor="cphone">Teléfono (opcional)</label>
                    <div className="cp-input-border"></div>
                  </div>
                  <div className="cp-input-group">
                    <input type="text" name="company" id="ccompany" value={formData.company} onChange={handleChange} placeholder=" " />
                    <label htmlFor="ccompany">Compañía (opcional)</label>
                    <div className="cp-input-border"></div>
                  </div>
                </div>
                <div className="cp-input-group">
                  <textarea name="message" id="cmessage" value={formData.message} onChange={handleChange} required rows="5" placeholder=" "></textarea>
                  <label htmlFor="cmessage">¿Cómo podemos ayudarte? *</label>
                  <div className="cp-input-border"></div>
                </div>
                <button type="submit" className="btn btn--primary cp-submit-btn">
                  <span>Iniciar Conversación</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                </button>
              </form>
            </div>

            {/* Sidebar Cards */}
            <div className="cp-sidebar">
              
              {/* Direct Connect */}
              <div className="cp-glass-panel cp-side-card">
                <div className="cp-glass-edges"></div>
                <h3 className="cp-card-title">Contacto Directo</h3>
                <div className="cp-links">
                  <a href={`tel:${siteConfig.phone}`} className="cp-link">
                    <div className="cp-link-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg></div>
                    {siteConfig.phone}
                  </a>
                  <a href={`mailto:${siteConfig.email}`} className="cp-link">
                    <div className="cp-link-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg></div>
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              {/* Offices */}
              {offices.map((office, i) => (
                <div key={i} className="cp-glass-panel cp-side-card cp-office-card">
                  <div className="cp-glass-edges"></div>
                  <div className="cp-office-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <h3 className="cp-card-title">{office.name}</h3>
                  <p className="cp-office-address">{office.address}</p>
                  <a href={office.mapLink} target="_blank" rel="noopener noreferrer" className="cp-map-btn">
                    <span className="cp-map-btn__text">Ver en Google Maps</span>
                    <span className="cp-map-btn__arrow">→</span>
                  </a>
                </div>
              ))}
              
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
