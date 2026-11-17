import Link from 'next/link';
import type { InquiryReceipt } from '@/lib/types';
import { Icon } from './Icons';

/** Shown only after the API has stored the message (HTTP 201). Includes a clear next action. */
export function SuccessCard({ receipt, businessName, onReset, resetLabel, next, headingRef }: {
  receipt: InquiryReceipt; businessName: string; onReset: () => void; resetLabel: string; next: { href: string; label: string }; headingRef?: React.Ref<HTMLParagraphElement>;
}) {
  return (
    <div style={{ animation: 'rise .5s ease both', padding: '8px 0' }}>
      <span style={{ width: 56, height: 56, border: '1px solid #465B49', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#465B49' }}><Icon name="leaf" size={26} /></span>
      <p ref={headingRef} tabIndex={-1} className="disp" style={{ fontSize: 'clamp(34px, 3.4vw, 46px)', marginTop: 20, outline: 'none' }}>Thank you, {receipt.name.split(' ')[0]}. Your message has been sent.</p>
      <p className="lead" style={{ marginTop: 14 }}>
        {businessName} has your {receipt.productName ? <>question about <strong>{receipt.productName}</strong></> : <>message (<strong>{receipt.subjectLabel}</strong>)</>} and will reply to <strong>{receipt.email}</strong>{receipt.hasPhone ? ' or by phone' : ''} as soon as possible.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 26 }}>
        <Link className="btn" href={next.href}>{next.label} <span className="arr" aria-hidden="true">→</span></Link>
        <button type="button" className="btn btn-ghost" onClick={onReset}>{resetLabel}</button>
      </div>
    </div>
  );
}
