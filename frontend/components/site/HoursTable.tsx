import type { SiteSettings } from '@/lib/types';

/** Weekly hours, shown only once the shop has verified them. Until then: "Contact us for current store hours." */
export function HoursTable({ settings }: { settings: SiteSettings }) {
  if (!settings.hoursVerified) return <p className="serif ct-val">Contact us for current store hours.</p>;
  return (
    <>
      {settings.openStatus && <p className="label" style={{ color: settings.openStatus.isOpen ? '#465B49' : '#9A5A43' }}>{settings.openStatus.label}</p>}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10, fontSize: 15 }}>
        <caption className="sr">Weekly opening hours</caption>
        <tbody>
          {settings.hoursDisplay.map((d) => (
            <tr key={d.day} style={{ borderTop: '1px solid #DCCFB8', fontWeight: d.isToday ? 600 : 400 }}>
              <th scope="row" style={{ textAlign: 'left', padding: '10px 0', fontWeight: 'inherit' }}>{d.day}{d.isToday && <span className="sr"> (today)</span>}</th>
              <td style={{ textAlign: 'right', padding: '10px 0' }}>{d.label}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
