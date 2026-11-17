import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Product } from './product.entity';

/** Placeholder tints, matching the design's photo panels (linen = the default beige). */
export const TINTS = ['linen', 'sage', 'forest', 'oat', 'brown'] as const;
export type Tint = (typeof TINTS)[number];

@Entity('product_categories')
export class ProductCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  /** Used in /collection?category=<slug>; also links Experience varieties to their teas. */
  @Column({ unique: true })
  slug: string;

  /** Short general description shown on category tiles and above the filtered catalogue. */
  @Column({ type: 'text', default: '' })
  blurb: string;

  @Column({ type: 'varchar', nullable: true })
  imageUrl: string | null;

  @Column({ default: '' })
  imageAlt: string;

  @Column({ type: 'varchar', default: 'linen' })
  tint: Tint;

  @Column({ type: 'integer', default: 0 })
  sortOrder: number;

  @Column({ default: true })
  published: boolean;

  @OneToMany(() => Product, (p) => p.category)
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
