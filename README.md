# The Tea Collective: website

A working version of The Tea Collective design. It has:
- six public pages
- a filterable tea collection with a product inquiry form for each tea
- a contact form that saves real messages to a database
- a Tea Experience page with an interactive brewing guide and steeping timer
- a gallery with a lightbox
- an admin panel for all content

| Part | Stack | Folder |
|---|---|---|
| Frontend | Next.js 14 (App Router), React 18, TypeScript | `frontend/` |
| API | NestJS 10, TypeORM, class-validator, JWT | `backend/` |
| Database | SQLite 3 | `database/app.sqlite` |

`design-source/` holds the original six `.dc.html` design artboards. `DATA-MODEL.md` lists everything taken from them: routes, seed copy, validation rules and flags, plus the simulated parts that were replaced with real logic.

---

## Quick start

Requires Node.js 18.18+ (20 LTS recommended).

```bash
npm run install:all        # root, backend and frontend dependencies
npm run dev                # API on :4000, website on :3000
```

`backend/.env` and `frontend/.env.local` already hold development values (see the `.env.example` files).

- Website: http://localhost:3000
- Admin: http://localhost:3000/admin/login
- API: http://localhost:4000/api

On first start the API creates the tables, seeds the content from the design, and **prints the default admin login**:

```
Email:    admin@theteacollective.local
Password: TeaCollective!2026
```

You can change these with `ADMIN_EMAIL` / `ADMIN_PASSWORD` before the first start, or change the password later under **Admin → Settings**. To start over with a fresh database, run `npm run db:reset` and restart the API.

---

## Before launch: open items for Samantha Parker

The site never invents facts. These items are clearly marked placeholders until The Tea Collective supplies or confirms them. The **Admin → Dashboard** launch checklist tracks each one.

1. **Phone number.** The supplied number, +1 (918) 731-6357, is used exactly as given, but 918 is an Oklahoma area code while the shop is in Santa Ana, CA. Confirm it, then tick *Phone number verified* in Settings.
2. **Teas.** All 9 teas are labelled **Sample** placeholders.
   - Replace them in **Admin → Teas** with real names and descriptions.
   - Add origin, flavour profile and ingredients only where they are known. Blank fields simply don't show.
   - Untick *Sample* on each real tea.
   - There are no prices: the brief rules out checkout.
3. **Categories.** Green, Black, White, Herbal and Specialty Blends are the brief's illustrative categories. A category appears on the site only while it has published teas.
4. **Store hours.** None were supplied, so the site says "Contact us for current store hours." Enter hours and tick *verified* in Settings to show them, with an open/closed status.
5. **Photos.** Every image is a labelled, textured placeholder. This covers:
   - the hero
   - categories and teas
   - the gallery (14 items, including two "Shop Interior" panels marked *awaiting genuine photo*)
   - the About photo panel
   - the Experience images

   Upload genuine photographs only.
6. **Brand story and philosophy.** The About story is an editable placeholder, and the philosophy wording is marked "Client to confirm". No founding dates, awards, certifications, or sourcing or health claims appear.
7. **Brewing guidance.** The Experience temperatures and steep times are widely published general ranges, labelled "General guidance only, not The Tea Collective’s official recommendations". Edit them under **Page content → Experience: tea variety**.
8. **Social links and map embed** (optional). Add only official accounts. A Google Maps embed URL replaces the illustrated map preview; directions links work without it.

---

## Structure

```
the-tea-collective/
├── backend/            NestJS API
│   └── src/
│       ├── admin-auth/     JWT login, seeded default admin, password change
│       ├── common/         JWT guard, validation error shape, uploads, slugs
│       ├── content/        one polymorphic ContentBlock: page copy, hero photos, philosophy, About
│       │                   themes and approach, tea varieties (+ brewing defaults), brewing steps
│       ├── products/       tea categories + teas (filtered collection, photos, featured, sample flag)
│       ├── inquiries/      contact + product inquiries: validation (inquiry-rules.ts), duplicate
│       │                   check, rate limit, status, CSV export
│       ├── gallery/        photos with category, tint, homepage and About-panel flags
│       ├── settings/       singleton: contact details, hours (+ verified flag), social links, motion
│       └── seed/           idempotent seed with the copy from the design
├── frontend/           Next.js app
│   ├── app/(site)/         /, /collection, /about, /experience, /gallery, /contact
│   ├── app/admin/          login + protected dashboard, inquiries, teas, tea categories, gallery,
│   │                       page content, settings
│   ├── components/site/    Header, Footer, HeroSlideshow, CollectionBrowser, InquiryForm, SuccessCard,
│   │                       BrewingGuide, GalleryBrowser, AboutFader, Parallax, Photo, …
│   └── components/admin/   AdminShell, EntityManager (generic CRUD), UI helpers
├── database/app.sqlite
├── design-source/      original .dc.html artboards
└── DATA-MODEL.md
```

---

## What's dynamic

- **Copy.** All copy (headings, paragraphs, eyebrows, "Client to supply" notes) comes from the database and is editable in **Admin → Page content**. Wrap words in `*asterisks*` to show them in the italic sage accent.
- **Tea collection** (`/collection`):
  - Sticky category chips show counts. The selection is kept in the URL (`?category=green`), so homepage category tiles and Experience links land on the right filter.
  - "Inquire About This Tea" opens a dialog with the tea preselected. The dialog traps focus, closes on Esc and returns focus to the button that opened it.
  - Empty states: a category with no teas, or no teas at all.
