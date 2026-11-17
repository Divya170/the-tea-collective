import Link from 'next/link';

export function Breadcrumbs({ current, light }: { current: string; light?: boolean }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol style={{ listStyle: 'none', display: 'flex', gap: 10, margin: 0, padding: 0, fontSize: 13, letterSpacing: '.06em', color: light ? '#E3E6DC' : '#5C6158' }}>
        <li><Link href="/" style={{ color: 'inherit', display: 'inline-flex', minHeight: 32, alignItems: 'center' }}>Home</Link></li>
        <li aria-hidden="true" style={{ display: 'flex', alignItems: 'center' }}>/</li>
        <li aria-current="page" style={{ color: light ? '#FCFAF5' : '#465B49', fontWeight: 600, display: 'flex', alignItems: 'center' }}>{current}</li>
      </ol>
    </nav>
  );
}
