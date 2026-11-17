import Link from 'next/link';
import { ClientNote } from '@/components/site/ClientNote';
import { Em } from '@/components/site/Em';
import { SectionHead } from '@/components/site/Heading';
import { HeroSlideshow } from '@/components/site/HeroSlideshow';
import { Icon, Sprig } from '@/components/site/Icons';
import { ParallaxSection } from '@/components/site/Parallax';
import { Photo } from '@/components/site/Photo';
import { copy, getCollection, getContent, getFeatured, getGalleryHome, getPageCopy, getSettings } from '@/lib/api';
import type { Product, ProductCategory } from '@/lib/types';

/** The design's uneven category grid: positions for up to five tiles (more wrap onto extra rows). */
const TILE = [
  { gridColumn: '1 / span 5', gridRow: '1 / span 2', big: true },
  { gridColumn: '6 / span 4', gridRow: '1 / span 1' },
  { gridColumn: '10 / span 3', gridRow: '1 / span 1' },
  { gridColumn: '6 / span 3', gridRow: '2 / span 1' },
  { gridColumn: '9 / span 4', gridRow: '2 / span 1' },
];
const GAL = [
  { gridColumn: '1 / span 5', gridRow: '1 / span 2' },
  { gridColumn: '6 / span 4', gridRow: '1 / span 1' },
  { gridColumn: '10 / span 3', gridRow: '1 / span 2' },
  { gridColumn: '6 / span 2', gridRow: '2 / span 1' },
  { gridColumn: '8 / span 2', gridRow: '2 / span 1' },
];

function TeaMeta({ p, cat }: { p: Product; cat?: ProductCategory }) {
  return <p className="label">{cat?.name}{p.isSample && <span className="sample" style={{ marginLeft: 8 }}>Sample</span>}</p>;
}

