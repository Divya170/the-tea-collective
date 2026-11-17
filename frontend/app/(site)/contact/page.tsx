import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { Em } from '@/components/site/Em';
import { SectionHead } from '@/components/site/Heading';
import { HoursTable } from '@/components/site/HoursTable';
import { Icon, Sprig } from '@/components/site/Icons';
import { InquiryForm, type TeaOption } from '@/components/site/InquiryForm';
import { MapPanel } from '@/components/site/MapPanel';
import { copy, getCollection, getPageCopy, getSettings } from '@/lib/api';
import type { InquirySubject } from '@/lib/types';
import { SUBJECTS } from '@/lib/validation';

export const metadata: Metadata = { title: 'Contact', description: 'Call, email or visit The Tea Collective at 9713 Cedar Street, Santa Ana, CA, or send a message.' };

function Block({ icon, label, children, action }: { icon: string; label: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="ct-block">
      <p className="label" style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ color: '#465B49' }}><Icon name={icon} size={20} /></span>{label}</p>
      <div style={{ marginTop: 14 }}>{children}</div>
      {action && <div style={{ marginTop: 10 }}>{action}</div>}
    </div>
  );
}

export default async function ContactPage({ searchParams }: { searchParams: { product?: string; subject?: string } }) {
  const [pc, settings, collection] = await Promise.all([getPageCopy(), getSettings(), getCollection()]);
  const hero = copy(pc, 'contact_hero');
  const form = copy(pc, 'contact_form');
  const loc = copy(pc, 'contact_location');
  const cta = copy(pc, 'contact_cta');
  const teas: TeaOption[] = collection.items.map((p) => ({ id: p.id, name: p.name, categoryName: collection.allCategories.find((c) => c.id === p.categoryId)?.name ?? '' }));
  // ?product=<id> from a tea's "Inquire" link preselects that tea and the Product Information subject.
  const picked = teas.find((t) => String(t.id) === searchParams?.product);
  const subj = SUBJECTS.find((s) => s.value === searchParams?.subject)?.value as InquirySubject | undefined;

  return (
    <main id="main">
      <section aria-labelledby="page-h" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(40px, 5vw, 64px) 0 clamp(64px, 8vw, 104px)' }}>
        <Sprig size={420} color="#A8B5A0" style={{ right: -70, top: 40, opacity: 0.5 }} />
        <div className="wrap" style={{ position: 'relative' }}>
          <Breadcrumbs current="Contact" />
          <div className="g12" style={{ marginTop: 'clamp(36px, 5vw, 72px)', alignItems: 'end' }}>
            <h1 id="page-h" className="disp reveal" style={{ gridColumn: 'span 8', fontSize: 'clamp(56px, 8.6vw, 140px)' }}><Em text={hero.title} /></h1>
            {hero.body && <p className="lead reveal-2" style={{ gridColumn: '9 / span 4' }}>{hero.body}</p>}
          </div>
        </div>
      </section>

      <section aria-label="Contact details and form" style={{ paddingBottom: 'clamp(88px, 11vw, 152px)' }}>
        <div className="wrap g12" style={{ alignItems: 'start' }}>
          <div className="ct-info" style={{ gridColumn: 'span 5' }}>
            <Block icon="pin" label="Address" action={<a className="tlink" href={settings.mapsUrl} target="_blank" rel="noopener noreferrer">Open in Maps <span className="arr" aria-hidden="true">↗</span><span className="sr"> (opens Google Maps in a new tab)</span></a>}>
              <address className="serif ct-val" style={{ fontStyle: 'normal' }}>{settings.addressLine1}<br />{settings.city}, {settings.region} {settings.postalCode}, {settings.country}</address>
            </Block>
            <Block icon="phone" label="Phone" action={settings.phoneHref ? <a className="tlink" href={settings.phoneHref}>Call the Shop <span className="arr" aria-hidden="true">→</span></a> : undefined}>
              {settings.phoneHref ? <a className="serif ct-val" href={settings.phoneHref} style={{ textDecoration: 'none' }}>{settings.phone}</a> : <p className="hint">Phone number to be added.</p>}
            </Block>
            <Block icon="mail" label="Email" action={settings.emailHref ? <a className="tlink" href={`${settings.emailHref}?subject=${encodeURIComponent('Hello from the website')}`}>Write to Us <span className="arr" aria-hidden="true">→</span></a> : undefined}>
              {settings.emailHref ? <a className="serif ct-val" href={settings.emailHref} style={{ textDecoration: 'none', wordBreak: 'break-all' }}>{settings.email}</a> : <p className="hint">Email address to be added.</p>}
            </Block>
            <Block icon="clock" label="Store hours" action={settings.hoursVerified ? undefined : <p className="hint">Opening hours will appear here once confirmed by the shop.</p>}>
              <HoursTable settings={settings} />
            </Block>
          </div>
          <div className="ct-form" style={{ gridColumn: '7 / span 6' }}>
            {form.eyebrow && <p className="eyebrow">{form.eyebrow}</p>}
            <h2 className="h2" style={{ fontSize: 'clamp(34px, 3.4vw, 50px)', marginBottom: 32 }}><Em text={form.title} /></h2>
            {picked && <p className="notice" style={{ marginBottom: 24 }}>You’re asking about <strong>{picked.name}</strong>. We’ve filled that in for you.</p>}
            <InquiryForm mode="contact" teas={teas} settings={settings} initialProduct={picked ? String(picked.id) : undefined} initialSubject={picked ? 'product' : subj} />
          </div>
        </div>
      </section>

      <section aria-labelledby="map-h" className="oat" style={{ padding: 'clamp(80px, 10vw, 140px) 0' }}>
        <div className="wrap g12" style={{ alignItems: 'center' }}>
          <div style={{ gridColumn: 'span 4' }}>
            <SectionHead id="map-h" eyebrow={loc.eyebrow} title={loc.title} size="clamp(38px, 4vw, 60px)" />
            <p className="lead" style={{ marginTop: 18, color: '#4E4A3E' }}>{settings.fullAddress}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
              <a className="btn" href={settings.directionsUrl} target="_blank" rel="noopener noreferrer">Get Directions <span className="arr" aria-hidden="true">↗</span><span className="sr"> (opens Google Maps in a new tab)</span></a>
              <a className="btn btn-ghost" href={settings.mapsUrl} target="_blank" rel="noopener noreferrer">View Map<span className="sr"> (opens in a new tab)</span></a>
            </div>
          </div>
          <MapPanel settings={settings} style={{ gridColumn: '6 / span 7' }} />
        </div>
      </section>

      <section aria-labelledby="cta-h" className="on-forest" style={{ padding: 'clamp(88px, 11vw, 160px) 0', position: 'relative', overflow: 'hidden' }}>
        <Sprig size={400} color="#A8B5A0" style={{ right: '4%', bottom: -80, opacity: 0.3 }} />
        <div className="wrap" style={{ position: 'relative' }}>
          <h2 id="cta-h" className="disp" style={{ fontSize: 'clamp(64px, 10vw, 168px)', color: '#FCFAF5' }}><Em text={cta.title} onDark /></h2>
          {(settings.phoneHref || settings.emailHref) && (
            <div className="ct-final">
              {settings.phoneHref && <a href={settings.phoneHref}><span className="label" style={{ color: '#E8DDC9' }}>Call</span><span className="serif">{settings.phone}</span><span className="arr" aria-hidden="true">→</span></a>}
              {settings.emailHref && <a href={settings.emailHref}><span className="label" style={{ color: '#E8DDC9' }}>Email</span><span className="serif" style={{ wordBreak: 'break-all' }}>{settings.email}</span><span className="arr" aria-hidden="true">→</span></a>}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
