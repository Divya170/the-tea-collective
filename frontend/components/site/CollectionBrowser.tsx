'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CollectionResponse, Product, SiteSettings } from '@/lib/types';
import { ClientNote } from './ClientNote';
import { Icon } from './Icons';
import { InquiryForm, type TeaOption } from './InquiryForm';
import { Photo } from './Photo';

/**
 * Category filter (state mirrored to ?category= so links and refreshes keep it), staggered catalogue,
 * and the product inquiry dialog (focus trap, Esc, focus returns to the opening button).
 */
export function CollectionBrowser({ data, settings, initialCategory, note }: { data: CollectionResponse; settings: SiteSettings; initialCategory?: string; note?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const cats = data.categories;
  const valid = (s?: string) => (s && cats.some((c) => c.slug === s) ? s : 'all');
  const [cat, setCat] = useState(valid(initialCategory));
  const [open, setOpen] = useState<Product | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const panel = useRef<HTMLDivElement>(null);

  const teas: TeaOption[] = useMemo(() => data.items.map((p) => ({ id: p.id, name: p.name, categoryName: data.allCategories.find((c) => c.id === p.categoryId)?.name ?? '' })), [data]);
  const catById = (id: number) => data.allCategories.find((c) => c.id === id);
  const cur = cats.find((c) => c.slug === cat);
  const shown = cur ? data.items.filter((p) => p.categoryId === cur.id) : data.items;
  const anySample = data.items.some((p) => p.isSample);

  const pick = (slug: string) => {
    setCat(slug);
    router.replace(slug === 'all' ? pathname : `${pathname}?category=${slug}`, { scroll: false });
  };

  const close = useCallback(() => {
    setOpen(null);
    const t = trigger.current;
    setTimeout(() => t?.focus(), 0);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setTimeout(() => panel.current?.querySelector<HTMLElement>('button')?.focus(), 0);
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Deep link from Home ("View details"): scroll to and briefly highlight #tea-<id>.
  useEffect(() => {
    const m = window.location.hash.match(/^#tea-(\d+)$/);
    if (m) setTimeout(() => document.getElementById(`tea-${m[1]}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 150);
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key !== 'Tab' || !panel.current) return;
    const nodes = (Array.from(panel.current.querySelectorAll<HTMLElement>('button, a[href], input:not([tabindex="-1"]), select, textarea')) as HTMLElement[]).filter((n: HTMLElement) => !n.hasAttribute('disabled'));
    const first = nodes[0], last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  const live = `${shown.length} ${shown.length === 1 ? 'tea' : 'teas'}${cur ? ` · ${cur.name}` : ''}`;

  return (
    <>
      {cats.length > 0 && (
        <nav aria-label="Tea categories" className="filter-bar">
          <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18 }}>
            <div className="chips" role="group" aria-label="Filter teas by category">
              {[{ slug: 'all', name: 'All Teas', count: data.total }, ...cats].map((c) => (
                <button key={c.slug} type="button" className="chip" aria-pressed={cat === c.slug} onClick={() => pick(c.slug)}>{c.name}<span className="n">{c.count}</span></button>
              ))}
            </div>
            <p className="hint hide-sm" aria-live="polite" style={{ flex: 'none' }}>{live}</p>
          </div>
        </nav>
      )}

      <section aria-labelledby="cat-h" style={{ padding: 'clamp(40px, 5vw, 72px) 0 clamp(88px, 11vw, 150px)' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, marginBottom: 'clamp(32px, 4vw, 56px)' }}>
            <div style={{ maxWidth: 640 }}>
              <h2 id="cat-h" className="h2" style={{ margin: 0, fontSize: 'clamp(34px, 3.6vw, 52px)' }}>{cur ? cur.name : 'All teas'}</h2>
              <p className="lead" style={{ marginTop: 12 }}>{cur ? cur.blurb : 'Browse every tea in the collection, or choose a category to narrow it down.'}</p>
            </div>
            <p className="hint show-sm" aria-hidden="true">{live}</p>
          </div>
          {anySample && <ClientNote note={note} style={{ marginBottom: 'clamp(32px, 4vw, 48px)' }} />}

          {shown.length > 0 ? (
            <ul className="prod-grid">
              {shown.map((p, i) => {
                const c = catById(p.categoryId);
                return (
                  <li key={p.id} id={`tea-${p.id}`} className="prod" style={{ animationDelay: `${Math.min(i, 8) * 70}ms`, scrollMarginTop: 140 }}>
                    <article aria-labelledby={`tea-h-${p.id}`}>
                      <Photo src={p.imageUrl} alt={p.imageAlt || p.name} tint={p.tint ?? c?.tint} zoom className="zoom-host" style={{ aspectRatio: '4 / 5' }}>
                        {p.isSample && <span className="sample" style={{ position: 'absolute', top: 14, left: 14, background: '#FCFAF5', zIndex: 3 }}>Sample</span>}
                      </Photo>
                      <p className="label" style={{ marginTop: 22 }}>{c?.name}</p>
                      <h3 id={`tea-h-${p.id}`} className="h3" style={{ marginTop: 10 }}>{p.name}</h3>
                      {p.description && <p className="hint" style={{ marginTop: 10 }}>{p.description}</p>}
                      {(p.origin || p.flavourProfile || p.isSample) && (
                        <dl className="prod-meta">
                          {(p.origin || p.isSample) && <div><dt>Origin</dt><dd>{p.origin || 'To be supplied'}</dd></div>}
                          {(p.flavourProfile || p.isSample) && <div><dt>Flavour</dt><dd>{p.flavourProfile || 'To be supplied'}</dd></div>}
                        </dl>
                      )}
                      {p.ingredients && <p className="hint" style={{ marginTop: 10, fontSize: 13.5 }}><strong style={{ fontWeight: 600 }}>Ingredients:</strong> {p.ingredients}</p>}
                      <button type="button" className="tlink" aria-haspopup="dialog" aria-label={`Inquire about ${p.name}`} onClick={(e) => { trigger.current = e.currentTarget; setOpen(p); }} style={{ marginTop: 10 }}>
                        Inquire About This Tea <span className="arr" aria-hidden="true">→</span>
                      </button>
                    </article>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="empty-card">
              <p className="disp" style={{ fontSize: 36 }}>{data.total ? 'No teas in this category yet' : 'Our tea collection is being updated'}</p>
              <p className="hint" style={{ marginTop: 10 }}>Ask us what’s currently available{data.total ? ', or browse the full collection' : ''}.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginTop: 22 }}>
                {data.total > 0 && <button type="button" className="btn btn-ghost" onClick={() => pick('all')}>Show All Teas</button>}
                <Link className="btn" href="/contact">Ask Us</Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {open && (
        <div className="modal" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
          <div ref={panel} className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="inq-h" onKeyDown={onKey}>
            <Photo src={open.imageUrl} alt={open.imageAlt || open.name} tint={open.tint ?? catById(open.categoryId)?.tint} className="modal-art" style={{ minHeight: '100%' }} />
            <div style={{ padding: 'clamp(24px, 4vw, 48px)', position: 'relative' }}>
              <button type="button" className="icon-btn" onClick={close} aria-label="Close inquiry form" style={{ position: 'absolute', top: 16, right: 16 }}><Icon name="close" size={18} sw={1.5} /></button>
              <p className="label">Product inquiry</p>
              <h2 id="inq-h" className="disp" style={{ marginTop: 12, fontSize: 'clamp(32px, 3vw, 42px)', paddingRight: 56 }}>Ask about {open.name}</h2>
              <p className="hint" style={{ marginTop: 10 }}>We’ll reply by email. Fields marked <span className="req">*</span> are required.</p>
              <div style={{ marginTop: 22 }}>
                <InquiryForm key={open.id} mode="product" teas={teas} settings={settings} initialProduct={String(open.id)} compact />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
