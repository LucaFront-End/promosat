import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './BrochureModal.css';

export const MEXICAN_STATES = [
  'Aguascalientes',
  'Baja California',
  'Baja California Sur',
  'Campeche',
  'Chiapas',
  'Chihuahua',
  'Ciudad de México',
  'Coahuila',
  'Colima',
  'Durango',
  'Estado de México',
  'Guanajuato',
  'Guerrero',
  'Hidalgo',
  'Jalisco',
  'Michoacán',
  'Morelos',
  'Nayarit',
  'Nuevo León',
  'Oaxaca',
  'Puebla',
  'Querétaro',
  'Quintana Roo',
  'San Luis Potosí',
  'Sinaloa',
  'Sonora',
  'Tabasco',
  'Tamaulipas',
  'Tlaxcala',
  'Veracruz',
  'Yucatán',
  'Zacatecas'
];

export const COMPANY_TYPES = [
  'Agencia de Marketing o Publicidad',
  'Gerente / Director de Marketing',
  'Dueño de Negocio / Empresario',
  'Empresa / Marca',
  'Profesional Independiente'
];

export default function BrochureModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    ciudad: '',
    tipoEmpresa: '',
  });

  useEffect(() => {
    const handleOpen = () => {
      setSubmitted(false);
      setIsOpen(true);
    };

    window.addEventListener('open-brochure-modal', handleOpen);
    
    // Also listen to any click on elements with data-open-brochure
    const handleClick = (e) => {
      const target = e.target.closest('[data-open-brochure]');
      if (target) {
        e.preventDefault();
        handleOpen();
      }
    };
    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('open-brochure-modal', handleOpen);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Trigger brochure download
    const link = document.createElement('a');
    link.href = '/docs/Brochure_Promosat_2026.pdf';
    link.download = 'Brochure_Promosat_2026.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="brochure-modal__overlay" onClick={closeModal}>
          <motion.div
            className="brochure-modal__card glass-panel"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="brochure-modal__close"
              onClick={closeModal}
              aria-label="Cerrar modal"
            >
              ✕
            </button>

            {!submitted ? (
              <>
                <div className="brochure-modal__header">
                  <span className="tag tag--accent">DOCUMENTO OFICIAL</span>
                  <h3 className="heading-md brochure-modal__title">Descargar Brochure</h3>
                  <p className="body-sm brochure-modal__subtitle">
                    Completa la información para acceder al brochure comercial con tarifas y cobertura nacional.
                  </p>
                </div>

                <form className="brochure-modal__form" onSubmit={handleSubmit}>
                  <div className="brochure-modal__field">
                    <label htmlFor="bm-nombre">Nombre completo</label>
                    <input
                      type="text"
                      id="bm-nombre"
                      name="nombre"
                      required
                      placeholder="Ej. María González"
                      value={formData.nombre}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="brochure-modal__grid">
                    <div className="brochure-modal__field">
                      <label htmlFor="bm-telefono">Teléfono</label>
                      <input
                        type="tel"
                        id="bm-telefono"
                        name="telefono"
                        required
                        placeholder="+52 55 1234 5678"
                        value={formData.telefono}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="brochure-modal__field">
                      <label htmlFor="bm-correo">Correo electrónico</label>
                      <input
                        type="email"
                        id="bm-correo"
                        name="correo"
                        required
                        placeholder="ejemplo@empresa.com"
                        value={formData.correo}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="brochure-modal__field">
                    <label htmlFor="bm-ciudad">Ciudad / Estado (México)</label>
                    <select
                      id="bm-ciudad"
                      name="ciudad"
                      required
                      value={formData.ciudad}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Selecciona tu estado</option>
                      {MEXICAN_STATES.map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>

                  <div className="brochure-modal__field">
                    <label htmlFor="bm-tipoEmpresa">Tipo de empresa</label>
                    <select
                      id="bm-tipoEmpresa"
                      name="tipoEmpresa"
                      required
                      value={formData.tipoEmpresa}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Selecciona el tipo de empresa</option>
                      {COMPANY_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <button type="submit" className="btn btn--primary brochure-modal__submit">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Descargar Brochure PDF
                  </button>
                </form>
              </>
            ) : (
              <div className="brochure-modal__success">
                <div className="brochure-modal__success-icon">✓</div>
                <h3 className="heading-md">¡Gracias por tu interés!</h3>
                <p className="body-sm">
                  La descarga del Brochure Comercial de Promosat ha comenzado automáticamente.
                </p>
                <button className="btn btn--secondary" onClick={closeModal} style={{ marginTop: '1.5rem' }}>
                  Cerrar
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function openBrochureModal() {
  window.dispatchEvent(new CustomEvent('open-brochure-modal'));
}
