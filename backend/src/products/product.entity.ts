import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ProductCategory, Tint } from './product-category.entity';

/** A tea in the collection. No price: the site is for discovery and inquiries, never checkout. */
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: 'integer' })
  categoryId: number;

  @ManyToOne(() => ProductCategory, (c) => c.products, { onDelete: 'RESTRICT' })
  category: ProductCategory;

  @Column()
  name: string;

  @Column({ type: 'text', default: '' })
  description: string;

  /** Shown only when supplied by the shop — never invented. */
  @Column({ type: 'varchar', nullable: true })
  origin: string | null;

  @Column({ type: 'varchar', nullable: true })
  flavourProfile: string | null;

  @Column({ type: 'text', nullable: true })
  ingredients: string | null;

  @Column({ type: 'varchar', nullable: true })
  imageUrl: string | null;

  @Column({ default: '' })
  imageAlt: string;

  @Column({ type: 'varchar', nullable: true })
  tint: Tint | null;

  /** Shown in the homepage "Popular teas" section. */
  @Column({ default: false })
  featured: boolean;

  /** Seeded design samples carry a visible "Sample" tag until replaced with real teas. */
  @Column({ default: false })
  isSample: boolean;

  @Column({ type: 'integer', default: 0 })
  sortOrder: number;

  @Column({ default: true })
  published: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
