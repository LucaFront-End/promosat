import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import './CustomCursor.css';

export default function CustomCursor({ activeBlendMode = true }) {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 10);
      mouseY.set(e.clientY - 10);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('magnetic-hover');
        
      setIsHovering(isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Primary small cursor */}
      <motion.div
        ref={cursorRef}
        className={`custom-cursor custom-cursor--dot ${activeBlendMode ? 'blend-mode' : ''}`}
        style={{
          x: useMotionValue(mouseX),
          y: useMotionValue(mouseY),
          left: 10,
          top: 10,
        }}
      />
      {/* Follower larger bubble */}
      <motion.div
        className={`custom-cursor custom-cursor--ring ${isHovering ? 'is-hovering' : ''} ${activeBlendMode ? 'blend-mode' : ''}`}
        style={{
          x: smoothX,
          y: smoothY,
        }}
      />
    </>
  );
}
