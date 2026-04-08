import { partnerLogos } from '../data/content';
import './Partners.css';

export default function Partners() {
  const row1 = [...partnerLogos.slice(0, 11), ...partnerLogos.slice(0, 11)];
  const row2 = [...partnerLogos.slice(11), ...partnerLogos.slice(11)];

  return (
    <section className="partners section" id="partners">
      <div className="container">
        <div className="partners__header">
          <h2 className="heading-lg">Aliados</h2>
          <p className="body-lg">Marcas que confían en el poder de la radio.</p>
        </div>
      </div>

      <div className="partners__marquee">
        <div className="partners__track">
          {row1.map((logo, i) => (
            <div key={i} className="partners__logo-wrap">
              <img src={logo} alt="Partner" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
      <div className="partners__marquee partners__marquee--reverse">
        <div className="partners__track">
          {row2.map((logo, i) => (
            <div key={i} className="partners__logo-wrap">
              <img src={logo} alt="Partner" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
