'use client';

import { useEffect, useRef, useState } from 'react';
import { mediaUrl, tintClass } from '@/lib/api';
import type { ContentBlock } from '@/lib/types';
import { PauseIcon, PlayIcon } from './Icons';

/**
 * Full-width hero cross-fade (1.8s fade every 6–8s). Pauses on hover/focus, on the pause button, when offscreen or
 * the tab is hidden, and for prefers-reduced-motion. The headline and CTAs (children) never move.
 */
export function HeroSlideshow({ slides, autoplay, intervalSeconds, children }: { slides: ContentBlock[]; autoplay: boolean; intervalSeconds: number; children: React.ReactNode }) {
  const count = Math.max(1, slides.length);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(!autoplay);
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) setPaused(true);
    const el = ref.current;
    const io = el && 'IntersectionObserver' in window ? new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.15 }) : null;
    if (io && el) io.observe(el);
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => { io?.disconnect(); document.removeEventListener('visibilitychange', onVis); };
  }, []);

  useEffect(() => {
    if (paused || hover || !visible || count < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), Math.min(8, Math.max(6, intervalSeconds)) * 1000);
    return () => clearInterval(t);
  }, [paused, hover, visible, count, intervalSeconds]);

  const current = slides[index];
  return (
    <section ref={ref} aria-label="Welcome to The Tea Collective" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onFocus={() => setHover(true)} onBlur={() => setHover(false)}
      style={{ position: 'relative', minHeight: 'clamp(620px, 92vh, 940px)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', color: '#FCFAF5', background: '#303B32' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
        {(slides.length ? slides : [null]).map((s, i) => {
          const url = mediaUrl(s?.fields?.imageUrl);
          const tc = tintClass(s?.fields?.tint);
          return (
            <div key={s?.id ?? i} className={`ph ${tc} ${url ? 'has-img' : ''}`} style={{ position: 'absolute', inset: 0, opacity: i === index ? 1 : 0, transition: 'opacity 1.8s ease' }}>
              <div className={`ph ${tc} kb`} style={{ position: 'absolute', inset: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {url && <img className="cover" src={url} alt="" loading={i === 0 ? 'eager' : 'lazy'} fetchPriority={i === 0 ? 'high' : 'auto'} />}
              </div>
            </div>
          );
        })}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(36,44,38,.82) 0%, rgba(36,44,38,.55) 42%, rgba(36,44,38,.08) 78%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(36,44,38,0) 55%, rgba(36,44,38,.6) 100%)' }} />
      </div>
      {current && !current.fields?.imageUrl && <p className="ph-tag" style={{ top: 22, bottom: 'auto', left: 'auto', right: 'clamp(20px,5vw,72px)' }}>Photo placeholder · {current.fields?.alt || current.title}</p>}
      {current?.fields?.imageUrl && <p className="sr" aria-live="polite">{current.fields.alt || current.title}</p>}
      {children}
      <a href="#intro-h" style={{ position: 'absolute', left: '50%', bottom: 22, transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textDecoration: 'none', color: '#E3E6DC', minHeight: 44 }}>
        <span className="label" style={{ fontSize: 10, color: '#E3E6DC' }}>Scroll</span>
        <svg className="scrollcue" width="14" height="22" viewBox="0 0 14 22" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><path d="M7 1v18M2 14l5 6 5-6" /></svg>
        <span className="sr">Skip to the introduction</span>
      </a>
      {count > 1 && (
        <div style={{ position: 'absolute', right: 'clamp(20px,5vw,72px)', bottom: 'clamp(24px,4vw,44px)', display: 'flex', alignItems: 'center', gap: 2 }}>
          {slides.map((s, i) => (
            <button key={s.id} type="button" aria-label={`Show photo ${i + 1} of ${count}`} aria-pressed={i === index} onClick={() => { setIndex(i); setPaused(true); }}
              style={{ width: 44, height: 44, border: 0, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
              <span style={{ display: 'block', width: i === index ? 30 : 16, height: 2, background: i === index ? '#F7F3E9' : 'rgba(247,243,233,.45)', transition: 'width .5s ease, background .5s ease' }} />
            </button>
          ))}
          <button type="button" className="icon-btn light" onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Play hero photos' : 'Pause hero photos'} style={{ marginLeft: 8, width: 44, height: 44 }}>
            {paused ? <PlayIcon /> : <PauseIcon />}
          </button>
        </div>
      )}
    </section>
  );
}
