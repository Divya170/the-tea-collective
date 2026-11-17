'use client';

import { EntityManager } from '@/components/admin/EntityManager';
import { mediaUrl } from '@/lib/api';
import { ICON_OPTIONS, TINT_OPTIONS } from '@/lib/admin-options';

const TYPES = [
  { value: 'page_copy', label: 'Page copy' },
  { value: 'hero_slide', label: 'Homepage hero photo' },
  { value: 'philosophy_item', label: 'Home: philosophy value' },
  { value: 'about_theme', label: 'About: philosophy theme' },
  { value: 'approach_item', label: 'About: approach point' },
  { value: 'tea_variety', label: 'Experience: tea variety & brewing guide' },
  { value: 'brew_step', label: 'Experience: brewing step' },
];
const TINTS = [{ value: '', label: 'Default' }, ...TINT_OPTIONS];
const typeLabel = (t: string) => TYPES.find((x) => x.value === t)?.label ?? t;
/** Page-copy blocks whose section shows a photo. */
const IMAGE_KEYS = ['home_intro', 'home_experience', 'collection_hero', 'collection_cta', 'about_hero', 'about_story', 'experience_hero', 'gallery_hero'];
const PHOTO_TYPES = ['hero_slide', 'tea_variety'];
const is = (...t: string[]) => (v: Record<string, any>) => t.includes(v.type); // eslint-disable-line @typescript-eslint/no-explicit-any

export default function ContentAdmin() {
  return (
    <EntityManager
      title="Page content"
      singular="Content block"
      subtitle="Headings, paragraphs, hero photos and editorial sections across the site. Wrap words in *asterisks* to show them in the italic sage accent. Clear a “Client to supply” note once the real copy is approved. Brewing figures are general guidance; keep the disclaimer unless the shop confirms its own."
      endpoint="/admin/content"
      searchPlaceholder="Search titles, text or keys…"
      filters={[{ name: 'type', label: 'Type', options: TYPES }]}
      defaults={{ type: 'philosophy_item', key: '', title: '', body: '', fields: { eyebrow: '', clientNote: '', alt: '', tint: '', icon: 'leaf', slug: '', taste: '', temp: '', tempF: '', time: '', timeNote: '', amount: '', seconds: '180', method: '' }, published: true }}
      fields={[
        { name: 'type', label: 'Type', type: 'select', options: TYPES, createOnly: true, required: true },
        { name: 'key', label: 'Key', type: 'text', nullable: true, createOnly: true, showIf: is('page_copy'), help: 'Page copy is looked up by key (e.g. home_hero). Existing keys are already created.' },
        { name: 'title', label: 'Title / heading', type: 'textarea', required: true, help: 'Wrap words in *asterisks* for the accent, e.g. “Find Your Moment *in Every Cup.*”' },
        { name: 'body', label: 'Body text', type: 'textarea', nullable: true },
        { name: 'fields.eyebrow', label: 'Small label above the heading', type: 'text', showIf: is('page_copy') },
        { name: 'fields.extra', label: 'Second paragraph', type: 'textarea', showIf: (v) => v.key === 'about_story' },
        { name: 'fields.disclaimer', label: 'Brewing guidance disclaimer', type: 'textarea', showIf: (v) => v.key === 'experience_tool' },
        { name: 'fields.icon', label: 'Icon', type: 'select', options: ICON_OPTIONS, showIf: is('about_theme', 'brew_step', 'philosophy_item') },
        { name: 'fields.slug', label: 'Matching tea category link (slug)', type: 'text', showIf: is('tea_variety'), help: 'e.g. “green”. Links “Explore …” to /collection?category=green when that category has teas.' },
        { name: 'fields.taste', label: 'Typical character', type: 'text', showIf: is('tea_variety') },
        { name: 'fields.temp', label: 'Water temperature (°C)', type: 'text', showIf: is('tea_variety'), help: 'e.g. “70–80°C”.' },
        { name: 'fields.tempF', label: 'Temperature note (°F)', type: 'text', showIf: is('tea_variety') },
        { name: 'fields.time', label: 'Steep time', type: 'text', showIf: is('tea_variety'), help: 'e.g. “2–3 min”.' },
        { name: 'fields.timeNote', label: 'Steep note', type: 'text', showIf: is('tea_variety') },
        { name: 'fields.amount', label: 'Amount per cup', type: 'text', showIf: is('tea_variety') },
        { name: 'fields.seconds', label: 'Default timer (seconds, 30–900)', type: 'text', showIf: is('tea_variety') },
        { name: 'fields.method', label: 'Preparation method', type: 'textarea', showIf: is('tea_variety') },
        { name: 'fields.alt', label: 'Photo description (alt text)', type: 'text', showIf: (v) => PHOTO_TYPES.includes(v.type) || IMAGE_KEYS.includes(v.key) },
        { name: 'fields.tint', label: 'Placeholder tint', type: 'select', options: TINTS, showIf: is('hero_slide', 'tea_variety') },
        { name: 'fields.clientNote', label: '“Client to supply” note', type: 'textarea', help: 'Shown on the site as a dashed placeholder note. Clear it to hide.' },
        { name: 'sortOrder', label: 'Display order', type: 'number' },
        { name: 'published', label: 'Published', type: 'boolean' },
      ]}
      columns={[
        { label: 'Type', render: (r) => typeLabel(r.type) },
        { label: 'Key', render: (r) => (r.key ? <code style={{ fontSize: 12 }}>{r.key}</code> : '—') },
        { label: 'Title', render: (r) => <><span style={{ display: 'block', maxWidth: 420 }}>{String(r.title).slice(0, 90)}</span>{r.fields?.clientNote && <span className="pill pill-todo">Needs content</span>}</> },
        { label: 'Photo', render: (r) => (r.fields?.imageUrl ? <img className="thumb" src={mediaUrl(r.fields.imageUrl) ?? ''} alt="" /> : PHOTO_TYPES.includes(r.type) || IMAGE_KEYS.includes(r.key) ? <div className="thumb-ph" /> : '—') }, // eslint-disable-line @next/next/no-img-element
        { label: 'Status', render: (r) => <span className={`pill ${r.published ? 'pill-on' : 'pill-off'}`}>{r.published ? 'Published' : 'Hidden'}</span> },
      ]}
      image={{ getUrl: (r) => r.fields?.imageUrl, removable: false, hint: 'Used by hero photos, tea varieties and page sections that show a photo. Upload genuine photos of The Tea Collective only.' }}
      emptyText="No content blocks."
      rowLabel={(r) => (r.key ? `${typeLabel(r.type)} · ${r.key}` : `${typeLabel(r.type)} · ${String(r.title).slice(0, 40)}`)}
    />
  );
}
