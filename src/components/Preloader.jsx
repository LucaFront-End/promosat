import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { siteConfig } from '../data/content';
import './Preloader.css';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const textRef = useRef(null);
  const videoReadyRef = useRef(false);
  const minTimeRef = useRef(false);

  const dismiss = useCallback(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });
    tl.to(textRef.current, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' });
    tl.to(leftPanelRef.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, 0.3);
    tl.to(rightPanelRef.current, { yPercent: 100, duration: 0.9, ease: 'power4.inOut' }, 0.3);
    tl.set(containerRef.current, { display: 'none' });
  }, [onComplete]);

  const tryDismiss = useCallback(() => {
    if (videoReadyRef.current && minTimeRef.current) {
      setProgress(100);
      setTimeout(dismiss, 300);
    }
  }, [dismiss]);

  useEffect(() => {
    // Simulated progress (visual only)
    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 8) + 2;
      if (count > 90) count = 90; // cap at 90 until video ready
      if (videoReadyRef.current) count = 100;
      setProgress(count);
    }, 60);

    // Minimum wait time (2.5s) so preloader doesn't flash
    setTimeout(() => {
      minTimeRef.current = true;
      tryDismiss();
    }, 2500);

    // Listen for YouTube iframe to load
    const checkVideo = () => {
      const iframe = document.querySelector('.hero-cinematic__bg-video');
      if (iframe) {
        // iframe onload fires when YouTube player is ready
        iframe.addEventListener('load', () => {
          videoReadyRef.current = true;
          tryDismiss();
        });
        // Fallback: if already loaded
        if (iframe.contentDocument || iframe.contentWindow) {
          setTimeout(() => {
            videoReadyRef.current = true;
            tryDismiss();
          }, 1500);
        }
      } else {
        // No iframe found — try again soon
        setTimeout(checkVideo, 200);
      }
    };

    // Start checking after a tick (iframe may not be in DOM yet)
    setTimeout(checkVideo, 100);

    // Hard fallback: dismiss after 6s no matter what
    const hardTimeout = setTimeout(() => {
      videoReadyRef.current = true;
      minTimeRef.current = true;
      tryDismiss();
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(hardTimeout);
    };
  }, [tryDismiss, dismiss]);

  return (
    <div className="preloader" ref={containerRef}>
      <div className="preloader__panel preloader__panel--top" ref={leftPanelRef} />
      <div className="preloader__panel preloader__panel--bottom" ref={rightPanelRef} />
      <div className="preloader__content" ref={textRef}>
        <div className="preloader__logo">
          <img
            src={siteConfig.logo}
            alt="Promosat"
            className="preloader__logo-img"
          />
        </div>
        <div className="preloader__bar">
          <div className="preloader__bar-inner" style={{ width: `${progress}%` }} />
        </div>
        <div className="preloader__percent">{progress}%</div>
      </div>
    </div>
  );
}