- **Homepage.** The "Popular teas" section shows teas marked *featured*. "Inquire" links go to `/contact?product=<id>`, which preselects the tea and the *Product Information* subject.
- **Both forms** post to `POST /api/inquiries`.
  - The rules live in `backend/src/inquiries/inquiry-rules.ts`, mirrored in `frontend/lib/validation.ts`; both match the design's messages exactly.
  - Fields:
    - name and email
    - optional phone (10–15 digits)
    - subject: required on the Contact page
    - tea: required in the dialog, optional on the Contact page, and it must be a published tea
    - message: 10–1,500 characters
  - Protections:
    - a honeypot field
    - a per-IP rate limit (`INQUIRY_RATE_LIMIT`, default 5 per 10 minutes)
    - an identical-message check, which returns `409` with a clear notice
  - Errors are shown inline with an error summary. A network error keeps the typed details and offers email and phone instead.
  - On success, a success card confirms what was sent and where the reply will go, with a next action: **Explore Our Teas** (Contact) or **Learn How to Brew** (dialog), plus "Send another".
- **Admin → Inquiries:**
  - search; filter by status, subject and which form sent it
  - sort and pagination
  - CSV export (guarded against spreadsheet formula injection)
  - internal notes
  - a pre-filled reply email and tap-to-call
  - delete with confirmation
- **Dashboard:**
  - new, last-7-days and responded counts
  - inquiries by subject
  - most-asked-about teas
  - the launch checklist
- **Tea Experience:**
  - The varieties, brewing steps and brewing defaults are all content blocks.
  - The guide's chips show temperature (°C and °F), steep time, amount and method.
  - The timer counts against the wall clock, so it stays accurate in a background tab. It has start, pause, resume, ±30 s (30 s–15 min), reset and a "ready" notice.
  - "How to brew it" links (`#brew-<slug>`) preselect a tea style.
- **Gallery.** Filter chips cover only the categories that have photos, and the choice is kept in `?category=`. The masonry grid opens a lightbox with arrow keys, Esc, swipe and a focus trap.
- **Motion:**
  - the hero cross-fade every 6–8 s (set in Settings)
  - the About photo panel fade
  - slow parallax on the Home experience band and the Experience ritual collage
  - Everything pauses on hover or focus, with a pause button, when offscreen or the tab is hidden, and for `prefers-reduced-motion`.
- **Loading, empty and error states.** Every page has a skeleton loader, empty-state copy and a retry screen if the API can't be reached.

## Content rules the build enforces (from the brief)

- No prices, checkout, invented teas, origins, ingredients, testimonials, awards, certifications, sourcing or sustainability claims, opening hours or social accounts.
- No fake form success. The success card appears only after the API stores the message.
- No imagery presented as the real shop. Missing photos show as labelled placeholders.
- General tea education is clearly separated from the shop's inventory.
- Accessibility:
  - skip link and visible focus
  - 44 px targets
  - labelled fields with `aria-invalid`/`aria-describedby`
  - an error summary with links to each field
  - focus moves to the success heading
  - focus-trapped dialogs and lightbox
  - WCAG AA colour pairs; text-safe brown `#6E5A45` and terracotta `#9A5A43`

## API overview

Public:

```
GET  /api/settings                   shop details, links, hours display, open status (verified only)
GET  /api/content?type=…             published blocks of one type
GET  /api/content/page-copy          all page copy keyed by key
GET  /api/products                   { categories (with teas), allCategories, items, total }
GET  /api/products/featured?limit=4
GET  /api/products/:id
GET  /api/gallery | /gallery/home | /gallery/about
POST /api/inquiries                  → 201 receipt | 400 {message, errors} | 409 duplicate | 429
```

Admin (Bearer JWT from `POST /api/admin-auth/login`):

```
GET/PATCH                       /api/admin/settings
GET/POST/PATCH/DELETE           /api/admin/content[/:id]              (+ POST /:id/image)
GET/POST/PATCH/DELETE           /api/admin/product-categories[/:id]   (+ POST|DELETE /:id/image)
GET/POST/PATCH/DELETE           /api/admin/products[/:id]             (+ GET /counts, POST|DELETE /:id/image)
GET/POST/PATCH/DELETE           /api/admin/gallery[/:id]              (+ POST|DELETE /:id/image)
GET                             /api/admin/inquiries?search&status&subject&source&sort&page&pageSize
GET                             /api/admin/inquiries/stats | /export.csv
GET/PATCH/DELETE                /api/admin/inquiries/:id
```

## Production notes

- **Secrets and URLs.** Set a long random `JWT_SECRET`, set `CORS_ORIGINS` to the site's domain, and point `NEXT_PUBLIC_API_URL` at the public API.
- **Reverse proxy.** If the API runs behind one, set `TRUST_PROXY=1` so the rate limit sees real visitor IPs.
- **Timezone.** `SHOP_TIMEZONE` (default `America/Los_Angeles`) is used for the open/closed status once hours are verified.
- **Schema.** `synchronize: true` builds the schema from the entities. Switch to migrations if the schema will keep changing on a live database.
- **Backups.** Back up `database/app.sqlite` and `backend/uploads/` together.
- **Email.** No notification email is sent for new inquiries, because no mail service was specified. Inquiries appear in the admin straight away.
