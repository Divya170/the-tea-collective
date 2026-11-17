import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export const CONTENT_TYPES = ['page_copy', 'hero_slide', 'philosophy_item', 'about_theme', 'approach_item', 'tea_variety', 'brew_step'] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];

/**
 * One polymorphic entity for every simple CMS collection.
 * - page_copy: keyed blocks of page text (key = 'home_hero', 'collection_hero', …)
 * - hero_slide: homepage cross-fading photos (fields.imageUrl, alt, tint)
 * - philosophy_item: the four homepage brand values
 * - about_theme: the four About philosophy themes (fields.icon)
 * - approach_item: the three About "approach" points
 * - tea_variety: Tea Experience varieties + general brewing defaults (fields.slug, taste, temp, tempF, time, timeNote, amount, seconds, method)
 * - brew_step: the five-step brewing guide (fields.icon)
 * fields.clientNote, when set, renders as a dashed "Client to confirm" note on the site.
 */
@Entity('content_blocks')
@Index(['type', 'key'])
export class ContentBlock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  type: ContentType;

  @Column({ type: 'varchar', nullable: true })
  key: string | null;

  @Column({ default: '' })
  title: string;

  @Column({ type: 'text', nullable: true })
  body: string | null;

  @Column({ type: 'simple-json', default: '{}' })
  fields: Record<string, string | null>;

  @Column({ type: 'integer', default: 0 })
  sortOrder: number;

  @Column({ default: true })
  published: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
