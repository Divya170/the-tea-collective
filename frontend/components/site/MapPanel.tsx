import type { SiteSettings } from '@/lib/types';

/** Live Google Maps embed when one is set in Settings; otherwise the design's illustrated map preview, linking to Google Maps. */
export function MapPanel({ settings, style }: { settings: SiteSettings; style?: React.CSSProperties }) {
  if (settings.mapEmbedUrl) {
    return (
      <div className="ct-map" style={style}>
        <iframe className="map-frame" src={settings.mapEmbedUrl} title={`Map showing ${settings.businessName}, ${settings.fullAddress}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      </div>
    );
  }
  return (
    <a className="ct-map zoom-host" href={settings.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label={`Map preview of ${settings.fullAddress}. Opens Google Maps in a new tab`} style={style}>
      <svg className="zoom" viewBox="0 0 700 440" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
        <rect width="700" height="440" fill="#EFE7D7" />
        <g stroke="#FCFAF5" strokeWidth="16" fill="none"><path d="M-20 300 L720 250" /><path d="M180 -20 L230 460" /><path d="M470 -20 L440 460" /></g>
        <g stroke="#FCFAF5" strokeWidth="7" fill="none"><path d="M-20 120 L720 90" /><path d="M-20 390 L720 360" /><path d="M60 -20 L100 460" /><path d="M600 -20 L580 460" /><path d="M330 -20 L340 460" /></g>
        <path d="M500 60 C560 80 620 40 700 70 L700 0 L480 0 Z" fill="#A8B5A0" opacity=".55" />
        <path d="M0 420 C80 380 140 440 240 410 L240 440 L0 440 Z" fill="#A8B5A0" opacity=".55" />
        <text x="248" y="236" fontFamily="DM Sans, sans-serif" fontSize="13" letterSpacing="2.5" fill="#6E5A45" transform="rotate(-4 248 236)">{settings.addressLine1.replace(/^\d+\s*/, '').toUpperCase()}</text>
        <g transform="translate(336 226)"><circle r="34" fill="#465B49" opacity=".14" /><path d="M0 18s-16-14-16-26a16 16 0 0 1 32 0C16 4 0 18 0 18z" fill="#465B49" transform="translate(0 -18)" /><circle cy="-26" r="5.5" fill="#F7F3E9" /></g>
      </svg>
      <span className="ct-map-tag">Map preview · {settings.addressLine1} ↗</span>
    </a>
  );
}
