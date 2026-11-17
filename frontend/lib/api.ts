import type { ApiErrorBody, CollectionResponse, ContentBlock, ContentType, GalleryItem, GalleryResponse, PageCopy, Product, SiteSettings, Tint } from './types';

/** Base URL for API calls. Server components may use an internal URL; the browser always uses NEXT_PUBLIC_API_URL. */
export function apiBase() {
  if (typeof window === 'undefined') return process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
}

/** Turn a stored upload path (/uploads/x.jpg) into an absolute URL the browser can load. */
export function mediaUrl(path?: string | null) {
  if (!path) return null;
  if (/^https?:\/\//.test(path)) return path;
  const origin = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api').replace(/\/api\/?$/, '');
  return `${origin}${path}`;
}

export class ApiError extends Error {
  status: number;
  fieldErrors: Record<string, string>;
  constructor(status: number, body: ApiErrorBody | null) {
    const msg = Array.isArray(body?.message) ? body?.message.join(' ') : body?.message;
    super(msg || (status >= 500 ? 'Something went wrong on our side. Please try again.' : 'The request could not be completed.'));
    this.status = status;
    this.fieldErrors = body?.errors ?? {};
  }
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${apiBase()}${path}`, {
      cache: 'no-store',
      ...init,
      headers: { Accept: 'application/json', ...(init.body && !(init.body instanceof FormData) ? { 'Content-Type': 'application/json' } : {}), ...init.headers },
    });
  } catch (err) {
    console.error(`[api] fetch failed: ${init.method ?? 'GET'} ${apiBase()}${path}`, err);
    throw new ApiError(0, { message: 'We couldn’t reach The Tea Collective’s server. Check your connection and try again.' });
  }
  const text = await res.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!res.ok) throw new ApiError(res.status, (data as ApiErrorBody) ?? null);
  return data as T;
}

/* ---------- public site data (server components) ---------- */
export const getSettings = () => apiFetch<SiteSettings>('/settings');
export const getPageCopy = () => apiFetch<PageCopy>('/content/page-copy');
export const getContent = (type: ContentType) => apiFetch<ContentBlock[]>(`/content?type=${type}`);
export const getCollection = () => apiFetch<CollectionResponse>('/products');
export const getFeatured = (limit = 4) => apiFetch<Product[]>(`/products/featured?limit=${limit}`);
export const getGallery = () => apiFetch<GalleryResponse>('/gallery');
export const getGalleryHome = () => apiFetch<GalleryItem[]>('/gallery/home');
export const getGalleryAbout = () => apiFetch<GalleryItem[]>('/gallery/about');

/** Read a page-copy block with safe fallbacks so a missing row never crashes a page. */
export function copy(pc: PageCopy, key: string) {
  const b = pc[key];
  return {
    title: b?.title ?? '',
    body: b?.body ?? '',
    eyebrow: b?.fields?.eyebrow ?? '',
    clientNote: b?.fields?.clientNote ?? '',
    imageUrl: b?.fields?.imageUrl ?? null,
    alt: b?.fields?.alt ?? '',
    fields: b?.fields ?? {},
  };
}

/** Split a heading so the *starred* words render in the italic sage accent, e.g. "Find Your Moment *in Every Cup.*" */
export function emphasis(title: string): { before: string; em: string; after: string } {
  const m = title.match(/^(.*?)\*(.+?)\*(.*)$/);
  return m ? { before: m[1], em: m[2], after: m[3] } : { before: title, em: '', after: '' };
}

/** Placeholder tint → CSS class from the design (linen is the default beige panel). */
export function tintClass(t?: Tint | string | null) {
  return t && t !== 'linen' ? `ph-${t}` : '';
}
