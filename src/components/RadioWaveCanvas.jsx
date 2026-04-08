import { useRef, useEffect, useCallback } from 'react';

/**
 * RadioWaveCanvas — Interactive canvas that emits expanding radio
 * wave rings wherever the mouse moves, fading out organically.
 * 
 * Designed to sit behind Hero content as an atmospheric effect.
 */
export default function RadioWaveCanvas() {
  const canvasRef = useRef(null);
  const wavesRef = useRef([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const lastEmitRef = useRef(0);
  const rafRef = useRef(null);

  // Configuration
  const CONFIG = {
    MAX_RINGS: 3,          // How many concentric rings per wave
    MAX_RADIUS: 180,       // Max expansion radius
    EXPAND_SPEED: 1.8,     // Pixels per frame
    FADE_SPEED: 0.008,     // Alpha decay per frame
    EMIT_THROTTLE: 80,     // ms between wave spawns
    LINE_WIDTH: 1.5,
    MAX_WAVES: 40,         // Max simultaneous wave groups
    COLOR_PRIMARY: '198, 67, 67',    // Promosat red
    COLOR_SECONDARY: '0, 122, 255',  // Blue accent
    COLOR_WHITE: '255, 255, 255',    // Subtle white waves
  };

  const createWave = useCallback((x, y) => {
    // Each "wave event" creates multiple concentric rings with staggered starts
    const rings = [];
    for (let i = 0; i < CONFIG.MAX_RINGS; i++) {
      const colorPool = [CONFIG.COLOR_PRIMARY, CONFIG.COLOR_SECONDARY, CONFIG.COLOR_WHITE];
      rings.push({
        x,
        y,
        radius: i * 12,    // Staggered start radius
        alpha: 0.35 - (i * 0.08),
        lineWidth: CONFIG.LINE_WIDTH - (i * 0.3),
        color: colorPool[i % colorPool.length],
      });
    }
    return rings;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.parentElement.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;

      const now = Date.now();
      if (now - lastEmitRef.current > CONFIG.EMIT_THROTTLE) {
        lastEmitRef.current = now;
        const newWave = createWave(mouseRef.current.x, mouseRef.current.y);
        wavesRef.current.push(...newWave);
        // Cap total rings
        if (wavesRef.current.length > CONFIG.MAX_WAVES * CONFIG.MAX_RINGS) {
          wavesRef.current = wavesRef.current.slice(-CONFIG.MAX_WAVES * CONFIG.MAX_RINGS);
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw each ring
      wavesRef.current = wavesRef.current.filter(ring => {
        ring.radius += CONFIG.EXPAND_SPEED;
        ring.alpha -= CONFIG.FADE_SPEED;

        if (ring.alpha <= 0 || ring.radius > CONFIG.MAX_RADIUS) return false;

        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${ring.color}, ${Math.max(0, ring.alpha)})`;
        ctx.lineWidth = Math.max(0.3, ring.lineWidth * (ring.alpha / 0.35));
        ctx.stroke();

        return true;
      });

      // Draw a subtle "antenna dot" at current mouse position
      if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
        const pulse = Math.sin(Date.now() * 0.005) * 0.15 + 0.25;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${CONFIG.COLOR_PRIMARY}, ${pulse})`;
        ctx.fill();

        // Outer glow
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 8, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${CONFIG.COLOR_PRIMARY}, ${pulse * 0.4})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    canvas.parentElement.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.parentElement?.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [createWave]);

  return (
    <canvas
      ref={canvasRef}
      className="radio-wave-canvas"
      aria-hidden="true"
    />
  );
}
