import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { statHighlight } from '../data/content';
import './StatHighlight.css';

gsap.registerPlugin(ScrollTrigger);

class Particle {
  constructor(targetX, targetY) {
    // Start at random position
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.targetX = targetX;
    this.targetY = targetY;
    this.vx = 0;
    this.vy = 0;
    this.size = 1.5 + Math.random() * 1.5;
    this.baseAlpha = 0.6 + Math.random() * 0.4;
    this.alpha = this.baseAlpha;
    // Spring physics constants
    this.friction = 0.88 + Math.random() * 0.06;
    this.springStrength = 0.02 + Math.random() * 0.02;
  }

  update(mouseX, mouseY, mouseRadius, isAssembled) {
    if (!isAssembled) {
      // Random floating
      this.vx += (Math.random() - 0.5) * 0.3;
      this.vy += (Math.random() - 0.5) * 0.3;
      this.vx *= 0.98;
      this.vy *= 0.98;
      this.x += this.vx;
      this.y += this.vy;
      return;
    }

    // Spring toward target
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    this.vx += dx * this.springStrength;
    this.vy += dy * this.springStrength;

    // Mouse repulsion
    if (mouseX !== null && mouseY !== null) {
      const mdx = this.x - mouseX;
      const mdy = this.y - mouseY;
      const dist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (dist < mouseRadius) {
        const force = (mouseRadius - dist) / mouseRadius;
        const angle = Math.atan2(mdy, mdx);
        this.vx += Math.cos(angle) * force * 6;
        this.vy += Math.sin(angle) * force * 6;
        this.alpha = Math.max(0.2, this.baseAlpha - force * 0.4);
      } else {
        this.alpha += (this.baseAlpha - this.alpha) * 0.05;
      }
    }

    this.vx *= this.friction;
    this.vy *= this.friction;
    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx) {
    ctx.globalAlpha = this.alpha;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

function getTextParticlePositions(canvas, text, fontSize, density = 3) {
  const offscreen = document.createElement('canvas');
  offscreen.width = canvas.width;
  offscreen.height = canvas.height;
  const ctx = offscreen.getContext('2d');

  ctx.fillStyle = '#fff';
  ctx.font = `900 ${fontSize}px "DM Sans", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, offscreen.width / 2, offscreen.height * 0.42);

  const imageData = ctx.getImageData(0, 0, offscreen.width, offscreen.height);
  const positions = [];

  for (let y = 0; y < offscreen.height; y += density) {
    for (let x = 0; x < offscreen.width; x += density) {
      const idx = (y * offscreen.width + x) * 4;
      if (imageData.data[idx + 3] > 128) {
        positions.push({ x, y });
      }
    }
  }

  return positions;
}

export default function StatHighlight() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null });
  const assembledRef = useRef(false);
  const animFrameRef = useRef(null);

  const setupParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const fontSize = Math.min(rect.width * 0.35, 280);
    const text = `${statHighlight.value}${statHighlight.suffix}`;
    const positions = getTextParticlePositions(canvas, text, fontSize * dpr, Math.round(3 * dpr));

    // Create particles
    const particles = positions.map(pos => {
      return new Particle(pos.x / dpr, pos.y / dpr);
    });

    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    setupParticles();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // ScrollTrigger to control assembly
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => { assembledRef.current = true; },
      onLeaveBack: () => { assembledRef.current = false; },
    });

    // Mouse tracking
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    const animate = () => {
      const ctx = canvas.getContext('2d');
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, w, h);

      // Particle color: accent red glow
      ctx.fillStyle = '#D03B44';

      const particles = particlesRef.current;
      const mouseRadius = 80;

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(
          mouseRef.current.x,
          mouseRef.current.y,
          mouseRadius,
          assembledRef.current
        );
        particles[i].draw(ctx);
      }

      ctx.globalAlpha = 1;
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      setupParticles();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      trigger.kill();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [setupParticles]);

  return (
    <section className="stat-highlight" ref={sectionRef}>
      <div className="stat-highlight__glow" />
      <canvas ref={canvasRef} className="stat-highlight__canvas" />
      <div className="stat-highlight__content">
        <span className="stat-highlight__label">DATO CLAVE</span>
        <p className="stat-highlight__desc">
          es el porcentaje que aumenta el <strong>Awareness</strong> en anuncios cuando se combinan con publicidad en <strong>Radio</strong>.
        </p>
      </div>
    </section>
  );
}
