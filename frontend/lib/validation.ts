/** Client-side mirror of the NestJS rules (backend/src/inquiries/inquiry-rules.ts) for instant feedback. */
import type { InquirySubject } from './types';

export interface InquiryForm {
  name: string;
  email: string;
  phone: string;
  subject: InquirySubject | '';
  product: string;
  message: string;
  website: string;
}

export type InquiryMode = 'contact' | 'product';
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const MESSAGE_MAX = 1500;

export const SUBJECTS: { value: InquirySubject; label: string }[] = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'collection', label: 'Tea Collection Inquiry' },
  { value: 'product', label: 'Product Information' },
  { value: 'visit', label: 'Store Visit' },
  { value: 'other', label: 'Other' },
];

export const FIELD_LABELS: Record<keyof InquiryForm, string> = {
  name: 'Full name', email: 'Email address', phone: 'Phone number', subject: 'Subject', product: 'Selected tea', message: 'Message', website: 'Website',
};

export function fieldOrder(mode: InquiryMode): (keyof InquiryForm)[] {
  return mode === 'contact' ? ['name', 'email', 'phone', 'subject', 'product', 'message'] : ['name', 'email', 'phone', 'product', 'message'];
}

export function validateInquiry(f: InquiryForm, mode: InquiryMode) {
  const e: Partial<Record<keyof InquiryForm, string>> = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!f.email.trim()) e.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(f.email.trim())) e.email = 'Enter an email address like name@example.com.';
  const d = f.phone.replace(/\D/g, '');
  if (f.phone.trim() && (d.length < 10 || d.length > 15)) e.phone = 'Enter a phone number with 10 to 15 digits, or leave it blank.';
  if (mode === 'contact' && !f.subject) e.subject = 'Choose what your message is about.';
  if (mode === 'product' && !f.product) e.product = 'Choose the tea you’re asking about.';
  if (f.message.trim().length < 10) e.message = 'Please write a short message (at least 10 characters).';
  else if (f.message.length > MESSAGE_MAX) e.message = 'Please keep your message under 1,500 characters.';
  return e;
}
