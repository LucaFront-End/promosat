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
    // On route change (not first mount), kill ALL ScrollTriggers + tweens
    // then scroll to top so the new page starts clean
    if (prevPath.current !== null && prevPath.current !== pathname) {
      // Kill every ScrollTrigger instance from the previous page
      ScrollTrigger.getAll().forEach(st => st.kill());
      // Kill all running GSAP tweens/timelines
      gsap.killTweensOf('*');
      // Reset scroll position instantly
      window.scrollTo({ top: 0, behavior: 'instant' });

      // After React re-renders the new page, refresh ScrollTrigger
      // so the new page's triggers compute correctly
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
        return () => cancelAnimationFrame(raf2);
      });
      return () => cancelAnimationFrame(raf1);
    }
    prevPath.current = pathname;
  }, [pathname]);

  return <>{children}</>;
}

