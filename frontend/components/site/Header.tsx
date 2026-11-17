'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { SiteSettings } from '@/lib/types';
import { Icon, LogoMark } from './Icons';
import { NAV } from './nav';

export function Header({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const opened = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenu(false), [pathname]);

  useEffect(() => {
    if (!menu) {
      if (opened.current) toggleRef.current?.focus();
      return;
    }
    opened.current = true;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { document.body.style.overflow = prev; };
  }, [menu]);

  // Keep keyboard focus inside the open drawer.
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') return setMenu(false);
    if (e.key !== 'Tab' || !panelRef.current) return;
    const nodes = panelRef.current.querySelectorAll<HTMLElement>('a[href], button');
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header style={{ position: 'sticky', top: 0, zIndex: 40, background: scrolled ? 'rgba(247,243,233,0.97)' : '#F7F3E9', borderBottom: `1px solid ${scrolled ? '#DCCFB8' : 'transparent'}`, transition: 'background .4s ease, border-color .4s ease' }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, height: scrolled ? 68 : 88, transition: 'height .35s ease' }}>
          <Link href="/" aria-label={`${settings.businessName}, home`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, color: '#303B32' }}>
            <LogoMark />
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span className="serif" style={{ fontSize: 24, fontWeight: 600, letterSpacing: '.01em' }}>{settings.businessName}</span>
              <span style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: '.32em', textTransform: 'uppercase', color: '#6E5A45', marginTop: 6 }}>{settings.tagline}</span>
            </span>
          </Link>
          <nav aria-label="Primary" className="nav-links">
            {NAV.map((n) => (
              <Link key={n.href} className="nav-link" href={n.href} aria-current={isActive(n.href) ? 'page' : undefined}>{n.label}</Link>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Link className="btn nav-cta" href="/collection" style={{ minHeight: 46, padding: '0 22px' }}>Explore Our Teas</Link>
            <button ref={toggleRef} type="button" className="icon-btn nav-toggle" aria-label="Open menu" aria-expanded={menu} aria-controls="site-drawer" onClick={() => setMenu(true)}>
              <Icon name="menu" size={22} sw={1.5} />
            </button>
          </div>
        </div>
      </header>

      {menu && (
        <div className="drawer" onClick={(e) => { if (e.target === e.currentTarget) setMenu(false); }}>
          <div ref={panelRef} id="site-drawer" className="drawer-panel" role="dialog" aria-modal="true" aria-label="Site menu" onKeyDown={onKey}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 60 }}>
              <span className="label">Menu</span>
              <button ref={closeRef} type="button" className="icon-btn" aria-label="Close menu" onClick={() => setMenu(false)}><Icon name="close" size={18} sw={1.5} /></button>
            </div>
            <nav aria-label="Mobile" style={{ display: 'flex', flexDirection: 'column', marginTop: 12 }}>
              {NAV.map((n, i) => (
                <Link key={n.href} className="mlink" href={n.href} aria-current={isActive(n.href) ? 'page' : undefined} onClick={() => setMenu(false)}>
                  {n.label}<span className="label" aria-hidden="true">0{i + 1}</span>
                </Link>
              ))}
            </nav>
            <div style={{ marginTop: 'auto', paddingTop: 32, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Link className="btn" href="/collection" style={{ width: '100%' }} onClick={() => setMenu(false)}>Explore Our Teas <span className="arr" aria-hidden="true">→</span></Link>
              <Link className="btn btn-ghost" href="/contact" style={{ width: '100%' }} onClick={() => setMenu(false)}>Contact Us</Link>
              <p className="hint" style={{ textAlign: 'center', marginTop: 8 }}>{settings.addressLine1}, {settings.city}, {settings.region} {settings.postalCode}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
