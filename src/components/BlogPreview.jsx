import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { blogPosts } from '../data/content';
import './BlogPreview.css';

gsap.registerPlugin(ScrollTrigger);

export default function BlogPreview() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.blog-header', {
        y: 30, opacity: 0, duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      });
      gsap.from('.blog-card', {
        y: 60, opacity: 0, duration: 0.7,
        stagger: 0.15,
        scrollTrigger: { trigger: '.blog-grid', start: 'top 80%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="blog-section" id="blog" ref={sectionRef}>
      <div className="blog-container">
        <div className="blog-header">
          <span className="tag tag--accent"><span className="tag__dot" /> NOVEDADES</span>
          <h2 className="blog-title">Nuestro Blog</h2>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post, i) => (
            <a key={i} href={post.href} className="blog-card" target="_blank" rel="noopener noreferrer">
              <div className="blog-card__img">
                <img src={post.image} alt={post.title} loading="lazy" />
              </div>
              <div className="blog-card__body">
                <h3 className="blog-card__title">{post.title}</h3>
                <span className="blog-card__link">Leer artículo →</span>
              </div>
            </a>
          ))}
        </div>

        <div className="blog-cta-wrap">
          <a
            href="https://www.promosat.com/publicidad-en-radio-noticias"
            target="_blank"
            rel="noopener noreferrer"
            className="blog-cta"
          >
            Ver más artículos
          </a>
        </div>
      </div>
    </section>
  );
}
