'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ContentBlock } from '@/lib/types';
import { Icon } from './Icons';

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
const words = (s: number) => {
  const m = Math.floor(s / 60), r = s % 60;
  return [m ? `${m} ${m === 1 ? 'minute' : 'minutes'}` : '', r ? `${r} seconds` : ''].filter(Boolean).join(' ') || '0 seconds';
};
const secsOf = (v: ContentBlock) => Math.max(30, Math.min(900, Number(v.fields?.seconds) || 180));

/**
 * Interactive brewing guide: choose a tea style → suggested temperature, time, amount and method, plus a
 * steeping timer (start / pause / resume, ±30s from 30s to 15 min, reset, clear completion state).
 * "How to brew it" links elsewhere on the page use #brew-<slug> to preselect a style.
 * The timer counts against wall-clock time, so it stays accurate if the tab is throttled.
 */
export function BrewingGuide({ varieties, disclaimer }: { varieties: ContentBlock[]; disclaimer?: string }) {
  const [slug, setSlug] = useState(varieties[0]?.fields?.slug ?? '');
  const v = varieties.find((x) => x.fields?.slug === slug) ?? varieties[0];
  const [total, setTotal] = useState(v ? secsOf(v) : 180);
  const [left, setLeft] = useState(total);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [status, setStatus] = useState('');
  const endAt = useRef(0);

  const pick = useCallback((s: string, announce = true) => {
    const nv = varieties.find((x) => x.fields?.slug === s);
    if (!nv) return;
    const t = secsOf(nv);
    setSlug(s); setTotal(t); setLeft(t); setRunning(false); setDone(false);
    if (announce) setStatus(`${nv.title} selected. Timer set to ${words(t)}.`);
  }, [varieties]);

  useEffect(() => {
    const fromHash = () => {
      const m = window.location.hash.match(/^#brew-([a-z0-9-]+)$/);
      if (m) { pick(m[1]); document.getElementById('brew-tool')?.scrollIntoView({ behavior: 'smooth' }); }
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, [pick]);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      const l = Math.max(0, Math.round((endAt.current - Date.now()) / 1000));
      setLeft(l);
      if (l <= 0) { setRunning(false); setDone(true); setStatus('Time’s up. Your tea is ready.'); }
    }, 250);
    return () => clearInterval(t);
  }, [running]);

  if (!v) return <p className="lead">The brewing guide is being updated.</p>;

  const start = () => {
    const from = done || left <= 0 ? total : left;
    setDone(false); setLeft(from);
    endAt.current = Date.now() + from * 1000;
    setRunning(true); setStatus('Timer running.');
  };
  const pause = () => { setRunning(false); setStatus(`Paused at ${fmt(left)}.`); };
  const adjust = (d: number) => {
    if (running) return;
    const t = Math.max(30, Math.min(900, total + d));
    setTotal(t); setLeft(t); setDone(false); setStatus(`Timer set to ${words(t)}.`);
  };
  const reset = () => { setRunning(false); setLeft(total); setDone(false); setStatus(`Timer reset to ${fmt(total)}.`); };
  const f = v.fields ?? {};
  const label = running ? 'Pause' : done ? 'Start Again' : left < total ? 'Resume' : 'Start';

  return (
    <>
      <div className="chips" role="group" aria-label="Tea style" style={{ marginTop: 40 }}>
        {varieties.map((x) => (
          <button key={x.id} type="button" className="chip chip-light" aria-pressed={x.fields?.slug === slug} onClick={() => pick(x.fields?.slug ?? '')}>{x.title}</button>
        ))}
      </div>
      <div className="ex-tool">
        <div className="ex-tool-info" key={slug}>
          <p className="label" style={{ color: '#E8DDC9' }}>Suggested for {v.title}</p>
          <dl className="ex-facts">
            <div><dt><Icon name="thermo" size={22} /><span>Water</span></dt><dd>{f.temp}</dd><p>{f.tempF}</p></div>
            <div><dt><Icon name="timer" size={22} /><span>Steep</span></dt><dd>{f.time}</dd><p>{f.timeNote}</p></div>
            <div><dt><Icon name="spoon" size={22} /><span>Amount</span></dt><dd>{f.amount}</dd><p>per 8 oz / 240 ml cup</p></div>
          </dl>
          {f.method && <p className="lead" style={{ marginTop: 26 }}>{f.method}</p>}
          {disclaimer && (
            <p style={{ marginTop: 22, fontSize: 13.5, lineHeight: 1.6, color: '#D5DBCF', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ flex: 'none', marginTop: 1 }}><Icon name="leaf" size={18} /></span><span>{disclaimer}</span>
            </p>
          )}
        </div>
        <div className="ex-timer" role="group" aria-labelledby="timer-h">
          <p id="timer-h" className="label" style={{ color: '#303B32' }}>Steeping timer</p>
          <div className="ex-ring" aria-hidden="true">
            <svg viewBox="0 0 220 220" width="100%" height="100%">
              <circle cx="110" cy="110" r="96" fill="none" stroke="#E1D7C4" strokeWidth="4" />
              <circle cx="110" cy="110" r="96" fill="none" stroke="#465B49" strokeWidth="4" strokeLinecap="round" strokeDasharray="603.2" strokeDashoffset={(603.2 * (1 - left / Math.max(1, total))).toFixed(1)} transform="rotate(-90 110 110)" style={{ transition: 'stroke-dashoffset .3s linear' }} />
            </svg>
            <span className="ex-ring-time">{fmt(left)}</span>
          </div>
          <p className="sr" role="timer" aria-live="off">{words(left)} remaining</p>
          <p className="hint" style={{ textAlign: 'center', minHeight: 24, color: '#4A5249' }} aria-live="polite">{status || `Set for ${words(total)}. Press Start when you pour.`}</p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginTop: 14 }}>
            <button type="button" className="icon-btn" onClick={() => adjust(-30)} aria-label="Thirty seconds less" disabled={running || total <= 30}>−30s</button>
            <button type="button" className="btn" onClick={running ? pause : start} style={{ minWidth: 150 }}>{label}</button>
            <button type="button" className="icon-btn" onClick={() => adjust(30)} aria-label="Thirty seconds more" disabled={running || total >= 900}>+30s</button>
          </div>
          <button type="button" className="tlink" onClick={reset} style={{ margin: '10px auto 0', display: 'flex' }}>Reset timer</button>
          {done && (
            <div className="notice" style={{ marginTop: 16, textAlign: 'left', animation: 'rise .5s ease both' }}>
              <p style={{ fontWeight: 600 }}>Your {v.title.toLowerCase()} is ready.</p>
              <p className="hint" style={{ marginTop: 4 }}>Remove the leaves now so it doesn’t over-steep. Enjoy your cup.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
