export interface DayHoursDisplay { day: string; label: string; confirmed: boolean; isToday: boolean }
export interface DayHours { day: string; open: string | null; close: string | null; closed: boolean }
export interface SocialLink { label: string; url: string }

export interface SiteSettings {
  id: number;
  businessName: string;
  tagline: string;
  addressLine1: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  phone: string | null;
  phoneVerified: boolean;
  email: string | null;
  mapEmbedUrl: string | null;
  heroAutoplay: boolean;
  heroIntervalSeconds: number;
  hours: DayHours[];
  hoursVerified: boolean;
  hoursDisplay: DayHoursDisplay[];
  openStatus: { isOpen: boolean; label: string } | null;
  socialLinks: SocialLink[];
  footerNote: string;
  fullAddress: string;
  phoneHref: string | null;
  emailHref: string | null;
  mapsUrl: string;
  directionsUrl: string;
}

export type ContentType = 'page_copy' | 'hero_slide' | 'philosophy_item' | 'about_theme' | 'approach_item' | 'tea_variety' | 'brew_step';

export interface ContentBlock {
  id: number;
  type: ContentType;
  key: string | null;
  title: string;
  body: string | null;
  fields: Record<string, string | null>;
  sortOrder: number;
  published: boolean;
  imageUrl?: string | null;
}

export type PageCopy = Record<string, ContentBlock | undefined>;
export type Tint = 'linen' | 'sage' | 'forest' | 'oat' | 'brown';

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  blurb: string;
  imageUrl: string | null;
  imageAlt: string;
  tint: Tint;
  sortOrder: number;
  published: boolean;
  count?: number;
  productCount?: number;
}

export interface Product {
  id: number;
  categoryId: number;
  category?: ProductCategory;
  name: string;
  description: string;
  origin: string | null;
  flavourProfile: string | null;
  ingredients: string | null;
  imageUrl: string | null;
  imageAlt: string;
  tint: Tint | null;
  featured: boolean;
  isSample: boolean;
  sortOrder: number;
  published: boolean;
}

export interface CollectionResponse {
  categories: (ProductCategory & { count: number })[];
  allCategories: (ProductCategory & { count: number })[];
  items: Product[];
  total: number;
}

export type GalleryCategory = 'Tea Products' | 'Tea Preparation' | 'Shop Interior' | 'Tea Details';

export interface GalleryItem {
  id: number;
  title: string;
  category: GalleryCategory;
  imageUrl: string | null;
  alt: string;
  rows: number;
  cols: number;
  tint: Tint;
  onAbout: boolean;
  featuredOnHome: boolean;
  sortOrder: number;
  published: boolean;
}

export interface GalleryResponse {
  category: string;
  categories: { name: string; count: number }[];
  items: GalleryItem[];
}

export type InquirySubject = 'general' | 'collection' | 'product' | 'visit' | 'other';
export type InquirySource = 'contact' | 'product';
export type InquiryStatus = 'new' | 'responded' | 'archived';

export interface Inquiry {
  id: number;
  reference: string;
  source: InquirySource;
  subject: InquirySubject;
  name: string;
  email: string;
  phone: string | null;
  productId: number | null;
  productName: string | null;
  message: string;
  status: InquiryStatus;
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
}

/** What the API returns after a message is stored. */
export interface InquiryReceipt {
  received: true;
  source: InquirySource;
  subject: InquirySubject;
  subjectLabel: string;
  productName: string | null;
  name: string;
  email: string;
  hasPhone: boolean;
  createdAt: string;
}

export interface ApiErrorBody {
  statusCode?: number;
  message?: string | string[];
  errors?: Record<string, string>;
}
