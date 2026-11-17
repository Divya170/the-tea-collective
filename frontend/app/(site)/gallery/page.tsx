import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { ClientNote } from '@/components/site/ClientNote';
import { Em } from '@/components/site/Em';
import { GalleryBrowser } from '@/components/site/GalleryBrowser';
import { SectionHead } from '@/components/site/Heading';
import { Sprig } from '@/components/site/Icons';
import { Photo } from '@/components/site/Photo';
import { copy, getGallery, getPageCopy, getSettings } from '@/lib/api';

export const metadata: Metadata = { title: 'Gallery', description: 'Photos of The Tea Collective’s teas, tea preparation and shop.' };

export default async function GalleryPage({ searchParams }: { searchParams: { category?: string } }) {
  const [pc, gallery, settings] = await Promise.all([getPageCopy(), getGallery(), getSettings()]);
  const hero = copy(pc, 'gallery_hero');
  const cta = copy(pc, 'gallery_cta');
  const placeholders = gallery.items.filter((i) => !i.imageUrl).length;

  return (
    <main id="main">
      <section aria-labelledby="page-h" style={{ position: 'relative', minHeight: 'clamp(520px, 78vh, 820px)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: '#303B32', color: '#FCFAF5' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0 }}><Photo src={hero.imageUrl} alt="" tint="sage" kenBurns noTag priority style={{ position: 'absolute', inset: 0 }} /></div>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(36,44,38,.15) 0%, rgba(36,44,38,.3) 50%, rgba(36,44,38,.82) 100%)' }} />
        {!hero.imageUrl && <p className="ph-tag" style={{ top: 22, bottom: 'auto', left: 'auto', right: 'clamp(20px,5vw,72px)' }}>Photo placeholder · {hero.alt}</p>}
        <div className="wrap" style={{ position: 'relative', paddingTop: 48, paddingBottom: 'clamp(56px, 7vw, 96px)' }}>
          <Breadcrumbs current="Gallery" light />
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 28, marginTop: 'clamp(36px, 6vw, 80px)' }}>
            <h1 id="page-h" className="disp reveal" style={{ fontSize: 'clamp(56px, 8.4vw, 136px)', maxWidth: '11ch', color: '#FCFAF5' }}><Em text={hero.title} onDark /></h1>
            <a className="tlink reveal-2" href="#gal-h" style={{ color: '#FCFAF5' }}>Browse the gallery <span className="arr" aria-hidden="true">↓</span></a>
          </div>
        </div>
      </section>

      <section aria-labelledby="gal-h" style={{ padding: 'clamp(64px, 8vw, 112px) 0 clamp(88px, 11vw, 152px)' }}>
        <div className="wrap">
          <div className="g12" style={{ alignItems: 'end' }}>
            <div style={{ gridColumn: 'span 7' }}><SectionHead id="gal-h" eyebrow="The collection" title="Leaves, cups *& quiet corners.*" /></div>
            {placeholders > 0 && <ClientNote note={hero.clientNote} style={{ gridColumn: '8 / span 5' }} />}
          </div>
          <GalleryBrowser items={gallery.items} categories={gallery.categories} initialCategory={searchParams?.category} />
        </div>
      </section>

      <section aria-labelledby="cta-h" className="oat" style={{ padding: 'clamp(80px, 10vw, 140px) 0', position: 'relative', overflow: 'hidden' }}>
        <Sprig size={360} color="#806B54" style={{ left: -60, bottom: -70, opacity: 0.3 }} />
        <div className="wrap split" style={{ position: 'relative' }}>
          <SectionHead id="cta-h" eyebrow={cta.eyebrow} title={cta.title} size="clamp(42px, 5vw, 78px)" />
          <div>
            <p className="lead" style={{ color: '#4E4A3E' }}>{settings.fullAddress}</p>
            <p className="hint" style={{ marginTop: 8 }}>{settings.hoursVerified && settings.openStatus ? settings.openStatus.label : 'Contact us for current store hours.'}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
              <a className="btn" href={settings.directionsUrl} target="_blank" rel="noopener noreferrer">Find Our Shop <span className="arr" aria-hidden="true">↗</span><span className="sr"> (opens Google Maps directions in a new tab)</span></a>
              <Link className="btn btn-ghost" href="/contact">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
