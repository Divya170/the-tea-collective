import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export const GALLERY_CATEGORIES = ['Tea Products', 'Tea Preparation', 'Shop Interior', 'Tea Details'] as const;
export { TINTS } from '../products/product-category.entity';
export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

@Entity('gallery_items')
export class GalleryItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'varchar' })
  category: GalleryCategory;

  /** Null = not yet photographed; the site shows a clearly labelled placeholder panel. */
  @Column({ type: 'varchar', nullable: true })
  imageUrl: string | null;

  @Column({ default: '' })
  alt: string;

  /** Masonry tile size on desktop. */
  @Column({ type: 'integer', default: 2 })
  rows: number;

  @Column({ type: 'integer', default: 1 })
  cols: number;

  /** Placeholder panel tint while no photo exists. */
  @Column({ type: 'varchar', default: 'linen' })
  tint: string;

  /** Shown in the About page's slowly fading "Our approach to tea" photo panel. */
  @Column({ default: false })
  onAbout: boolean;

  /** Shown in the homepage gallery preview (first five by order). */
  @Column({ default: false })
  featuredOnHome: boolean;

  @Column({ type: 'integer', default: 0 })
  sortOrder: number;

  @Column({ default: true })
  published: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
