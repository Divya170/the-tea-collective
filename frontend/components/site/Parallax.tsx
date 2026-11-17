'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Gentle scroll-linked vertical drift for large images. `factors` are px of travel per child.
 * Off for prefers-reduced-motion and on narrow screens (the CSS stacks the layout there).
 */
export function useParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const run = () => {
      raf = 0;
      const el = ref.current;
      if (!el || window.innerWidth < 900) return setP(0);
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      setP(Math.max(-1, Math.min(1, (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight)));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(run); };
    run();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return { ref, p };
}

/** A section whose absolutely positioned background drifts slightly as the page scrolls (Home: tea experience). */
export function ParallaxSection({ background, children, ...rest }: { background: React.ReactNode; children: React.ReactNode } & React.HTMLAttributes<HTMLElement>) {
  const { ref, p } = useParallax<HTMLElement>();
  return (
    <section ref={ref} {...rest}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, transform: `translateY(${(p * 40).toFixed(1)}px) scale(1.12)`, willChange: 'transform' }}>{background}</div>
      {children}
    </section>
  );
}

/** Experience "ritual" collage: three images drifting at different rates. */
export function RitualCollage({ images, copy }: { images: [React.ReactNode, React.ReactNode, React.ReactNode]; copy: React.ReactNode }) {
  const { ref, p } = useParallax<HTMLDivElement>();
  const t = (f: number) => ({ transform: `translateY(${(p * f).toFixed(1)}px)` });
  return (
    <div ref={ref} className="wrap ex-ritual">
      <div className="ex-r1" style={t(40)}>{images[0]}</div>
      <div className="ex-r-copy">{copy}</div>
      <div className="ex-r2" style={t(-30)}>{images[1]}</div>
      <div className="ex-r3" style={t(22)}>{images[2]}</div>
    </div>
  );
}
