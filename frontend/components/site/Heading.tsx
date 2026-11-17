import { Em } from './Em';

/** Eyebrow + serif h2 with the design's italic emphasis. */
export function SectionHead({ id, eyebrow, title, onDark, size, style }: { id: string; eyebrow?: string; title: string; onDark?: boolean; size?: string; style?: React.CSSProperties }) {
  return (
    <div style={style}>
      {eyebrow && <p className={`eyebrow ${onDark ? 'light' : ''}`}>{eyebrow}</p>}
      <h2 id={id} className="h2" style={{ ...(size ? { fontSize: size } : {}), ...(onDark ? { color: '#FCFAF5' } : {}) }}><Em text={title} onDark={onDark} /></h2>
    </div>
  );
}
