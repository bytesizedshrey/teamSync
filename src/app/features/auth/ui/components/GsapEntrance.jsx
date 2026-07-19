import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Wraps children and runs a GSAP stagger entrance animation.
 * Usage: wrap the form card content with this.
 */
const GsapEntrance = ({ children, className = '' }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll('[data-animate]');

    gsap.fromTo(
      el,
      { opacity: 0, y: 40, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power3.out' }
    );

    if (children.length) {
      gsap.fromTo(
        children,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
          stagger: 0.09,
          delay: 0.25,
        }
      );
    }
  }, []);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
};

export default GsapEntrance;
