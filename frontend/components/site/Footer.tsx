import Link from 'next/link';
import type { SiteSettings } from '@/lib/types';
import { NAV } from './nav';

export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="foot on-dark" style={{ padding: 'clamp(72px,9vw,112px) 0 36px', position: 'relative', overflow: 'hidden' }}>
      <svg className="leaf-deco" width="320" height="320" viewBox="0 0 200 200" fill="none" stroke="#A8B5A0" strokeWidth=".8" aria-hidden="true" style={{ right: -40, top: -30, opacity: 0.25 }}>
        <path d="M40 170C60 90 110 50 180 30c-14 70-60 118-140 140z" /><path d="M40 170c40-40 80-84 140-140" />
        <path d="M80 128c-2-18 2-34 10-46M110 98c-2-20 4-38 14-50M70 140c18 2 34-2 48-10M100 112c20 2 38-4 52-14" />
      </svg>
      <div className="wrap" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, justifyContent: 'space-between', paddingBottom: 52, borderBottom: '1px solid rgba(247,243,233,.16)' }}>
          <div style={{ flex: '1 1 320px', maxWidth: 420 }}>
            <p className="serif" style={{ fontSize: 38, lineHeight: 1, color: '#FCFAF5' }}>{settings.businessName}</p>
            <p style={{ margin: '16px 0 26px', lineHeight: 1.75, fontSize: 15, color: '#D5DBCF' }}>{settings.footerNote}</p>
            <Link className="btn btn-light" href="/collection">Explore Our Teas <span className="arr" aria-hidden="true">→</span></Link>
          </div>
          <nav aria-label="Footer" style={{ flex: '0 1 170px' }}>
            <p className="label" style={{ color: '#D9A58E', marginBottom: 18 }}>Explore</p>
            <ul>{NAV.map((n) => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}</ul>
          </nav>
          <div style={{ flex: '0 1 300px' }}>
            <p className="label" style={{ color: '#D9A58E', marginBottom: 18 }}>Visit &amp; contact</p>
            <address style={{ fontStyle: 'normal', lineHeight: 1.75, color: '#E3E6DC', fontSize: 15 }}>
              <a href={settings.mapsUrl} target="_blank" rel="noopener noreferrer">{settings.addressLine1}<br />{settings.city}, {settings.region} {settings.postalCode}, {settings.country}<span className="sr"> (opens Google Maps in a new tab)</span></a><br />
              {settings.phoneHref && <><a href={settings.phoneHref} style={{ display: 'inline-flex', minHeight: 40, alignItems: 'center' }}>{settings.phone}</a><br /></>}
              {settings.emailHref && <a href={settings.emailHref} style={{ display: 'inline-flex', minHeight: 40, alignItems: 'center', wordBreak: 'break-all' }}>{settings.email}</a>}
            </address>
            {settings.hoursVerified ? (
              <ul style={{ marginTop: 12, gap: 4, fontSize: 14, color: '#C2CABD' }}>
                {settings.hoursDisplay.map((h) => <li key={h.day}><span style={{ display: 'inline-block', minWidth: 44 }}>{h.day.slice(0, 3)}</span> {h.label}</li>)}
              </ul>
            ) : (
              <p style={{ marginTop: 12, fontSize: 14, color: '#C2CABD' }}>Contact us for current store hours.</p>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16, paddingTop: 28, fontSize: 13, color: '#C2CABD' }}>
          <p>© {year} {settings.businessName}. All rights reserved.</p>
          {settings.socialLinks.length > 0 && (
            <ul style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 18 }} aria-label="Social media">
              {settings.socialLinks.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}<span className="sr"> (opens in a new tab)</span></a></li>)}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}

export function StickyCta() {
  return (
    <div className="sticky-cta" role="region" aria-label="Quick actions">
      <Link className="btn" href="/collection">Our Teas</Link>
      <Link className="btn btn-ghost" href="/contact">Contact</Link>
    </div>
  );
}
