# The Tea Collective: data model extracted from the design

Source: `design-source/*.dc.html` (Main, Collection, About, Experience, Gallery, Contact).

## Identity
- **Business:** The Tea Collective, a boutique tea shop. Client: Samantha Parker.
- **Address:** 9713 Cedar Street, Santa Ana, CA 92701, USA.
- **Phone:** +1 (918) 731-6357 (`tel:+19187316357`). **Flag:** 918 is an Oklahoma area code, but the shop is in Santa Ana, CA, so the client must verify the number before launch (`phoneVerified`).
- **Email:** theteacollective@hotmail.com.
- **Hours:** not supplied. Everywhere they would appear, the site shows "Contact us for current store hours." until hours are entered and marked verified.
- **Social links:** none supplied. The footer shows only links an admin adds.
- **Fonts:** Cormorant Garamond (display, italic emphasis) · DM Sans (body, UI, uppercase labels at 0.2em tracking).
- **Colors:**
  - forest `#465B49` (primary; 6.6:1 on cream)
  - sage `#A8B5A0`
  - cream `#F7F3E9` (background)
  - oat `#E8DDC9`
  - tea brown `#806B54`
  - botanical `#303B32` (text)
  - soft white `#FCFAF5`
  - terracotta `#B8755B` (decorative only)
  - text-safe variants: brown `#6E5A45`, terracotta `#9A5A43`, terracotta on dark `#D9A58E`
  - error `#A3412C`
- **Shape:** near-square buttons (2px radius), underline inputs, hairline rules. No pill buttons, no heavy shadows.
- **Motion:**
  - `rise` fade-up
  - Ken Burns zoom (20s)
  - hover zoom 1.05 over 1.4s
  - home hero cross-fade every 6–8s (default 7)
  - About approach fader every 6.5s
  - Experience ritual parallax
  - all of it off under `prefers-reduced-motion`
- **Breakpoints:**
  - ≤1100px: nav becomes a drawer
  - ≤1023px: two-column product grid
  - ≤900px: splits stack
  - ≤767px: sticky "Our Teas / Contact" bar
  - ≤560px: one column
  - ≤374px: tighter buttons

## Routes
1. **`/`**
   - hero: 2–3 cross-fading photos, pause button, two CTAs, scroll cue
   - brand intro split ("More Than Tea. A Moment to Yourself.")
   - featured collections: an uneven grid of 5 categories, each linking to `/collection?category=<slug>`
   - popular teas: 1 large card plus 3 cards, Inquire → `/contact?product=<id>`
   - tea-experience band with 3 quick brewing facts
   - brand philosophy: 4 numbered values
   - gallery preview: 5 tiles
   - store-visit CTA: address, phone, email, "Contact us for current store hours."
   - footer
2. **`/collection`**
   - hero
   - sticky filter chips with counts. "All Teas" plus only the categories that have published teas. `?category=` preselects one.
   - category title and blurb
   - staggered product grid (4 / 3 / 2 / 1 columns). Each card shows image, category, name, description, origin and flavour (only if supplied) and an "Inquire About This Tea" button.
   - empty state: "No teas in this category yet"
   - product inquiry dialog: focus trap, Esc to close, return focus to the button that opened it
   - CTA: "Not Sure Which Tea to Choose?"
3. **`/about`**:
   - hero
   - story with an editable placeholder
   - 4 philosophy themes, each with an icon
   - approach: 3 points plus a fading photo panel
   - closing CTA
4. **`/experience`**
   - hero with an on-page index
   - 5 tea varieties, alternating rows, each with "Explore <cat>" and "How to brew it"
   - 5-step brewing guide
   - interactive guide:
     - category chips, then temperature (°C and °F), steep time, amount and method
     - steeping timer: start, pause, resume, ±30s (30s–15min), reset, and a "ready" notice
     - labelled "General guidance only, not The Tea Collective’s official recommendations"
   - ritual parallax section
   - CTA
5. **`/gallery`**
   - full-width hero
   - filter chips (All plus categories that have items): Tea Products / Tea Preparation / Shop Interior / Tea Details
   - uneven masonry grid
   - lightbox: counter, previous/next, Esc, arrow keys, swipe, focus trap, focus returns to the tile
   - CTA "Come Experience Tea With Us." → directions
6. **`/contact`**
   - hero
   - 4 info blocks: address (maps), phone (tel), email (mailto), hours ("Contact us for current store hours.")
   - contact form
   - map preview with Directions
   - "Let’s Talk Tea." with call and email

