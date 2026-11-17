import type { Metadata } from 'next';
import Link from 'next/link';
import { BrewingGuide } from '@/components/site/BrewingGuide';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { ClientNote } from '@/components/site/ClientNote';
import { Em } from '@/components/site/Em';
import { SectionHead } from '@/components/site/Heading';
import { Icon, Sprig } from '@/components/site/Icons';
import { RitualCollage } from '@/components/site/Parallax';
import { Photo } from '@/components/site/Photo';
import { copy, getCollection, getContent, getPageCopy } from '@/lib/api';

export const metadata: Metadata = { title: 'Tea Experience', description: 'Tea varieties, a step-by-step brewing guide and an interactive steeping timer from The Tea Collective.' };

export default async function ExperiencePage() {
  const [pc, varieties, steps, collection] = await Promise.all([getPageCopy(), getContent('tea_variety'), getContent('brew_step'), getCollection()]);
  const hero = copy(pc, 'experience_hero');
  const vars = copy(pc, 'experience_varieties');
  const st = copy(pc, 'experience_steps');
  const tool = copy(pc, 'experience_tool');
  const rit = copy(pc, 'experience_ritual');
  const cta = copy(pc, 'experience_cta');
  // A variety links to the collection only when that category actually has teas.
  const liveSlugs = new Set(collection.categories.map((c) => c.slug));
  const stepTints = ['sage', 'linen', 'brown'];

  return (
    <main id="main">
      <section aria-labelledby="page-h" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(40px, 5vw, 64px) 0 clamp(72px, 9vw, 120px)' }}>
        <Sprig size={380} color="#A8B5A0" style={{ left: -90, top: 120, opacity: 0.45 }} />
        <div className="wrap" style={{ position: 'relative' }}>
          <Breadcrumbs current="Tea Experience" />
          <div className="g12" style={{ marginTop: 'clamp(32px, 4vw, 56px)', alignItems: 'end' }}>
            <div style={{ gridColumn: 'span 6' }}>
              {hero.eyebrow && <p className="eyebrow reveal">{hero.eyebrow}</p>}
              <h1 id="page-h" className="disp reveal" style={{ marginTop: 22, fontSize: 'clamp(56px, 7.8vw, 128px)' }}><Em text={hero.title} /></h1>
              {hero.body && <p className="lead reveal-2" style={{ marginTop: 26, maxWidth: 460 }}>{hero.body}</p>}
              <div className="reveal-3" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 34 }}>
                <a className="btn" href="#brew-tool">Try the Brewing Guide <span className="arr" aria-hidden="true">↓</span></a>
                <a className="btn btn-ghost" href="#varieties-h">Explore Tea Varieties</a>
              </div>
            </div>
            <div className="reveal-2" style={{ gridColumn: '7 / span 6', position: 'relative' }}>
              <Photo src={hero.imageUrl} alt={hero.alt || 'Hot water poured over loose leaves'} tint="brown" kenBurns priority style={{ aspectRatio: '4 / 5', marginLeft: '18%' }} />
              <div className="ex-hero-inset"><Photo alt="" label="Steam above a ceramic cup" shortTag tint="oat" style={{ aspectRatio: '1 / 1' }} /></div>
            </div>
          </div>
          <ol className="ex-index" aria-label="On this page">
            <li><a href="#varieties-h"><span>01</span>Tea varieties</a></li>
            <li><a href="#steps-h"><span>02</span>Brewing, step by step</a></li>
            <li><a href="#brew-tool"><span>03</span>Interactive guide</a></li>
            <li><a href="#ritual-h"><span>04</span>The ritual</a></li>
          </ol>
        </div>
      </section>

      {varieties.length > 0 && (
        <section aria-labelledby="varieties-h" className="oat" style={{ padding: 'clamp(88px, 11vw, 152px) 0' }}>
          <div className="wrap">
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 28 }}>
              <SectionHead id="varieties-h" eyebrow={vars.eyebrow} title={vars.title} />
              <ClientNote note={vars.clientNote} tag="General guide" style={{ maxWidth: 440, background: 'rgba(252,250,245,.55)' }} />
            </div>
            <ol style={{ listStyle: 'none', margin: 'clamp(48px, 6vw, 80px) 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 'clamp(56px, 7vw, 104px)' }}>
              {varieties.map((v, i) => {
                const f = v.fields ?? {};
                return (
                  <li key={v.id} id={`var-${f.slug}`} className={`ex-var${i % 2 ? ' flip' : ''}`}>
                    <div className="ex-var-img zoom-host"><Photo src={f.imageUrl} alt={f.alt || v.title} tint={f.tint} zoom style={{ position: 'absolute', inset: 0 }} /></div>
                    <div className="ex-var-copy">
                      <p className="serif ex-var-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</p>
                      <h3 className="disp" style={{ fontSize: 'clamp(36px, 3.6vw, 54px)' }}>{v.title}</h3>
                      {v.body && <p className="lead" style={{ marginTop: 16 }}>{v.body}</p>}
                      {f.taste && (
                        <dl style={{ margin: '20px 0 0', padding: '14px 0', borderTop: '1px solid #DCCFB8', borderBottom: '1px solid #DCCFB8' }}>
                          <dt className="label">Typical character</dt>
                          <dd className="serif" style={{ margin: '6px 0 0', fontStyle: 'italic', fontSize: 20, lineHeight: 1.35, color: '#465B49' }}>{f.taste}</dd>
                        </dl>
                      )}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 18 }}>
                        {f.slug && liveSlugs.has(f.slug) && <Link className="tlink" href={`/collection?category=${f.slug}`}>Explore {v.title} <span className="arr" aria-hidden="true">→</span></Link>}
                        {f.slug && <a className="tlink" href={`#brew-${f.slug}`}>How to brew it</a>}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      )}

      {steps.length > 0 && (
        <section aria-labelledby="steps-h" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
          <div className="wrap">
            <div className="g12" style={{ alignItems: 'end' }}>
              <div style={{ gridColumn: 'span 7' }}><SectionHead id="steps-h" eyebrow={st.eyebrow} title={st.title} /></div>
              {st.body && <p className="lead" style={{ gridColumn: '9 / span 4' }}>{st.body}</p>}
            </div>
            <ol className="ex-steps" style={steps.length !== 5 ? { gridTemplateColumns: `repeat(${Math.min(steps.length, 5)}, minmax(0, 1fr))` } : undefined}>
              {steps.map((s, i) => (
                <li key={s.id} className="ex-step">
                  <div className="ex-step-top"><span className="serif ex-step-n" aria-hidden="true">{i + 1}</span><span style={{ color: '#465B49' }}><Icon name={s.fields?.icon || 'leaf'} size={28} /></span></div>
                  <h3 className="h3" style={{ marginTop: 22 }}>{s.title}</h3>
                  {s.body && <p className="hint" style={{ marginTop: 10, fontSize: 15 }}>{s.body}</p>}
                </li>
              ))}
            </ol>
            <div className="ex-steps-photos" aria-hidden="true">
              {['Measuring leaves', 'Kettle and teapot', 'Leaves unfurling in the pot'].map((l, i) => <Photo key={l} alt="" label={l} shortTag tint={stepTints[i]} style={{ aspectRatio: '4 / 3' }} />)}
            </div>
          </div>
        </section>
      )}

      <section id="brew-tool" aria-labelledby="tool-h" className="on-forest" style={{ padding: 'clamp(88px, 11vw, 152px) 0', position: 'relative', overflow: 'hidden', scrollMarginTop: 70 }}>
        <Sprig size={460} color="#A8B5A0" style={{ right: -110, top: -60, opacity: 0.2 }} />
        <div className="wrap" style={{ position: 'relative' }}>
          <div className="g12" style={{ alignItems: 'end' }}>
            <div style={{ gridColumn: 'span 7' }}><SectionHead id="tool-h" eyebrow={tool.eyebrow} title={tool.title} onDark /></div>
            {tool.body && <p className="lead" style={{ gridColumn: '9 / span 4' }}>{tool.body}</p>}
          </div>
          <BrewingGuide varieties={varieties} disclaimer={tool.fields.disclaimer ?? undefined} />
        </div>
      </section>

      <section id="ritual" aria-labelledby="ritual-h" style={{ padding: 'clamp(96px, 12vw, 176px) 0', position: 'relative', overflow: 'hidden' }}>
        <RitualCollage
          images={[
            <Photo key="a" alt="" label="Tea pouring into a ceramic cup" tint="brown" style={{ aspectRatio: '3 / 4' }} />,
            <Photo key="b" alt="" label="Loose tea leaves in a wooden scoop" shortTag tint="sage" style={{ aspectRatio: '1 / 1' }} />,
            <Photo key="c" alt="" label="Ceramic teaware in warm, natural light" tint="oat" style={{ aspectRatio: '16 / 10' }} />,
          ]}
          copy={(
            <>
              {rit.eyebrow && <p className="eyebrow">{rit.eyebrow}</p>}
              <h2 id="ritual-h" className="disp" style={{ marginTop: 18, fontSize: 'clamp(46px, 5.6vw, 88px)' }}><Em text={rit.title} /></h2>
              {rit.body && <p className="lead" style={{ marginTop: 24, maxWidth: 440 }}>{rit.body}</p>}
            </>
          )}
        />
      </section>

      <section aria-labelledby="cta-h" className="soft" style={{ padding: 'clamp(88px, 11vw, 160px) 0', borderTop: '1px solid #DCCFB8', position: 'relative', overflow: 'hidden' }}>
        <Sprig size={300} style={{ right: '6%', bottom: -40, opacity: 0.3 }} />
        <div className="wrap" style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 40 }}>
          <h2 id="cta-h" className="disp" style={{ fontSize: 'clamp(46px, 6vw, 96px)', maxWidth: '14ch' }}><Em text={cta.title} /></h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 260 }}>
            <Link className="btn" href="/collection">Explore Our Collection <span className="arr" aria-hidden="true">→</span></Link>
            <Link className="btn btn-ghost" href="/contact?subject=product">Ask Us About Brewing</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
