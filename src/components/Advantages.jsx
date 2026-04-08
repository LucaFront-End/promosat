import { useScrollReveal } from '../hooks/useScrollReveal';
import { advantages } from '../data/content';
import './Advantages.css';

const icons = {
  '📡': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/>
      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.4"/>
      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.4"/>
      <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  '🎯': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  '🌎': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20"/>
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
    </svg>
  ),
  '👥': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87"/>
      <path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
  '💰': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/>
      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
    </svg>
  ),
  '🎵': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13"/>
      <circle cx="6" cy="18" r="3"/>
      <circle cx="18" cy="16" r="3"/>
    </svg>
  ),
};

export default function Advantages() {
  const ref = useScrollReveal();

  return (
    <section className="advantages section glow-top" id="advantages" ref={ref}>
      <div className="container">
        <div className="advantages__header reveal">
          <span className="tag tag--accent"><span className="tag__dot" /> Ventajas</span>
          <h2 className="heading-lg">Ventajas de la<br/>Publicidad en Radio</h2>
          <p className="body-lg advantages__sub">La radio sigue siendo uno de los medios más efectivos para conectar marcas con audiencias masivas.</p>
        </div>

        <div className="advantages__grid">
          {advantages.map((adv, i) => (
            <div key={i} className={`advantages__card glass-panel reveal delay-${i + 1}`}>
              <div className="advantages__icon">{icons[adv.icon] || adv.icon}</div>
              <h3 className="heading-sm">{adv.title}</h3>
              <p className="body-sm">{adv.description}</p>
              <div className="advantages__card-line" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
