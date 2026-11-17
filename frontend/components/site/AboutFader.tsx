'use client';

import { useEffect, useState } from 'react';
import { mediaUrl, tintClass } from '@/lib/api';
import type { GalleryItem } from '@/lib/types';
import { PauseIcon, PlayIcon } from './Icons';
import { Photo } from './Photo';

/** About "approach" collage: one large panel slowly cross-fading through admin-chosen photos (6.5s), plus two details. */
export function AboutFader({ items }: { items: GalleryItem[] }) {
  const main = items.length ? items : [];
  const n = main.length;
  const [k, setK] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  useEffect(() => { if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) setPaused(true); }, []);
  useEffect(() => {
    if (paused || hover || n < 2) return;
    const t = setInterval(() => { if (!document.hidden) setK((x) => (x + 1) % n); }, 6500);
    return () => clearInterval(t);
  }, [paused, hover, n]);
  const details = items.slice(n > 3 ? 3 : 1, (n > 3 ? 3 : 1) + 2);
  const cur = main[k];

  return (
    <div style={{ gridColumn: '7 / span 6', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 14 }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div style={{ gridRow: 'span 2', position: 'relative', minHeight: 520 }}>
        {main.map((s, i) => {
          const url = mediaUrl(s.imageUrl);
          return (
            <div key={s.id} className={`ph ${tintClass(s.tint)} ${url ? 'has-img' : ''}`} aria-hidden={i !== k} style={{ position: 'absolute', inset: 0, opacity: i === k ? 1 : 0, transition: 'opacity 1.6s ease' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {url ? <img className="cover" src={url} alt={s.alt || s.title} loading="lazy" /> : <p className="ph-tag">Photo placeholder · {s.title}</p>}
            </div>
          );
        })}
        {!n && <Photo alt="" label="Product close-up" tint="oat" style={{ position: 'absolute', inset: 0 }} />}
      </div>
      {(details.length ? details : [null, null]).map((d, i) => (
        <Photo key={d?.id ?? `d${i}`} src={d?.imageUrl} alt={d?.alt || d?.title || ''} label={d?.title || (i ? 'Preparation details' : 'Tea leaves, close up')} shortTag tint={d?.tint || (i ? 'forest' : 'oat')} style={{ aspectRatio: '1 / 1' }} />
      ))}
      {n > 1 && (
        <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <p className="hint" aria-live="polite">{k + 1} / {n} · {cur?.title}</p>
          <button type="button" className="icon-btn" onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Play approach photos' : 'Pause approach photos'} style={{ width: 44, height: 44 }}>
            {paused ? <PlayIcon /> : <PauseIcon />}
          </button>
        </div>
      )}
    </div>
  );
}
