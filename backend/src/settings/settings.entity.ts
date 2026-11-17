import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { DayHours } from './days';

export { DAYS, DayHours } from './days';

export interface SocialLink {
  label: string;
  url: string;
}

/** Singleton (id = 1): shop identity, contact details, hours and every feature flag from the design comp. */
@Entity('settings')
export class Settings {
  @PrimaryColumn({ default: 1 })
  id: number;

  @Column({ default: 'The Tea Collective' })
  businessName: string;

  @Column({ default: 'Boutique tea · Santa Ana' })
  tagline: string;

  @Column({ default: '9713 Cedar Street' })
  addressLine1: string;

  @Column({ default: 'Santa Ana' })
  city: string;

  @Column({ default: 'CA' })
  region: string;

  @Column({ default: '92701' })
  postalCode: string;

  @Column({ default: 'USA' })
  country: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string | null;

  /** The supplied number needs client confirmation; a "Verify" note shows until this is on. */
  @Column({ default: false })
  phoneVerified: boolean;

  @Column({ type: 'varchar', nullable: true })
  email: string | null;

  @Column({ type: 'varchar', nullable: true })
  mapEmbedUrl: string | null;

  @Column({ default: true })
  heroAutoplay: boolean;

  @Column({ type: 'integer', default: 7 })
  heroIntervalSeconds: number;


  @Column({ type: 'simple-json', default: '[]' })
  hours: DayHours[];

  /** Hours are shown (and open-now is computed) only once the shop confirms them. Until then the site says “Contact us for current store hours.”. */
  @Column({ default: false })
  hoursVerified: boolean;

  /** Official social profiles only. */
  @Column({ type: 'simple-json', default: '[]' })
  socialLinks: SocialLink[];

  @Column({ default: 'A boutique tea shop in Santa Ana, California. Discover the art of slowing down, one cup at a time.' })
  footerNote: string;

  @UpdateDateColumn()
  updatedAt: Date;
}
