/** Stroke icons and botanical marks from the design (no emoji). All decorative: aria-hidden. */
const P: Record<string, React.ReactNode> = {
  cup: <><path d="M4 9h13v4a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z" /><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17" /><path d="M8 3c-1 1.5 1 2.5 0 4M12 3c-1 1.5 1 2.5 0 4" /><path d="M3 21h16" /></>,
  kettle: <><path d="M6 10h11l1 9H5z" /><path d="M8 10c0-3 2-5 4-5s4 2 4 5" /><path d="M17 12l3-2v5" /><path d="M11 5V3h2v2" /></>,
  thermo: <><path d="M10 4a2 2 0 0 1 4 0v10a4 4 0 1 1-4 0z" /><path d="M12 9v8" /></>,
  timer: <><circle cx="12" cy="13" r="8" /><path d="M12 9v4l3 2" /><path d="M9 2h6" /></>,
  leaf: <><path d="M5 19c1.5-7 6-11.5 14-14-1 8-6 13-14 14z" /><path d="M5 19c4-4 8-8.5 14-14" /></>,
  jar: <><path d="M7 4h10v3H7z" /><path d="M6 7h12v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" /><path d="M9 12c2-1 4 1 6 0" /></>,
  spoon: <><ellipse cx="8" cy="7" rx="4" ry="5" /><path d="M10.5 11L20 20" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5z" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="1" /><path d="M3 7l9 6 9-6" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  menu: <path d="M3 8h18M3 16h18" />,
  close: <path d="M5 5l14 14M19 5L5 19" />,
  prev: <path d="M15 5l-7 7 7 7" />,
  next: <path d="M9 5l7 7-7 7" />,
  plus: <path d="M12 5v14M5 12h14" />,
};
export const ICON_NAMES = Object.keys(P).filter((k) => !['menu', 'close', 'prev', 'next', 'plus'].includes(k));

export function Icon({ name, size = 24, sw = 1.3 }: { name: string; size?: number; sw?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {P[name] ?? P.leaf}
    </svg>
  );
}

export function PauseIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>;
}
export function PlayIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4l13 8-13 8z" /></svg>;
}

/** The wordmark's leaf-in-a-circle. */
export function LogoMark() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <circle cx="17" cy="17" r="16" stroke="#465B49" strokeWidth="1" />
      <path d="M10 24c2-8 7-12 15-14-1 8-6 13-15 14z" fill="#465B49" />
      <path d="M10 24c4-4 8-8 15-14" stroke="#F7F3E9" strokeWidth="1" />
    </svg>
  );
}

/** Delicate botanical sprig used as section decoration. */
export function Sprig({ size = 160, color = '#465B49', className = 'leaf-deco', style }: { size?: number; color?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 200 200" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" aria-hidden="true" style={style}>
      <path d="M30 185C52 120 92 62 150 18" />
      <path d="M58 132c-26-6-38-24-38-46 24 4 38 22 38 46z" /><path d="M58 132C46 116 34 100 20 86" />
      <path d="M80 98c-4-26 8-46 30-56 6 24-6 44-30 56z" /><path d="M80 98c8-18 18-36 30-56" />
      <path d="M104 70c18-18 40-20 58-10-14 20-36 24-58 10z" /><path d="M104 70c18-6 38-10 58-10" />
      <path d="M44 158c22 4 42-6 52-26-24-4-44 6-52 26z" />
    </svg>
  );
}
