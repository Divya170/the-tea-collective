import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { CollectionBrowser } from '@/components/site/CollectionBrowser';
import { Em } from '@/components/site/Em';
import { SectionHead } from '@/components/site/Heading';
import { Sprig } from '@/components/site/Icons';
import { Photo } from '@/components/site/Photo';
import { copy, getCollection, getPageCopy, getSettings } from '@/lib/api';

export const metadata: Metadata = { title: 'Tea Collection', description: 'Explore The Tea Collective’s teas by category, and ask about any tea.' };

export default async function CollectionPage({ searchParams }: { searchParams: { category?: string } }) {
  const [pc, data, settings] = await Promise.all([getPageCopy(), getCollection(), getSettings()]);
  const hero = copy(pc, 'collection_hero');
  const cta = copy(pc, 'collection_cta');
  return (
    <main id="main">
      <section aria-labelledby="page-h" style={{ padding: 'clamp(40px, 5vw, 64px) 0 0', position: 'relative', overflow: 'hidden' }}>
        <Sprig size={380} color="#A8B5A0" style={{ right: -80, top: 30, opacity: 0.4 }} />
        <div className="wrap" style={{ position: 'relative' }}>
          <Breadcrumbs current="Tea Collection" />
          <div className="g12" style={{ marginTop: 'clamp(28px, 4vw, 52px)', alignItems: 'end' }}>
            <div style={{ gridColumn: 'span 6', paddingBottom: 'clamp(0px, 3vw, 40px)' }}>
              {hero.eyebrow && <p className="eyebrow reveal">{hero.eyebrow}</p>}
              <h1 id="page-h" className="disp reveal-2" style={{ marginTop: 20, fontSize: 'clamp(56px, 8vw, 128px)' }}><Em text={hero.title} /></h1>
              {hero.body && <p className="lead reveal-3" style={{ marginTop: 24, maxWidth: 460 }}>{hero.body}</p>}
            </div>
            <div className="reveal-3" style={{ gridColumn: '8 / span 5', position: 'relative' }}>
              <Photo src={hero.imageUrl} alt={hero.alt || 'Tea jars and tins on a wooden shelf'} tint="oat" priority style={{ aspectRatio: '4 / 5' }} />
              <Photo alt="" label="Tea leaves" shortTag tint="sage" className="hide-sm" style={{ position: 'absolute', left: '-18%', bottom: '10%', width: '40%', aspectRatio: '3 / 4', border: '8px solid #F7F3E9' }} />
            </div>
          </div>
        </div>
      </section>

      <CollectionBrowser data={data} settings={settings} initialCategory={searchParams?.category} note={hero.clientNote} />

      <section aria-labelledby="cta-h" className="on-forest" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="g12" style={{ gap: 0, alignItems: 'stretch' }}>
          <div style={{ gridColumn: 'span 5', minHeight: 380, position: 'relative' }}>
            <Photo src={cta.imageUrl} alt={cta.alt || 'Steam rising from a cup of tea'} tint="brown" style={{ position: 'absolute', inset: 0 }} />
          </div>
          <div style={{ gridColumn: '6 / span 7', padding: 'clamp(64px, 8vw, 120px) clamp(20px, 6vw, 96px)', position: 'relative' }}>
            <Sprig size={260} color="#A8B5A0" style={{ right: 20, bottom: -30, opacity: 0.3 }} />
            <SectionHead id="cta-h" eyebrow={cta.eyebrow} title={cta.title} onDark />
            {cta.body && <p className="lead" style={{ marginTop: 18, maxWidth: 480 }}>{cta.body}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}>
              <Link className="btn btn-light" href="/contact?subject=collection">Ask Us About Our Teas <span className="arr" aria-hidden="true">→</span></Link>
              <Link className="btn btn-ghost-light" href="/experience">Learn How to Brew</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
