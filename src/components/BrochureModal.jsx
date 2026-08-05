import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { saveBrochureLead } from '../lib/wixClient';
import { sendFormSubmitEmail } from '../lib/sendEmail';
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
  { code: '+52', iso: 'mx', name: 'México' },
  { code: '+1', iso: 'us', name: 'EE.UU. / Canadá' },
  { code: '+54', iso: 'ar', name: 'Argentina' },
  { code: '+56', iso: 'cl', name: 'Chile' },
  { code: '+57', iso: 'co', name: 'Colombia' },
  { code: '+34', iso: 'es', name: 'España' },
  { code: '+51', iso: 'pe', name: 'Perú' },
  { code: '+502', iso: 'gt', name: 'Guatemala' },
  { code: '+503', iso: 'sv', name: 'El Salvador' },
  { code: '+504', iso: 'hn', name: 'Honduras' },
  { code: '+506', iso: 'cr', name: 'Costa Rica' },
  { code: '+507', iso: 'pa', name: 'Panamá' },
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

function LadaCustomSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const selected = COUNTRY_LADAS.find(c => c.code === value) || COUNTRY_LADAS[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="lada-custom" ref={containerRef}>
      <button
        type="button"
        className="lada-custom__trigger"
        onClick={() => setOpen(!open)}
        title="Seleccionar Clave Lada"
      >
        <img
          src={`https://flagcdn.com/w40/${selected.iso}.png`}
          alt={selected.name}
          className="lada-custom__flag-img"
        />
        <span className="lada-custom__code-text">{selected.code}</span>
        <span className={`lada-custom__arrow ${open ? 'is-open' : ''}`}>▾</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="lada-custom__dropdown"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
          >
            {COUNTRY_LADAS.map((c) => (
              <button
                key={c.code}
                type="button"
                className={`lada-custom__option ${c.code === value ? 'is-selected' : ''}`}
                onClick={() => {
                  onChange(c.code);
                  setOpen(false);
                }}
              >
                <img
                  src={`https://flagcdn.com/w40/${c.iso}.png`}
                  alt={c.name}
                  className="lada-custom__flag-img"
                />
                <span className="lada-custom__option-code">{c.code}</span>
                <span className="lada-custom__option-name">{c.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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

    // Save lead to Wix CMS collection Descargarboletin
    await saveBrochureLead({
      ...formData,
      telefonoFull: `${formData.lada} ${formData.telefono}`
    });

    // Send notification email via FormSubmit.co to ventas@promosat.com & test1@dilodigitalmx.com
    await sendFormSubmitEmail({
      subject: `Nueva Descarga de Brochure - ${formData.nombre}`,
      formData: {
        'Nombre Completo': formData.nombre,
        'Teléfono': `${formData.lada} ${formData.telefono}`,
        'Correo Profesional': formData.correo,
        'Estado': formData.ciudad,
        'Tipo de Empresa': formData.tipoEmpresa
      }
    });

    setLoading(false);
    setSubmitted(true);

    // Trigger brochure PDF download
    const link = document.createElement('a');
    link.href = '/docs/PROMOSAT_MEDIA_KIT_WEB.pdf';
    link.download = 'PROMOSAT_MEDIA_KIT_WEB.pdf';
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
                      <LadaCustomSelect
                        value={formData.lada}
                        onChange={(newLada) => setFormData(prev => ({ ...prev, lada: newLada }))}
                      />
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
