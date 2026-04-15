import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// No Lenis — native scroll works perfectly with GSAP ScrollTrigger pins
// Lenis requires ScrollTrigger.scrollerProxy() which conflicts with multiple pins
export default function SmoothScroll({ children }) {
  const { pathname } = useLocation();
  const prevPath = useRef(null);

  useEffect(() => {
    // On route change (not first mount), scroll to top instantly
    if (prevPath.current !== null && prevPath.current !== pathname) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      // Refresh ScrollTrigger after route change so new page's triggers compute correctly
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }
    prevPath.current = pathname;
  }, [pathname]);

  return <>{children}</>;
}
