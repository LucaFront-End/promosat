import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ThemeTrigger({ children, theme = 'dark' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => document.documentElement.setAttribute('data-theme', theme),
        onEnterBack: () => document.documentElement.setAttribute('data-theme', theme),
        // If it's the very first section, set it initially
        onRefresh: (self) => {
          if (self.isActive) document.documentElement.setAttribute('data-theme', theme);
        }
      });
    });

    return () => ctx.revert();
  }, [theme]);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {children}
    </div>
  );
}
