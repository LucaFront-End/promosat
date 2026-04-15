import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Disable native scroll restoration so it doesn't conflict with our manual control
if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

export default function SmoothScroll({ children }) {
  const { pathname } = useLocation();
  const prevPath = useRef(null);

  useLayoutEffect(() => {
    if (prevPath.current !== null && prevPath.current !== pathname) {
      // Force instantaneous scroll to top BEFORE browser paints the new route
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Double rAF ensures the DOM has completely painted and layout is stable
      const r1 = requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        const r2 = requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
        return () => cancelAnimationFrame(r2);
      });
      
      return () => cancelAnimationFrame(r1);
    }
    prevPath.current = pathname;
  }, [pathname]);

  return <>{children}</>;
}