export default async function HomePage() {
  const [settings, pc, slides, collection, featured, philosophy, gallery] = await Promise.all([
    getSettings(), getPageCopy(), getContent('hero_slide'), getCollection(), getFeatured(4), getContent('philosophy_item'), getGalleryHome(),
  ]);
  const hero = copy(pc, 'home_hero');
  const intro = copy(pc, 'home_intro');
  const cols = copy(pc, 'home_collections');
  const prods = copy(pc, 'home_products');
  const exp = copy(pc, 'home_experience');
  const phil = copy(pc, 'home_philosophy');
  const gal = copy(pc, 'home_gallery');
  const visit = copy(pc, 'home_visit');
  const cats = collection.categories;
  const catOf = (p: Product) => collection.allCategories.find((c) => c.id === p.categoryId);
  const [lead, ...rest] = featured;
  const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
  const philIcons = ['leaf', 'cup', 'sun', 'compass'];

  return (
    <main id="main">
      <HeroSlideshow slides={slides} autoplay={settings.heroAutoplay} intervalSeconds={settings.heroIntervalSeconds}>
        <div className="wrap" style={{ position: 'relative', paddingTop: 120, paddingBottom: 'clamp(88px, 11vw, 140px)' }}>
          {hero.eyebrow && <p className="eyebrow light reveal">{hero.eyebrow}</p>}
          <h1 className="disp reveal-2" style={{ marginTop: 24, fontSize: 'clamp(58px, 8.8vw, 148px)', maxWidth: '10ch', color: '#FCFAF5' }}><Em text={hero.title} onDark /></h1>
          {hero.body && <p className="reveal-3" style={{ maxWidth: 500, marginTop: 28, fontSize: 'clamp(16px, 1.3vw, 19px)', lineHeight: 1.75, color: '#E3E6DC' }}>{hero.body}</p>}
          <div className="reveal-3" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 38 }}>
            <Link className="btn btn-light" href="/collection">Explore Our Teas <span className="arr" aria-hidden="true">→</span></Link>
            <Link className="btn btn-ghost-light" href="/about">Discover Our Story</Link>
          </div>
        </div>
      </HeroSlideshow>

      <section aria-labelledby="intro-h" className="section" style={{ position: 'relative' }}>
        <div className="wrap split" style={{ gridTemplateColumns: 'minmax(0, 6fr) minmax(0, 5fr)' }}>
          <div style={{ position: 'relative', padding: '0 clamp(40px, 7vw, 110px) clamp(40px, 6vw, 90px) 0' }}>
            <Photo src={intro.imageUrl} alt={intro.alt || 'Tea being enjoyed by a sunlit window'} tint="oat" style={{ aspectRatio: '4 / 5' }} />
            <Photo alt="" label="Loose leaves in a ceramic dish" shortTag tint="sage" style={{ position: 'absolute', right: 0, bottom: 0, width: '46%', aspectRatio: '1 / 1', border: '10px solid #F7F3E9' }} />
          </div>
          <div style={{ maxWidth: 520 }}>
            <SectionHead id="intro-h" eyebrow={intro.eyebrow} title={intro.title} />
            {intro.body && <p className="lead" style={{ marginTop: 26 }}>{intro.body}</p>}
            <ClientNote note={intro.clientNote} style={{ marginTop: 24 }} />
            <Link className="tlink" href="/about" style={{ marginTop: 28 }}>Get to Know Us <span className="arr" aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      {cats.length > 0 && (
        <section aria-labelledby="cats-h" style={{ padding: '0 0 clamp(88px, 11vw, 160px)' }}>
          <div className="wrap">
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, marginBottom: 'clamp(36px, 5vw, 60px)' }}>
              <SectionHead id="cats-h" eyebrow={cols.eyebrow} title={cols.title} />
              {cols.clientNote && <p className="hint" style={{ maxWidth: 380 }}>{cols.clientNote}</p>}
            </div>
            <div className="cat-grid" style={cats.length > 5 ? { gridTemplateRows: 'none', gridAutoRows: 'clamp(260px,24vw,360px)' } : undefined}>
              {cats.map((c, i) => {
                const pos = cats.length <= 5 ? TILE[i] : undefined;
                const big = i === 0;
                return (
                  <Link key={c.id} className="cat-tile zoom-host" href={`/collection?category=${c.slug}`} aria-label={`Explore ${c.name}`} style={pos ? { gridColumn: pos.gridColumn, gridRow: pos.gridRow } : { gridColumn: 'span 4' }}>
                    <Photo src={c.imageUrl} alt={c.imageAlt || c.name} label={c.name} tint={c.tint} zoom style={{ position: 'absolute', inset: 0 }} />
                    <div className="cat-cap">
                      <p className="label" style={{ color: '#E8DDC9' }}>Category · {c.count} {c.count === 1 ? 'tea' : 'teas'}</p>
                      <p className="serif" style={{ fontSize: big ? 'clamp(38px,3.6vw,54px)' : 'clamp(28px,2.4vw,36px)', lineHeight: 1, marginTop: 8 }}>{c.name}</p>
                      {big && c.blurb && <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.6, color: '#E8DDC9', maxWidth: 340 }}>{c.blurb}</p>}
                      <span className="cat-more">Explore category <span className="arr" aria-hidden="true">→</span></span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {lead && (
        <section aria-labelledby="pop-h" className="oat" style={{ padding: 'clamp(88px, 11vw, 152px) 0' }}>
          <div className="wrap">
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, marginBottom: 'clamp(36px, 5vw, 60px)' }}>
              <SectionHead id="pop-h" eyebrow={prods.eyebrow} title={prods.title} />
              <Link className="btn btn-ghost" href="/collection">Explore All Teas <span className="arr" aria-hidden="true">→</span></Link>
            </div>
            <div className="g12" style={{ alignItems: 'start' }}>
              <article aria-labelledby={`pop-${lead.id}`} style={{ gridColumn: 'span 6' }}>
                <Link className="zoom-host" href={`/collection?category=${catOf(lead)?.slug ?? ''}#tea-${lead.id}`} tabIndex={-1} aria-hidden="true" style={{ display: 'block', position: 'relative' }}>
                  <Photo src={lead.imageUrl} alt={lead.imageAlt || lead.name} tint={lead.tint} zoom style={{ aspectRatio: '4 / 5' }} />
                </Link>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, marginTop: 24 }}>
                  <div style={{ maxWidth: 440 }}>
                    <TeaMeta p={lead} cat={catOf(lead)} />
                    <h3 id={`pop-${lead.id}`} className="disp" style={{ marginTop: 12, fontSize: 'clamp(34px, 3.4vw, 48px)' }}>{lead.name}</h3>
                    {lead.description && <p className="hint" style={{ marginTop: 10 }}>{lead.description}</p>}
                  </div>
                  <Link className="btn" href={`/contact?product=${lead.id}`} aria-label={`Inquire about ${lead.name}`}>Inquire <span className="arr" aria-hidden="true">→</span></Link>
                </div>
              </article>
              <div style={{ gridColumn: '8 / span 5', display: 'flex', flexDirection: 'column', gap: 28, paddingTop: 'clamp(0px, 6vw, 96px)' }}>
                {rest.map((p) => {
                  const c = catOf(p);
                  return (
                    <article key={p.id} className="pop-row" aria-labelledby={`pop-${p.id}`}>
                      <Link className="zoom-host" href={`/collection?category=${c?.slug ?? ''}#tea-${p.id}`} tabIndex={-1} aria-hidden="true" style={{ display: 'block', position: 'relative' }}>
                        <Photo src={p.imageUrl} alt={p.imageAlt || p.name} shortTag tint={p.tint} zoom style={{ aspectRatio: '1 / 1' }} />
                      </Link>
                      <div>
                        <TeaMeta p={p} cat={c} />
                        <h3 id={`pop-${p.id}`} className="h3" style={{ marginTop: 10 }}>{p.name}</h3>
                        {p.description && <p className="hint" style={{ marginTop: 8 }}>{p.description}</p>}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 22px', marginTop: 8 }}>
                          <Link className="tlink" href={`/collection?category=${c?.slug ?? ''}#tea-${p.id}`}>View details <span className="arr" aria-hidden="true">→</span></Link>
                          <Link className="tlink" href={`/contact?product=${p.id}`} aria-label={`Inquire about ${p.name}`}>Inquire</Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
            <ClientNote note={featured.some((p) => p.isSample) ? prods.clientNote : null} style={{ marginTop: 40 }} />
          </div>
        </section>
      )}

      <ParallaxSection aria-labelledby="exp-h" style={{ position: 'relative', minHeight: 'clamp(560px, 80vh, 820px)', display: 'flex', alignItems: 'center', color: '#FCFAF5', overflow: 'hidden', background: '#303B32' }}
        background={<Photo src={exp.imageUrl} alt="" tint="brown" noTag style={{ position: 'absolute', inset: 0 }} />}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(36,44,38,.15) 0%, rgba(36,44,38,.55) 50%, rgba(36,44,38,.88) 100%)' }} />
        {!exp.imageUrl && <p className="ph-tag" style={{ top: 22, bottom: 'auto' }}>Photo placeholder · {exp.alt}</p>}
        <div className="wrap" style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', paddingTop: 80, paddingBottom: 80 }}>
          <div style={{ maxWidth: 560 }}>
            <SectionHead id="exp-h" eyebrow={exp.eyebrow} title={exp.title} onDark />
            {exp.body && <p style={{ marginTop: 22, fontSize: 17, lineHeight: 1.75, color: '#E3E6DC' }}>{exp.body}</p>}
            <ul className="exp-facts" style={{ listStyle: 'none', margin: '30px 0 0', padding: '22px 0 0', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 18, borderTop: '1px solid rgba(247,243,233,.25)' }}>
              {[['thermo', 'Water temperature'], ['timer', 'Steeping time'], ['spoon', 'Leaf to water']].map(([ic, l]) => (
                <li key={l}><span style={{ color: '#E8DDC9' }}><Icon name={ic} size={26} /></span><p style={{ marginTop: 10, fontSize: 14, lineHeight: 1.5, color: '#E3E6DC' }}>{l}</p></li>
              ))}
            </ul>
            <Link className="btn btn-light" href="/experience" style={{ marginTop: 34 }}>Explore the Tea Experience <span className="arr" aria-hidden="true">→</span></Link>
          </div>
        </div>
      </ParallaxSection>

      {philosophy.length > 0 && (
        <section aria-labelledby="phil-h" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
          <Sprig size={420} color="#A8B5A0" style={{ left: -120, bottom: -60, opacity: 0.45 }} />
          <div className="wrap g12" style={{ position: 'relative', alignItems: 'start' }}>
            <div style={{ gridColumn: 'span 4' }}>
              <SectionHead id="phil-h" eyebrow={phil.eyebrow} title={phil.title} />
              <ClientNote note={phil.clientNote} tag="Client to confirm" style={{ marginTop: 24 }} />
            </div>
            <ol className="phil-list" style={{ gridColumn: '6 / span 7' }}>
              {philosophy.map((v, i) => (
                <li key={v.id} className="phil-item">
                  <span className="phil-ico"><Icon name={v.fields?.icon || philIcons[i % 4]} size={26} /></span>
                  <p className="serif" style={{ fontSize: 20, color: '#806B54', fontStyle: 'italic' }} aria-hidden="true">{romans[i] ?? i + 1}</p>
                  <h3 className="h3" style={{ marginTop: 6 }}>{v.title}</h3>
                  {v.body && <p className="hint" style={{ marginTop: 10, fontSize: 15, maxWidth: 330 }}>{v.body}</p>}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {gallery.length > 0 && (
        <section aria-labelledby="gal-h" style={{ padding: `${philosophy.length ? 0 : 'clamp(88px, 11vw, 152px)'} 0 clamp(88px, 11vw, 152px)` }}>
          <div className="wrap">
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, marginBottom: 'clamp(32px, 4vw, 52px)' }}>
              <SectionHead id="gal-h" eyebrow={gal.eyebrow} title={gal.title} />
              <Link className="tlink" href="/gallery">View Gallery <span className="arr" aria-hidden="true">→</span></Link>
            </div>
            <div className="home-gal">
              {gallery.slice(0, 5).map((g, i) => (
                <Link key={g.id} className="zoom-host gal-tile" href={`/gallery?category=${encodeURIComponent(g.category)}`} aria-label={`Open gallery: ${g.title}`} style={GAL[i]}>
                  <Photo src={g.imageUrl} alt={g.alt || g.title} label={`${g.category} · ${g.title}`} shortTag tint={g.tint} zoom style={{ position: 'absolute', inset: 0 }} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="visit-h" className="on-forest" style={{ padding: 'clamp(88px, 11vw, 160px) 0', position: 'relative', overflow: 'hidden' }}>
        <Sprig size={440} color="#A8B5A0" style={{ right: -90, top: -50, opacity: 0.3 }} />
        <div className="wrap g12" style={{ position: 'relative', alignItems: 'end' }}>
          <div style={{ gridColumn: 'span 7' }}>
            {visit.eyebrow && <p className="eyebrow light">{visit.eyebrow}</p>}
            <h2 id="visit-h" className="disp" style={{ marginTop: 18, fontSize: 'clamp(50px, 6.8vw, 112px)', color: '#FCFAF5' }}><Em text={visit.title} onDark /></h2>
          </div>
          <div style={{ gridColumn: '9 / span 4', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <a href={settings.mapsUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', gap: 14, textDecoration: 'none', lineHeight: 1.6 }}>
              <span style={{ color: '#E8DDC9', flex: 'none' }}><Icon name="pin" size={22} /></span>
              <span>{settings.addressLine1}<br />{settings.city}, {settings.region} {settings.postalCode}<span className="sr"> (opens Google Maps in a new tab)</span></span>
            </a>
            {settings.phoneHref && <a href={settings.phoneHref} style={{ display: 'flex', gap: 14, textDecoration: 'none', alignItems: 'center', minHeight: 44 }}><span style={{ color: '#E8DDC9', flex: 'none' }}><Icon name="phone" size={22} /></span>{settings.phone}</a>}
            {settings.emailHref && <a href={settings.emailHref} style={{ display: 'flex', gap: 14, textDecoration: 'none', alignItems: 'center', minHeight: 44, wordBreak: 'break-all' }}><span style={{ color: '#E8DDC9', flex: 'none' }}><Icon name="mail" size={22} /></span>{settings.email}</a>}
            <p style={{ display: 'flex', gap: 14, color: '#E3E6DC', fontSize: 15 }}>
              <span style={{ color: '#E8DDC9', flex: 'none' }}><Icon name="clock" size={22} /></span>
              {settings.hoursVerified && settings.openStatus ? settings.openStatus.label : 'Contact us for current store hours.'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
              <a className="btn btn-light" href={settings.directionsUrl} target="_blank" rel="noopener noreferrer">Visit Our Shop <span className="arr" aria-hidden="true">↗</span><span className="sr"> (directions open in a new tab)</span></a>
              <Link className="btn btn-ghost-light" href="/contact">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
