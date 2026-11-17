import { ContentBlock } from '../content/content-block.entity';
import { GalleryItem } from '../gallery/gallery-item.entity';
import type { CategorySeed, ProductSeed } from '../products/products.service';

/**
 * Seed copy taken verbatim from the design (design-source/*.dc.html). See DATA-MODEL.md.
 * Words wrapped in *asterisks* render in the italic sage accent, as in the design.
 * fields.clientNote renders as a dashed "Client to supply / confirm" note until cleared in the admin.
 */
type F = Record<string, string | null>;
const pc = (key: string, title: string, body: string | null, fields: F = {}): Partial<ContentBlock> => ({ type: 'page_copy', key, title, body, fields });
const item = (type: ContentBlock['type'], title: string, body: string, fields: F, sortOrder: number): Partial<ContentBlock> => ({ type, title, body, fields, sortOrder });

export const CONTENT_SEED: Partial<ContentBlock>[] = [
  // Home
  pc('home_hero', 'Find Your Moment *in Every Cup.*', 'Explore thoughtfully presented teas and discover a more meaningful way to enjoy your everyday tea ritual.', { eyebrow: 'Boutique tea shop · Santa Ana, California' }),
  pc('home_intro', 'More Than Tea. *A Moment to Yourself.*', 'The Tea Collective is a boutique tea shop on Cedar Street in Santa Ana. It’s a place to discover different teas, take your time choosing, and enjoy tea a little more mindfully, one cup at a time.', {
    eyebrow: 'The Tea Collective', imageUrl: null, alt: 'Tea being enjoyed by a sunlit window',
    clientNote: 'A short introduction in Samantha’s own words. Founding story, dates and milestones are left out until supplied.',
  }),
  pc('home_collections', 'Find the tea *that suits you.*', null, { eyebrow: 'Featured collections', clientNote: 'Illustrative categories for the design. Final categories follow The Tea Collective’s actual range.' }),
  pc('home_products', 'Chosen to be *savoured.*', null, { eyebrow: 'Popular teas', clientNote: 'Featured products, photography and details. These are clearly marked samples; no real names, origins, ingredients or prices are invented.' }),
  pc('home_experience', 'Slow Down. Steep Well. *Enjoy More.*', 'Every tea has its own way of being brewed. A few degrees or a minute more can change the cup completely. Discover the varieties, learn the basics, and find the method that suits you.', {
    eyebrow: 'The tea experience', imageUrl: null, alt: 'Tea being prepared at a wooden counter',
  }),
  pc('home_philosophy', 'A quieter way *to enjoy tea.*', null, { eyebrow: 'Our philosophy', clientNote: 'Draft values for approval. No sourcing, organic, sustainability or quality certifications are claimed.' }),
  pc('home_gallery', 'The world of *The Tea Collective.*', null, { eyebrow: 'Gallery' }),
  pc('home_visit', 'Your Next Favourite Cup *Awaits.*', null, { eyebrow: 'Visit the shop', imageUrl: null }),
  // Collection
  pc('collection_hero', 'Explore Our *Tea Collection.*', 'Discover different tea varieties and find the flavours that suit your moments.', {
    eyebrow: 'The collection', imageUrl: null, alt: 'Tea jars and tins on a wooden shelf',
    clientNote: 'The real product list. Every card below is a clearly marked sample: no tea names, origins, flavour notes, ingredients or prices are invented.',
  }),
  pc('collection_cta', 'Not Sure Which Tea *to Choose?*', 'Get in touch and let us help you explore the collection.', { eyebrow: 'Need a little guidance?', imageUrl: null, alt: 'Steam rising from a cup of tea' }),
  // About
  pc('about_hero', 'A Little More Meaning *in Every Moment.*', 'Discover the philosophy behind The Tea Collective.', { imageUrl: null, alt: 'Linen, ceramics and morning light' }),
  pc('about_story', 'Slowing down, *one cup at a time.*', 'The Tea Collective is a boutique tea shop at 9713 Cedar Street in Santa Ana, California, created for people who enjoy discovering tea and the small rituals that come with it.', {
    eyebrow: 'Our story', imageUrl: null, alt: 'Tea leaves and a teacup on a wooden table',
    extra: '[Editable placeholder: a few sentences, in Samantha Parker’s words, about why The Tea Collective exists and what visitors can expect.]',
    clientNote: 'The brand story. Founding date, founder biography, milestones, awards and customer numbers appear only if supplied and verified.',
  }),
  pc('about_philosophy', 'Four small *ideas.*', 'The thinking behind how we present tea and welcome visitors.', { eyebrow: 'Our tea philosophy', clientNote: 'Wording to be approved by The Tea Collective.' }),
  pc('about_approach', 'Thoughtfully *presented.*', 'A calm, unhurried space to look, ask and choose.', { eyebrow: 'Our approach to tea', clientNote: 'Organic, fair-trade, ethical-sourcing and health claims are deliberately left out unless verified.' }),
  pc('about_cta', 'Let Tea Become Part *of Your Everyday.*', null),
  // Experience
  pc('experience_hero', 'The Art of a *Beautiful Brew.*', 'Discover tea varieties, preparation methods, and the little details that make every cup special.', { eyebrow: 'A tea journal', imageUrl: null, alt: 'Close-up: hot water poured over loose leaves' }),
  pc('experience_varieties', 'Five ways *to know tea.*', null, { eyebrow: '01 · Discover', clientNote: 'These are general descriptions of each tea style, not details of The Tea Collective’s current inventory. Product-specific notes appear in the collection once supplied.' }),
  pc('experience_steps', 'Five steps *to a good cup.*', 'Simple habits that suit almost any tea. The guide below suggests temperatures and times for each style.', { eyebrow: '02 · Brewing guide' }),
  pc('experience_tool', 'Find your *steep.*', 'Choose a tea style to see a suggested temperature and steeping time, then use the timer while it brews.', {
    eyebrow: '03 · Interactive guide', disclaimer: 'General guidance only, not The Tea Collective’s official recommendations. Every tea is different, so check the packaging or ask us in store.',
  }),
  pc('experience_ritual', 'Steam, *silence,* and a second cup.', 'Warm the teapot. Watch the leaves open. Let the steam rise for a moment before the first sip. The ritual is as much a part of tea as the leaves themselves.', { eyebrow: '04 · The ritual' }),
  pc('experience_cta', 'Ready to Discover Your *Next Favourite Tea?*', null),
  // Gallery
  pc('gallery_hero', 'A Glimpse Into *Our World of Tea.*', null, {
    imageUrl: null, alt: 'Tea set on linen in morning light',
    clientNote: 'Genuine photographs of the shop, its teas and teaware. Every panel here is an illustrative placeholder, and none is presented as a real photo of The Tea Collective.',
  }),
  pc('gallery_cta', 'Come Experience *Tea With Us.*', null, { eyebrow: 'Visit us' }),
  // Contact
  pc('contact_hero', 'We’d Love to *Hear From You.*', 'Questions about our teas or planning a visit? Get in touch.'),
  pc('contact_form', 'Tell us *what you’re looking for.*', null, { eyebrow: 'Send a message' }),
  pc('contact_location', 'Find us on *Cedar Street.*', null, { eyebrow: 'Location' }),
  pc('contact_cta', 'Let’s Talk *Tea.*', null),

  // Hero photos (placeholders until real photographs are uploaded)
  item('hero_slide', 'Loose tea leaves, ceramic cups and natural linen', '', { imageUrl: null, alt: 'Loose tea leaves, ceramic cups and natural linen', tint: 'oat' }, 0),
  item('hero_slide', 'Tea pouring in warm morning light', '', { imageUrl: null, alt: 'Tea pouring in warm morning light', tint: 'brown' }, 1),
  item('hero_slide', 'A glass teapot steeping on a wooden table', '', { imageUrl: null, alt: 'A glass teapot steeping on a wooden table', tint: 'sage' }, 2),

  // Home brand philosophy
  item('philosophy_item', 'The beauty of simplicity', 'Good tea needs little more than fresh water, a little time and a moment of attention.', {}, 0),
  item('philosophy_item', 'An appreciation of tea', 'Every variety has its own character. Part of the pleasure is getting to know them.', {}, 1),
  item('philosophy_item', 'Everyday rituals', 'A cup in the morning, a pause in the afternoon. Small rituals that make a day feel calmer.', {}, 2),
  item('philosophy_item', 'Thoughtful discovery', 'Exploring new teas at your own pace, with a little guidance whenever you’d like it.', {}, 3),

  // About themes
  item('about_theme', 'Appreciate the Ritual', 'Warming the cup, measuring the leaves, waiting while it steeps. The ritual is part of the pleasure.', { icon: 'kettle' }, 0),
  item('about_theme', 'Discover New Flavours', 'From delicate whites to robust blacks, there is always another tea to get to know.', { icon: 'leaf' }, 1),
  item('about_theme', 'Enjoy the Simple Moments', 'A good cup doesn’t need an occasion. It only asks for a few quiet minutes.', { icon: 'cup' }, 2),
  item('about_theme', 'Find Your Perfect Cup', 'Everyone’s favourite is different. We’re happy to help you find yours.', { icon: 'compass' }, 3),

  // About approach
  item('approach_item', 'Presented with care', 'Each tea is displayed and labelled so it’s easy to see, compare and choose.', {}, 0),
  item('approach_item', 'Guidance when you want it', 'Ask about any tea and how to brew it. There’s no pressure to buy.', {}, 1),
  item('approach_item', 'Something for every moment', 'Teas for bright mornings, slow afternoons and quiet evenings.', {}, 2),

  // Tea Experience varieties: general tea education + widely published brewing ranges (NOT the shop's official guidance)
  item('tea_variety', 'Green Tea', 'Leaves are heated soon after picking, so they keep a fresh, green character.', {
    slug: 'green', taste: 'Grassy · vegetal · sometimes toasty or sweet', tint: 'sage', alt: 'Green tea leaves, close up', imageUrl: null,
    temp: '70–80°C', tempF: '160–175°F · below boiling', time: '2–3 min', timeNote: 'Taste at 2 minutes', amount: '1 tsp', seconds: '150',
    method: 'Let freshly boiled water cool for a few minutes before pouring. Steep briefly and taste early. Green tea can turn bitter when the water is too hot or it steeps too long.',
  }, 0),
  item('tea_variety', 'Black Tea', 'Leaves are fully oxidised before drying, giving a darker cup and a fuller body.', {
    slug: 'black', taste: 'Malty · robust · sometimes fruity or smoky', tint: 'brown', alt: 'Dark black tea leaves in a scoop', imageUrl: null,
    temp: '90–100°C', tempF: '195–212°F · just off the boil', time: '3–5 min', timeNote: 'Longer for a stronger cup', amount: '1 tsp', seconds: '240',
    method: 'Pour water just off the boil over the leaves. Steep for three minutes for a lighter cup, or up to five for a fuller one. Add milk afterwards if you like.',
  }, 1),
  item('tea_variety', 'White Tea', 'Young buds and leaves are simply withered and dried, with very light processing.', {
    slug: 'white', taste: 'Delicate · soft · lightly honeyed', tint: 'oat', alt: 'Silvery white tea buds', imageUrl: null,
    temp: '75–85°C', tempF: '165–185°F · hot, not boiling', time: '3–5 min', timeNote: 'Gentle and forgiving', amount: '1–2 tsp', seconds: '240',
    method: 'White tea leaves are light and fluffy, so use a little more by volume. Pour hot (not boiling) water and allow a longer, gentle steep.',
  }, 2),
  item('tea_variety', 'Herbal Tea', 'Infusions of flowers, herbs, fruits or roots rather than the tea plant, and usually naturally caffeine-free.', {
    slug: 'herbal', taste: 'Floral · fruity · minty · spiced, depending on the ingredients', tint: 'linen', alt: 'Dried flowers and herbs', imageUrl: null,
    temp: '100°C', tempF: '212°F · freshly boiled', time: '5–7 min', timeNote: 'Cover while it steeps', amount: '1–2 tsp', seconds: '360',
    method: 'Pour freshly boiled water and cover the cup or pot to keep in the warmth and aroma. Herbal infusions usually need a longer steep to develop flavour.',
  }, 3),
  item('tea_variety', 'Specialty Blends', 'A base tea combined with botanicals, spices or flavourings for a particular character.', {
    slug: 'blends', taste: 'Varies with the base tea and what it’s blended with', tint: 'forest', alt: 'A blend of leaves and botanicals', imageUrl: null,
    temp: 'Base tea', tempF: 'Usually 85–95°C / 185–205°F', time: '3–4 min', timeNote: 'Follow the base tea', amount: '1 tsp', seconds: '210',
    method: 'Brew a blend the way you would brew its base tea, green, black, white or herbal. When in doubt, start with less time and taste.',
  }, 4),

  // Brewing steps
  item('brew_step', 'Choose your tea', 'Start with the tea you’re in the mood for: bright and fresh, rich and warming, or calm and floral.', { icon: 'jar' }, 0),
  item('brew_step', 'Prepare fresh water', 'Fresh, cold water, filtered if your tap water is hard, gives the clearest flavour.', { icon: 'kettle' }, 1),
  item('brew_step', 'Check the temperature', 'Delicate teas prefer water below boiling; robust teas and herbals usually like it hotter.', { icon: 'thermo' }, 2),
  item('brew_step', 'Allow the tea to steep', 'Steep, then taste. Longer brings strength, and sometimes bitterness.', { icon: 'timer' }, 3),
  item('brew_step', 'Enjoy your cup', 'Remove the leaves, take a moment, and notice how the cup tastes as it cools.', { icon: 'cup' }, 4),
];

