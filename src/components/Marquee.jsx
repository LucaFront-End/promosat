import { marqueeItems } from '../data/content';
import './Marquee.css';

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <section className="marquee-section">
      <div className="marquee">
        <div className="marquee__track">
          {items.map((item, i) => (
            <span key={i} className="marquee__item">
              <span className="marquee__text">{item}</span>
              <span className="marquee__sep">✦</span>
            </span>
          ))}
        </div>
      </div>
      <div className="marquee marquee--reverse">
        <div className="marquee__track">
          {items.map((item, i) => (
            <span key={i} className="marquee__item">
              <span className="marquee__text">{item}</span>
              <span className="marquee__sep">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