## Content types (`content` module, one `ContentBlock` with `type` + `fields`)
- `page_copy`: keyed blocks:
  - home: `home_hero`, `home_intro`, `home_collections`, `home_products`, `home_experience`, `home_philosophy`, `home_gallery`, `home_visit`
  - collection: `collection_hero`, `collection_cta`
  - about: `about_hero`, `about_story`, `about_philosophy`, `about_approach`, `about_cta`
  - experience: `experience_hero`, `experience_varieties`, `experience_steps`, `experience_tool`, `experience_ritual`, `experience_cta`
  - gallery: `gallery_hero`, `gallery_cta`
  - contact: `contact_hero`, `contact_form`, `contact_location`, `contact_cta`
- `hero_slide` (3): the home hero photos (`fields.imageUrl`, `alt`, `tint`)
- `philosophy_item` (4): home "A quieter way to enjoy tea."
- `about_theme` (4): About philosophy themes (`fields.icon`)
- `approach_item` (3): About approach points
- `tea_variety` (5): Experience varieties. Fields:
  - `slug` (matches a product category)
  - `taste`, `tint`, `alt`, `imageUrl`
  - brewing defaults: `temp`, `tempF`, `time`, `timeNote`, `amount`, `seconds`, `method`
- `brew_step` (5): the step-by-step guide (`fields.icon`)

## Dedicated modules
- **products**
  - `ProductCategory`: slug, name, blurb, tint, imageUrl, sortOrder, published
  - `Product`:
    - categoryId, name, description
    - `origin`, `flavourProfile` and `ingredients`, each nullable and shown only when supplied
    - imageUrl, imageAlt
    - `featured` (Home "Popular teas")
    - `isSample`: shows the "Sample" tag; the 9 seeded products are samples
    - sortOrder, published
  - Public lists only published teas in published categories. Categories with no published teas are hidden from the filters.
  - **No prices.** The brief rules out checkout and invented prices.
- **gallery:** title, category (4 above), tint (`linen`/`sage`/`forest`/`oat`/`brown`), alt, imageUrl, `featuredOnHome`, sortOrder, published. 14 seeded placeholders; 5 on Home.
- **inquiries:** one entity for both forms. Fields:
  - `source`: `contact` or `product`
  - `subject`: general / collection / product / visit / other
  - name, email, phone
  - `productId` and a `productName` snapshot
  - message, reference (admin only)
  - status: new / responded / archived
  - adminNotes, fingerprint
- **settings:** singleton id 1. Fields:
  - businessName, tagline, address parts, phone, phoneVerified, email, mapEmbedUrl
  - heroAutoplay, heroIntervalSeconds (6–8)
  - hours, hoursVerified, socialLinks, footerNote

## Validation (mirrored exactly in `inquiries.service.ts`)
- **Name:** trimmed, at least 2 characters ("Please enter your name."); at most 120.
- **Email:** required ("Please enter your email address."). It must match `^[^\s@]+@[^\s@]+\.[^\s@]{2,}$`, otherwise "Enter an email address like name@example.com.".
- **Phone:** optional. If given, it must have 10–15 digits ("Enter a phone number with 10 to 15 digits, or leave it blank.").
- **Contact form:** `subject` is required ("Choose what your message is about."). `product` is optional, and if given it must be a published tea.
- **Product inquiry:** `product` is required ("Choose the tea you’re asking about."). It can be a published tea id or `general`, meaning "Not sure yet / general question".
- **Message:** at least 10 characters ("Please write a short message (at least 10 characters)."); at most 1,500 ("Please keep your message under 1,500 characters.").
- **Spam and duplicates:**
  - honeypot `website`
  - per-IP rate limit (5 per 10 minutes)
  - an identical submission within 10 minutes returns `409`: "This exact message was just sent, so it wasn’t sent again."

## Flags (design tweaks → real settings or data)
- `formState` (Live / Not connected / Success / Error): a preview-only tweak. The real backend replaces it, and success shows only after a `201`.
- Collection `category` tweak → `?category=` in the URL.
- Experience `brewTea` tweak → chip selection, deep-linkable via `#brew-tool`.
- Gallery `category` tweak → `?category=` in the URL.

## Not reproduced (preview simulations)
- The design's `setTimeout` that ends in "not been sent". Replaced by a real `POST /api/inquiries`.
- The design's `sessionStorage` hand-off between artboards. Replaced by the `?category=` and `?product=` query parameters.
