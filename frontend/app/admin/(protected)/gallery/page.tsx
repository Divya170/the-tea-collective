'use client';

import { EntityManager } from '@/components/admin/EntityManager';
import { mediaUrl } from '@/lib/api';
import { TINT_OPTIONS } from '@/lib/admin-options';

const CATS = ['Tea Products', 'Tea Preparation', 'Shop Interior', 'Tea Details'].map((c) => ({ value: c, label: c }));

export default function GalleryAdmin() {
  return (
    <EntityManager
      title="Gallery"
      singular="Photo"
      subtitle="Photos on the Gallery page, the homepage preview and the About page's fading photo panel. Items without an uploaded photo show as labelled placeholders. Use genuine photographs of The Tea Collective only — never stock or generated images presented as the shop."
      endpoint="/admin/gallery"
      searchPlaceholder="Search photo titles…"
      filters={[{ name: 'category', label: 'Category', options: CATS }]}
      defaults={{ title: '', category: 'Tea Products', alt: '', rows: 2, cols: 1, tint: 'linen', onAbout: false, featuredOnHome: false, published: true }}
      fields={[
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'category', label: 'Category', type: 'select', options: CATS, required: true, help: 'Only categories that contain photos appear as filters on the site.' },
        { name: 'alt', label: 'Photo description (alt text)', type: 'text', help: 'Describe what the photo shows for screen-reader users.' },
        { name: 'rows', label: 'Tile height (1–3 rows)', type: 'number' },
        { name: 'cols', label: 'Tile width (1–2 columns)', type: 'number' },
        { name: 'tint', label: 'Placeholder tint', type: 'select', options: TINT_OPTIONS, help: 'Only used while no photo is uploaded.' },
        { name: 'featuredOnHome', label: 'Show in the homepage gallery preview', type: 'boolean', help: 'The first five by display order are used.' },
        { name: 'onAbout', label: 'Show in the About page photo panel', type: 'boolean', help: 'These photos slowly fade into one another beside “Our approach to tea”.' },
        { name: 'sortOrder', label: 'Display order', type: 'number' },
        { name: 'published', label: 'Published', type: 'boolean' },
      ]}
      columns={[
        { label: 'Photo', render: (r) => (r.imageUrl ? <img className="thumb" src={mediaUrl(r.imageUrl) ?? ''} alt="" /> : <div className="thumb-ph" />) }, // eslint-disable-line @next/next/no-img-element
        { label: 'Title', render: (r) => <><strong>{r.title}</strong>{!r.imageUrl && <> <span className="pill pill-todo">Placeholder</span></>}</> },
        { label: 'Category', render: (r) => r.category },
        { label: 'Home / About', render: (r) => [r.featuredOnHome && 'Home', r.onAbout && 'About'].filter(Boolean).join(' · ') || '—' },
        { label: 'Status', render: (r) => <span className={`pill ${r.published ? 'pill-on' : 'pill-off'}`}>{r.published ? 'Published' : 'Hidden'}</span> },
      ]}
      image={{ getUrl: (r) => r.imageUrl, hint: 'JPG, PNG, WebP or AVIF, up to 8 MB. Genuine photographs of the shop, its teas and teaware only.' }}
      emptyText="No gallery photos yet."
      rowLabel={(r) => r.title}
    />
  );
}
