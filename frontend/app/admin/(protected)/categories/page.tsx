'use client';

import { EntityManager } from '@/components/admin/EntityManager';
import { mediaUrl } from '@/lib/api';
import { TINT_OPTIONS } from '@/lib/admin-options';

export default function CategoriesAdmin() {
  return (
    <EntityManager
      title="Tea categories"
      singular="Category"
      subtitle="Categories used for the collection filters, the homepage category grid and the Tea Experience links. A category appears on the site only while it is published and has at least one published tea. Its link (/collection?category=…) is fixed when it is created."
      endpoint="/admin/product-categories"
      searchPlaceholder="Search categories…"
      defaults={{ name: '', blurb: '', imageAlt: '', tint: 'linen', published: true }}
      fields={[
        { name: 'name', label: 'Category name', type: 'text', required: true },
        { name: 'blurb', label: 'Short description', type: 'textarea', help: 'One line shown on the homepage tile and above the filtered collection, e.g. “Fresh, grassy and gently vegetal.”' },
        { name: 'imageAlt', label: 'Photo description (alt text)', type: 'text' },
        { name: 'tint', label: 'Placeholder tint', type: 'select', options: TINT_OPTIONS, help: 'Only used while no photo is uploaded.' },
        { name: 'sortOrder', label: 'Display order', type: 'number' },
        { name: 'published', label: 'Published', type: 'boolean' },
      ]}
      columns={[
        { label: 'Photo', render: (r) => (r.imageUrl ? <img className="thumb" src={mediaUrl(r.imageUrl) ?? ''} alt="" /> : <div className="thumb-ph" />) }, // eslint-disable-line @next/next/no-img-element
        { label: 'Category', render: (r) => <><strong>{r.name}</strong><br /><code style={{ fontSize: 12 }}>?category={r.slug}</code></> },
        { label: 'Teas', render: (r) => r.productCount ?? 0 },
        { label: 'Status', render: (r) => <span className={`pill ${r.published ? 'pill-on' : 'pill-off'}`}>{r.published ? (r.productCount ? 'Published' : 'Published · hidden until it has teas') : 'Hidden'}</span> },
      ]}
      image={{ getUrl: (r) => r.imageUrl }}
      emptyText="No categories yet. Add one before adding teas."
      rowLabel={(r) => r.name}
    />
  );
}
