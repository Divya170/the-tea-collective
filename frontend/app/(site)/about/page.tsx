import type { Metadata } from 'next';
import Link from 'next/link';
import { AboutFader } from '@/components/site/AboutFader';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { ClientNote } from '@/components/site/ClientNote';
import { Em } from '@/components/site/Em';
import { SectionHead } from '@/components/site/Heading';
import { Icon, Sprig } from '@/components/site/Icons';
import { Photo } from '@/components/site/Photo';
import { copy, getContent, getGalleryAbout, getPageCopy } from '@/lib/api';

export const metadata: Metadata = { title: 'About', description: 'The philosophy behind The Tea Collective, a boutique tea shop in Santa Ana, California.' };

export default async function AboutPage() {
  const [pc, themes, approach, photos] = await Promise.all([getPageCopy(), getContent('about_theme'), getContent('approach_item'), getGalleryAbout()]);
  const hero = copy(pc, 'about_hero');
  const story = copy(pc, 'about_story');
  const phil = copy(pc, 'about_philosophy');
  const appr = copy(pc, 'about_approach');
  const cta = copy(pc, 'about_cta');

  return (
    <main id="main">
      <section aria-labelledby="page-h" style={{ position: 'relative', minHeight: 'clamp(560px, 82vh, 840px)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: '#303B32', color: '#FCFAF5' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0 }}><Photo src={hero.imageUrl} alt="" tint="brown" kenBurns noTag priority style={{ position: 'absolute', inset: 0 }} /></div>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(36,44,38,.2) 0%, rgba(36,44,38,.35) 45%, rgba(36,44,38,.85) 100%)' }} />
        {!hero.imageUrl && <p className="ph-tag" style={{ top: 22, bottom: 'auto', left: 'auto', right: 'clamp(20px,5vw,72px)' }}>Photo placeholder · {hero.alt}</p>}
        <div className="wrap" style={{ position: 'relative', paddingTop: 48, paddingBottom: 'clamp(64px, 8vw, 112px)' }}>
          <Breadcrumbs current="About" light />
          <h1 id="page-h" className="disp reveal" style={{ marginTop: 'clamp(36px, 6vw, 80px)', fontSize: 'clamp(56px, 8.4vw, 140px)', maxWidth: '12ch', color: '#FCFAF5' }}><Em text={hero.title} onDark /></h1>
          {hero.body && <p className="reveal-2" style={{ marginTop: 24, fontSize: 'clamp(17px, 1.4vw, 20px)', color: '#E3E6DC', maxWidth: 440 }}>{hero.body}</p>}
        </div>
      </section>

      <section aria-labelledby="story-h" className="section">
        <div className="wrap g12" style={{ alignItems: 'center' }}>
          <div style={{ gridColumn: 'span 7', position: 'relative' }}>
            <Photo src={story.imageUrl} alt={story.alt || 'Tea leaves and a teacup on a wooden table'} tint="sage" style={{ aspectRatio: '5 / 4' }} />
            <p className="serif" aria-hidden="true" style={{ position: 'absolute', left: 0, bottom: '-0.35em', fontSize: 'clamp(90px, 12vw, 190px)', lineHeight: 1, color: '#E8DDC9', fontStyle: 'italic', mixBlendMode: 'multiply' }}>story</p>
          </div>
          <div style={{ gridColumn: '9 / span 4' }}>
            <SectionHead id="story-h" eyebrow={story.eyebrow} title={story.title} size="clamp(36px, 3.8vw, 56px)" />
            {story.body && <p className="lead" style={{ marginTop: 22 }}>{story.body}</p>}
            {story.fields.extra && <p className="lead" style={{ marginTop: 16 }}>{story.fields.extra}</p>}
            <ClientNote note={story.clientNote} style={{ marginTop: 22 }} />
          </div>
        </div>
      </section>

      {themes.length > 0 && (
        <section aria-labelledby="phil-h" className="oat" style={{ padding: 'clamp(88px, 11vw, 152px) 0', position: 'relative', overflow: 'hidden' }}>
          <Sprig size={440} color="#806B54" style={{ right: -80, bottom: -60, opacity: 0.25 }} />
          <div className="wrap g12" style={{ position: 'relative', alignItems: 'start' }}>
            <div className="ab-sticky" style={{ gridColumn: 'span 4', position: 'sticky', top: 110 }}>
              <SectionHead id="phil-h" eyebrow={phil.eyebrow} title={phil.title} />
              {phil.body && <p className="lead" style={{ marginTop: 20, color: '#4E4A3E' }}>{phil.body}</p>}
              <ClientNote note={phil.clientNote} tag="Client to confirm" style={{ marginTop: 22, background: 'rgba(252,250,245,.5)' }} />
            </div>
            <ol style={{ gridColumn: '6 / span 7', listStyle: 'none', margin: 0, padding: 0 }}>
              {themes.map((t, i) => (
                <li key={t.id} className="ab-phil">
                  <p className="serif ab-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</p>
                  <div>
                    <h3 className="h3" style={{ display: 'flex', alignItems: 'center', gap: 14 }}><span style={{ color: '#465B49' }}><Icon name={t.fields?.icon || 'leaf'} size={26} /></span>{t.title}</h3>
                    {t.body && <p className="hint" style={{ marginTop: 10, fontSize: 15.5, maxWidth: 440 }}>{t.body}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section aria-labelledby="appr-h" className="section">
        <div className="wrap g12" style={{ alignItems: 'center' }}>
          <div style={{ gridColumn: 'span 5' }}>
            <SectionHead id="appr-h" eyebrow={appr.eyebrow} title={appr.title} />
            {appr.body && <p className="lead" style={{ marginTop: 20 }}>{appr.body}</p>}
            {approach.length > 0 && (
              <ul style={{ listStyle: 'none', margin: '28px 0 0', padding: 0, borderBottom: '1px solid #D2C4AB' }}>
                {approach.map((a, i) => (
                  <li key={a.id} style={{ padding: '22px 0', borderTop: '1px solid #D2C4AB' }}>
                    <p className="label" style={{ color: '#9A5A43' }}>{String(i + 1).padStart(2, '0')}</p>
                    <h3 className="h3" style={{ marginTop: 8 }}>{a.title}</h3>
                    {a.body && <p className="hint" style={{ marginTop: 8, fontSize: 15 }}>{a.body}</p>}
                  </li>
                ))}
              </ul>
            )}
            <ClientNote note={appr.clientNote} tag="Client to confirm" style={{ marginTop: 22 }} />
          </div>
          <AboutFader items={photos} />
        </div>
      </section>

      <section aria-labelledby="cta-h" className="on-forest" style={{ padding: 'clamp(88px, 11vw, 160px) 0', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <Sprig size={360} color="#A8B5A0" style={{ left: '4%', top: '10%', opacity: 0.3 }} />
        <div className="wrap" style={{ position: 'relative' }}>
          <h2 id="cta-h" className="disp" style={{ fontSize: 'clamp(48px, 6.4vw, 104px)', maxWidth: '15ch', margin: '0 auto', color: '#FCFAF5' }}><Em text={cta.title} onDark /></h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginTop: 40 }}>
            <Link className="btn btn-light" href="/collection">Explore Our Collection <span className="arr" aria-hidden="true">→</span></Link>
            <Link className="btn btn-ghost-light" href="/contact">Contact Us</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