/** Illustrative categories from the brief, with general (not inventory-specific) descriptions. */
export const CATEGORY_SEED: CategorySeed[] = [
  { slug: 'green', name: 'Green Tea', blurb: 'Fresh, grassy and gently vegetal.', tint: 'sage', imageAlt: 'Green tea leaves' },
  { slug: 'black', name: 'Black Tea', blurb: 'Fully oxidised, rich and full-bodied.', tint: 'brown', imageAlt: 'Black tea leaves' },
  { slug: 'white', name: 'White Tea', blurb: 'Delicate, lightly processed and softly sweet.', tint: 'oat', imageAlt: 'White tea buds' },
  { slug: 'herbal', name: 'Herbal Tea', blurb: 'Infusions of flowers, herbs and roots.', tint: 'linen', imageAlt: 'Dried herbs and flowers' },
  { slug: 'blends', name: 'Specialty Blends', blurb: 'Teas combined with botanicals and spices.', tint: 'forest', imageAlt: 'A tea blend with botanicals' },
];

/** Clearly identified SAMPLE placeholders, exactly as in the design: no real names, origins, flavours, ingredients or prices. */
export const SAMPLE_DESCRIPTION = 'Placeholder for one of the shop’s teas. Name, description, origin and flavour notes to be supplied by The Tea Collective.';
export const PRODUCT_SEED: ProductSeed[] = [
  { category: 'blends', name: 'Sample Specialty Blend No. 1', imageAlt: 'A blend of tea leaves and botanicals', tint: 'forest', featured: true },
  { category: 'green', name: 'Sample Green Tea No. 1', imageAlt: 'Loose-leaf green tea in a glass jar', tint: 'sage', featured: true },
  { category: 'black', name: 'Sample Black Tea No. 1', imageAlt: 'Dark loose-leaf black tea on linen', tint: 'brown', featured: true },
  { category: 'herbal', name: 'Sample Herbal Infusion No. 1', imageAlt: 'Dried flowers and herbs in a ceramic bowl', tint: 'linen', featured: true },
  { category: 'white', name: 'Sample White Tea No. 1', imageAlt: 'Silvery white tea buds', tint: 'oat', featured: false },
  { category: 'green', name: 'Sample Green Tea No. 2', imageAlt: 'Green tea leaves beside a small cup', tint: 'sage', featured: false },
  { category: 'black', name: 'Sample Black Tea No. 2', imageAlt: 'Packaged black tea tin', tint: 'brown', featured: false },
  { category: 'herbal', name: 'Sample Herbal Infusion No. 2', imageAlt: 'Herbal infusion in a glass teapot', tint: 'oat', featured: false },
  { category: 'blends', name: 'Sample Specialty Blend No. 2', imageAlt: 'Blend in an open paper pouch', tint: 'linen', featured: false },
];

