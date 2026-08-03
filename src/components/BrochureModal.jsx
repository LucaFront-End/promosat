import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { saveBrochureLead } from '../lib/wixClient';
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

export const COUNTRY_LADAS = [
  { code: '+52', country: 'México 🇲🇽' },
  { code: '+1', country: 'EE.UU. / Canadá 🇺🇸' },
  { code: '+54', country: 'Argentina 🇦🇷' },
  { code: '+56', country: 'Chile 🇨🇱' },
  { code: '+57', country: 'Colombia 🇨🇴' },
  { code: '+34', country: 'España 🇪🇸' },
  { code: '+51', country: 'Perú 🇵🇪' },
  { code: '+502', country: 'Guatemala 🇬🇹' },
  { code: '+503', country: 'El Salvador 🇸🇻' },
  { code: '+504', country: 'Honduras 🇭🇳' },
  { code: '+506', country: 'Costa Rica 🇨🇷' },
  { code: '+507', country: 'Panamá 🇵🇦' },
];

const DISALLOWED_EMAIL_DOMAINS = [
  'gmail.com',
  'hotmail.com',
  'outlook.com',
  'yahoo.com',
  'live.com',
  'icloud.com',
  'hotmail.es',
  'outlook.es',
  'yahoo.es',
  'gmx.com',
  'mail.com'
];

export default function BrochureModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  
  const [formData, setFormData] = useState({
    nombre: '',
    lada: '+52',
    telefono: '',
    correo: '',
    ciudad: '',
    tipoEmpresa: '',
  });

  useEffect(() => {
    const handleOpen = () => {
      setSubmitted(false);
      setLoading(false);
      setEmailError('');
      setIsOpen(true);
    };

    window.addEventListener('open-brochure-modal', handleOpen);
    
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

  const validateEmail = (email) => {
    if (!email) {
      setEmailError('');
      return true;
    }

    const lowerEmail = email.toLowerCase().trim();
    const domainPart = lowerEmail.split('@')[1];

    if (domainPart && DISALLOWED_EMAIL_DOMAINS.includes(domainPart)) {
      setEmailError('Por favor ingresa un correo profesional o corporativo (no se permiten dominios de correo personal como @gmail.com, @hotmail.com o @outlook.com).');
      return false;
    }

    setEmailError('');
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'correo') {
      validateEmail(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.correo)) {
      return;
    }

    setLoading(true);

    // Save lead to Wix CMS
    await saveBrochureLead({
      ...formData,
      telefonoFull: `${formData.lada} ${formData.telefono}`
    });

    setLoading(false);
    setSubmitted(true);

    // Trigger brochure PDF download
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

                  {/* Lada + Teléfono */}
                  <div className="brochure-modal__field">
                    <label htmlFor="bm-telefono">Teléfono</label>
                    <div className="brochure-modal__phone-group">
                      <select
                        name="lada"
                        value={formData.lada}
                        onChange={handleChange}
                        className="brochure-modal__lada-select"
                        title="Clave Lada de País"
                      >
                        {COUNTRY_LADAS.map((l) => (
                          <option key={l.code} value={l.code}>
                            {l.code} ({l.country})
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        id="bm-telefono"
                        name="telefono"
                        required
                        placeholder="55 1234 5678"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="brochure-modal__phone-input"
                      />
                    </div>
                  </div>

                  {/* Correo Corporativo / Profesional */}
                  <div className="brochure-modal__field">
                    <label htmlFor="bm-correo">Correo electrónico profesional</label>
                    <input
                      type="email"
                      id="bm-correo"
                      name="correo"
                      required
                      placeholder="ejemplo@tuempresa.com"
                      value={formData.correo}
                      onChange={handleChange}
                      className={emailError ? 'has-error' : ''}
                    />
                    {emailError && (
                      <span className="brochure-modal__error-text">
                        {emailError}
                      </span>
                    )}
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

                  <button
                    type="submit"
                    className="btn btn--primary brochure-modal__submit"
                    disabled={loading || !!emailError}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    {loading ? 'Procesando...' : 'Descargar Brochure PDF'}
                  </button>
                </form>
              </>
            ) : (
              <div className="brochure-modal__success">
                <div className="brochure-modal__success-icon">✓</div>
                <h3 className="heading-md">¡Consulta registrada con éxito!</h3>
                <p className="body-sm">
                  La descarga del Brochure Comercial de Promosat de México ha comenzado automáticamente.
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
