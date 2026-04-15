import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const { pathname } = useLocation();
  const prevPath = useRef(null);

  useEffect(() => {
    if (prevPath.current !== null && prevPath.current !== pathname) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
    prevPath.current = pathname;
  }, [pathname]);

  return <>{children}</>;
}

