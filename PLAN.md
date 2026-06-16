This confirms a lot about the current site's gaps. Here's the full context you'd need to design and build them a
  stronger website.

  ---
  Website Build Brief: Hallowed Grounds Coffee Co.
  
  1. Audit of the Current Site (what you're replacing)

  Platform: Wix (drag-and-drop, template-based). Functional but generic, image-heavy, and thin on real content.

  What works today:
  - Clear two-location info + hours
  - A genuinely compelling sourcing/quality story (their best asset, currently buried in a wall of text)
  - Working catering request form and employment form
  - Joe Coffee integration for mobile ordering
  - Press/social proof (PHL17, Fox29, "Best of the Best 2025," Nick Jonas)
  
  Concrete weaknesses (the reason to rebuild):

  ┌────────────────────────┬────────────────────────────────────────────────────────────────────────────────────────┐
  │        Problem         │                                         Detail                                         │
  ├────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────┤
  │                        │ All three menus (Wash Twp food, Wash Twp drinks, Merchantville) are external PDF       │
  │ Menus are PDFs         │ links. Bad on mobile, not searchable, not SEO-indexable, no images/prices on-page,     │
  │                        │ hard to keep current.                                                                  │
  ├────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────┤
  │ Empty/placeholder      │ /shop is blank. /events says "Check Back Soon!" /gift-card uses an empty-state stock   │
  │ pages                  │ image. These actively hurt credibility.                                                │
  ├────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────┤
  │ Confusing shop         │ Duplicate scaffolding pages (items, items-1, this-is-a-title-01/02) — leftover Wix     │
  │ structure              │ template junk that's publicly crawlable.                                               │
  ├────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────┤
  │                        │ The seed-oil-free / tallow / house-made / local-farm story — their single biggest      │
  │ Story is undersold     │ differentiator — is a dense paragraph at the bottom of a menu page, not a hero         │
  │                        │ narrative.                                                                             │
  ├────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────┤
  │ No real homepage       │ Homepage is essentially a banner image + two address blurbs. No clear primary CTAs     │
  │ hierarchy              │ (Order / Cater / Visit).                                                               │
  ├────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────┤
  │ Two locations, one     │ The important distinction (Merchantville = coffee bar only / Thyme Kitchen does food;  │
  │ muddled model          │ Wash Twp = full farm-to-table cafe) is easy to miss.                                   │
  ├────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────┤
  │ No SEO foundation      │ PDF menus + thin pages = poor local search. No structured data, no per-location        │
  │                        │ landing pages optimized for "coffee shop Turnersville/Merchantville NJ."               │
  └────────────────────────┴────────────────────────────────────────────────────────────────────────────────────────┘

  Current sitemap (as-is): Home, About, Catering, Catering Request Form, Washington Twp Menu, Merchantville Menu,
  Events, Shop (empty), Gift Card, Employment Application, Secret Shopper, + duplicate items scaffolding.

  ---
  2. Audiences & Primary Jobs-to-Be-Done
  
  1. Local regulars / drop-ins → "Where are you, what are your hours, what's on the menu, can I order ahead?" → Order / 
  View Menu is the #1 CTA.
  2. Event planners / couples / corporate (high-value) → "Can you cater my wedding/event, what's included, how much, how
  do I book?" → Catering quote funnel.
  3. Values-driven foodies → "Is this actually clean/local/seed-oil-free?" → the sourcing story sells them.
  4. Job seekers → barista/kitchen applications.
  5. Gift buyers → gift cards & merch.

  ---
  3. Recommended Information Architecture (new site)

  Home
  ├── Locations
  │   ├── Washington Twp. (Turnersville)   ← full cafe, farm-to-table
  │   └── Merchantville                     ← coffee bar (food by Thyme Kitchen)
  ├── Menus
  │   ├── Food (Washington Twp.)            ← on-page, not PDF
  │   └── Drinks & Specials                 ← incl. rotating monthly/seasonal
  ├── Catering & Mobile Cafe
  │   ├── Packages & Enhancements
  │   └── Request a Quote (form)
  ├── Our Story / Sourcing                  ← origin + clean-food manifesto
  ├── Shop (Gift Cards + Merch)
  ├── Events  (or fold into Locations until there's content)
  └── Careers (Join Our Team)
     + utility: Secret Shopper (unlisted), mailing list, social links

  Key IA moves:
  - Kill the PDFs — render menus as responsive, on-page content with categories, prices, dietary/allergen tags, and
  photos. Easier to update, indexable, far better mobile UX.
  - Each location gets its own real landing page with its own hours, address, map, order link, and the right "who cooks
  the food" context — these are your local-SEO workhorses.
  - Elevate the sourcing story into a flagship page + a homepage section (it's the differentiator competitors can't
  copy).
  - Remove all duplicate/placeholder pages before launch.

  ---
  4. Homepage Structure (recommended)
  
  1. Hero — strong photo + one-line positioning ("South Jersey's farm-to-table cafe, roaster & mobile coffee caterer") +
  two primary CTAs: Order Ahead and Book Catering.
  2. Two-location selector — cards for Washington Twp. & Merchantville (hours, address, "Order"/"Directions").
  3. The difference — visual strip of the clean-food proof points (seed-oil free · tallow-fried · house-made daily ·
  local farms · roasted in-house · non-toxic cookware).
  4. Menu teaser — featured drinks + current monthly barista specials.
  5. Catering CTA band — "Catered for schools, weddings, corporates… even Nick Jonas." → Request a quote.
  6. Social proof — PHL17 / Fox29 / Best of the Best 2025 logos + Instagram feed.
  7. Newsletter signup + footer (hours, addresses, socials, careers).

  ---
  5. Functional Requirements & Integrations
  
  - Online ordering: Keep Joe Coffee links (two company accounts — hallowed-grounds-coffee-cafe for Turnersville,
  hallowed-grounds-llc for Merchantville). Make "Order Ahead" buttons location-aware.
  - Catering request form — rebuild the existing fields: name, email, phone, event date, start/end time, location, guest
  count, event type, add-ons (extra milks, hot chocolate, frozen coffee, smoothies, fresh whipped upgrade,
  lemonade/iced tea, coffee mocktails, dessert bar), notes. Route to email/CRM; add autoresponder.
  - E-commerce / Shop — real gift card purchase (digital delivery) + merch. (Currently broken/empty.)
  - Careers form — barista/kitchen, 18+ gate, location preference, availability, résumé upload (≤15MB).
  - Secret Shopper form — keep as an unlisted internal tool (scored rubric: First Impression, Hospitality, Dress Code,
  Product Quality, Speed & Accuracy, Brand Experience). Good signal that they value service consistency — could become a
  light internal dashboard.
  - Menu management — CMS-driven menu items (toggle availability, flag "sold out," push monthly specials) so staff can
  update without a developer. Important because "menu subject to change throughout the day based on availability."
  - Newsletter (already collecting emails) + Instagram/Facebook feeds.
  - Events — a simple CMS-backed events list (only show the section when populated).

  ---
  6. Content & Asset Inventory
  
  Already have (reusable):
  - Origin story (Matt & Christine, farmers'-market roots, Thyme Kitchen partnership)
  - Full sourcing/quality manifesto + named farm partners (Hidden Creek Farm, Spring Run Dairy)
  - Menu content (food items w/ prices, drink specialties, monthly barista specials) 
  - Catering packages (from $550), enhancements, booking/deposit terms (20% deposit, 3.5% card fee)
  - Press mentions & awards 
  - Decent lifestyle/food photography on Wix
  
  Need to gather for a better build:
  - High-res photography (hero, per-location interiors, signature drinks, food, the team — their "named barista
  specials" suggest team personality is on-brand)
  - Exact, current full menus with prices (extract from the PDFs so they live on-page)
  - Logo files / brand assets in vector
  - Catering gallery + testimonials (weddings, corporate)
  - Map embeds, accurate hours per location (note Merchantville About says 6:30–3 vs. location page 7–3 — reconcile this
  discrepancy)
  
  ---
  7. Brand & Design Direction
  
  - Voice: warm, family-run, quality-obsessed, a little playful (creative drink names). Not corporate.
  - Visual: "earthy clean" (their own asset naming) — natural tones, farm/artisan textures, generous food photography,
  clean type. Lean into the farm-to-table credibility visually.
  - Differentiator to dramatize: the clean-ingredient ethos. Treat it like a premium-brand pillar (think how a high-end
  "real food" brand merchandises sourcing) rather than fine print.
  - Mobile-first — most cafe traffic is phones checking hours/menu/ordering.

  ---
  8. SEO & Local Strategy
  
  - Per-location pages targeting "coffee shop / cafe Turnersville NJ" and "Merchantville NJ", with LocalBusiness/Cafe
  schema markup (hours, address, geo, menu).
  - On-page indexable menus (replacing PDFs) capture long-tail searches ("seed oil free cafe NJ," "pork roll
  Turnersville," "wedding coffee catering South Jersey").
  - A dedicated "coffee catering / mobile espresso bar South Jersey" page for the high-value catering keyword.
  - Google Business Profile alignment, review snippets, and the press/award badges for trust.

  ---
  9. Suggested Tech Stack (if moving off Wix)
  
  - Recommended: Next.js + a headless CMS (Sanity/Contentful) for performance, SEO, and staff-editable menus — paired
  with a managed e-commerce/gift-card service (Shopify or Square, which also ties to in-store POS) and keeping Joe
  Coffee for mobile ordering.
  - Lower-effort alternative: A modern Squarespace/Shopify build — far better templates than the current Wix site, with
  native commerce and easy editing, if the owners want to self-manage without a developer.
  - Decision driver: how much the owners want to edit themselves vs. how much custom polish/SEO they want. Given they're
  a small family business actively updating daily menus and monthly specials, ease of self-editing should weigh 
  heavily.

  ---
  10. Launch Priorities (MVP → v2)
  
  MVP: Home, two location pages, on-page menus, Our Story/Sourcing, Catering + quote form, Careers, working gift cards.
  Remove all placeholder pages. Add schema + GBP alignment.
  v2: Full merch shop, events calendar, catering gallery/testimonials, internal Secret Shopper dashboard, blog/SEO
  content (sourcing, recipes, local-farm spotlights).