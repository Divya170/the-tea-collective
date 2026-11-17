'use client';

import { useEffect, useState } from 'react';
import { EntityManager } from '@/components/admin/EntityManager';
import { ErrorPanel, TableSkeleton } from '@/components/admin/ui';
import { mediaUrl } from '@/lib/api';
import { adminFetch } from '@/lib/admin-api';
import type { ProductCategory } from '@/lib/types';
import { TINT_OPTIONS } from '@/lib/admin-options';

export default function TeasAdmin() {
  const [cats, setCats] = useState<ProductCategory[] | null>(null);
  const [err, setErr] = useState('');
  const load = () => { setErr(''); adminFetch<ProductCategory[]>('/admin/product-categories').then(setCats).catch((e) => setErr(e.message)); };
  useEffect(load, []);
  if (err) return <ErrorPanel message={err} onRetry={load} />;
  if (!cats) return <TableSkeleton />;
  const CAT_OPTS = cats.map((c) => ({ value: String(c.id), label: c.name }));

  return (
    <EntityManager
      title="Teas"
      singular="Tea"
      subtitle="The tea collection. No prices or checkout: visitors inquire instead. Origin, flavour profile and ingredients appear on the site only when you fill them in — leave them blank rather than guessing. Turn off “Sample” once a tea is real."
      endpoint="/admin/products"
      searchPlaceholder="Search names, descriptions, origins or flavours…"
      filters={[
        { name: 'categoryId', label: 'Category', options: CAT_OPTS },
        { name: 'status', label: 'Status', options: [{ value: 'published', label: 'Published' }, { value: 'hidden', label: 'Hidden' }, { value: 'featured', label: 'Popular (homepage)' }, { value: 'sample', label: 'Samples' }] },
      ]}
      defaults={{ categoryId: CAT_OPTS[0]?.value ?? '', name: '', description: '', origin: '', flavourProfile: '', ingredients: '', imageAlt: '', tint: '', featured: false, isSample: false, published: true }}
      fields={[
        { name: 'name', label: 'Tea name', type: 'text', required: true },
        { name: 'categoryId', label: 'Category', type: 'select', options: CAT_OPTS, required: true, numeric: true },
        { name: 'description', label: 'Short description', type: 'textarea' },
        { name: 'origin', label: 'Origin (only if verified)', type: 'text', nullable: true },
        { name: 'flavourProfile', label: 'Flavour profile (only if supplied)', type: 'text', nullable: true, help: 'e.g. “Floral · honeyed · light”.' },
        { name: 'ingredients', label: 'Ingredients (blends and herbals, only if supplied)', type: 'textarea', nullable: true },
        { name: 'imageAlt', label: 'Photo description (alt text)', type: 'text' },
        { name: 'tint', label: 'Placeholder tint', type: 'select', options: [{ value: '', label: 'Same as category' }, ...TINT_OPTIONS], nullable: true },
        { name: 'featured', label: 'Show in “Popular teas” on the homepage', type: 'boolean', help: 'The first four by display order are shown.' },
        { name: 'isSample', label: 'Sample / placeholder tea', type: 'boolean', help: 'Shows a “Sample” tag on the site.' },
        { name: 'sortOrder', label: 'Display order', type: 'number' },
        { name: 'published', label: 'Published', type: 'boolean' },
      ]}
      columns={[
        { label: 'Photo', render: (r) => (r.imageUrl ? <img className="thumb" src={mediaUrl(r.imageUrl) ?? ''} alt="" /> : <div className="thumb-ph" />) }, // eslint-disable-line @next/next/no-img-element
        { label: 'Tea', render: (r) => <><strong>{r.name}</strong>{r.isSample && <> <span className="pill pill-todo">Sample</span></>}{r.featured && <> <span className="pill pill-on">Popular</span></>}</> },
        { label: 'Category', render: (r) => r.category?.name ?? '—' },
        { label: 'Origin / flavour', render: (r) => [r.origin, r.flavourProfile].filter(Boolean).join(' · ') || <span className="hint">Not supplied</span> },
        { label: 'Status', render: (r) => <span className={`pill ${r.published ? 'pill-on' : 'pill-off'}`}>{r.published ? 'Published' : 'Hidden'}</span> },
      ]}
      image={{ getUrl: (r) => r.imageUrl, hint: 'JPG, PNG, WebP or AVIF, up to 8 MB. Use genuine photos of this tea.' }}
      emptyText={cats.length ? 'No teas yet. Add the first one.' : 'Add a tea category first.'}
      rowLabel={(r) => r.name}
    />
  );
}
