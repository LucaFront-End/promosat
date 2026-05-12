import { useState, useEffect, useCallback } from 'react';
import './PalccoCarousel.css';

export default function PalccoCarousel({ images, alt, interval = 4000 }) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const len = images.length;

  const next = useCallback(() => setCurrent(p => (p + 1) % len), [len]);
  const prev = useCallback(() => setCurrent(p => (p - 1 + len) % len), [len]);

  useEffect(() => {
    if (isHovered || len <= 1) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [next, interval, isHovered, len]);

  if (!images || images.length === 0) return null;

  return (
    <div
      className="palcco-carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="palcco-carousel__track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${alt} ${i + 1}`}
            className="palcco-carousel__slide"
            loading="lazy"
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      {len > 1 && (
        <>
          <button className="palcco-carousel__arrow palcco-carousel__arrow--prev" onClick={prev} aria-label="Anterior">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button className="palcco-carousel__arrow palcco-carousel__arrow--next" onClick={next} aria-label="Siguiente">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </>
      )}

      {/* Dots */}
      {len > 1 && (
        <div className="palcco-carousel__dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`palcco-carousel__dot ${i === current ? 'palcco-carousel__dot--active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Ir a imagen ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