const g = (category: string, title: string, rows: number, cols: number, tint: string, extra: Partial<GalleryItem> = {}) => ({ category, title, rows, cols, tint, ...extra }) as Partial<GalleryItem>;
export const GALLERY_SEED: Partial<GalleryItem>[] = [
  g('Tea Products', 'Tins and jars on a wooden shelf', 3, 2, 'oat', { featuredOnHome: true, onAbout: true }),
  g('Tea Preparation', 'Pouring tea into a ceramic cup', 2, 1, 'brown', { featuredOnHome: true }),
  g('Tea Details', 'Loose leaves, close up', 2, 1, 'sage', { featuredOnHome: true, onAbout: true }),
  g('Shop Interior', 'Shop counter (awaiting genuine photo)', 2, 1, 'linen', { featuredOnHome: true }),
  g('Tea Preparation', 'Leaves unfurling in a glass teapot', 2, 1, 'forest', { featuredOnHome: true, onAbout: true }),
  g('Tea Details', 'Dried flowers for an herbal infusion', 1, 1, 'oat'),
  g('Tea Products', 'Paper pouches with handwritten labels', 2, 2, 'linen'),
  g('Tea Preparation', 'Measuring leaves with a wooden scoop', 2, 1, 'sage'),
  g('Tea Details', 'Steam rising from a cup', 2, 1, 'brown'),
  g('Shop Interior', 'Display shelves (awaiting genuine photo)', 3, 1, 'oat'),
  g('Tea Products', 'Teaware arranged on linen', 2, 1, 'forest'),
  g('Tea Details', 'Silvery white tea buds', 1, 1, 'linen'),
  g('Tea Preparation', 'Tea tray set for two', 2, 2, 'oat'),
  g('Tea Products', 'A gift set, wrapped in paper', 2, 1, 'brown'),
].map((x, i) => ({ ...x, alt: x.title, sortOrder: i }) as Partial<GalleryItem>);
