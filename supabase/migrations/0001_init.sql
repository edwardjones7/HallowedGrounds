-- Hallowed Grounds — Phase 1 MVP schema
-- Public tables (locations, menu_*, events) are anon-readable when active/published.
-- Lead tables are server-only (service role); admin writes use authenticated session.

-- ─── LOCATIONS ────────────────────────────────────────────────────
-- Thin DB mirror of content/locations.ts; `slug` is the join contract.
create table if not exists locations (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name        text not null,
  sort_order  int  not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ─── MENU CATEGORIES (per-location) ───────────────────────────────
create table if not exists menu_categories (
  id          uuid primary key default gen_random_uuid(),
  location_id uuid not null references locations(id) on delete cascade,
  slug        text not null,
  title       text not null,
  note        text,
  kind        text not null default 'drink' check (kind in ('drink','food')),
  sort_order  int  not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  unique (location_id, slug)
);
create index if not exists menu_categories_location_idx
  on menu_categories (location_id, sort_order);

-- ─── MENU ITEMS (per-category → per-location) ─────────────────────
create table if not exists menu_items (
  id           uuid primary key default gen_random_uuid(),
  category_id  uuid not null references menu_categories(id) on delete cascade,
  name         text not null,
  description  text,
  price        numeric(8,2),
  tags         text[] not null default '{}',
  is_available boolean not null default true,
  is_sold_out  boolean not null default false,
  sort_order   int not null default 0,
  created_at   timestamptz not null default now()
);
create index if not exists menu_items_category_idx
  on menu_items (category_id, sort_order);

-- ─── EVENTS ───────────────────────────────────────────────────────
create table if not exists events (
  id           uuid primary key default gen_random_uuid(),
  location_id  uuid references locations(id) on delete set null,
  title        text not null,
  slug         text unique not null,
  description  text,
  starts_at    timestamptz not null,
  ends_at      timestamptz,
  image_url    text,
  ticket_url   text,
  is_published boolean not null default false,
  sort_order   int not null default 0,
  created_at   timestamptz not null default now()
);
create index if not exists events_published_idx on events (is_published, starts_at);

-- ─── LEADS (every form submission; CRM-ready) ─────────────────────
create table if not exists leads (
  id            uuid primary key default gen_random_uuid(),
  type          text not null check (type in ('catering','tray','careers','contact')),
  source        text not null default 'website',
  name          text,
  email         text,
  phone         text,
  location_slug text,
  payload       jsonb not null default '{}',
  resume_path   text,
  status        text not null default 'new' check (status in ('new','read','archived')),
  created_at    timestamptz not null default now()
);
create index if not exists leads_type_idx   on leads (type, created_at desc);
create index if not exists leads_status_idx on leads (status, created_at desc);

-- ─── NEWSLETTER (segmentation + future SMS) ───────────────────────
create table if not exists newsletter_subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text unique not null,
  phone       text,
  tags        text[] not null default '{}',
  source      text,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ─── ROW LEVEL SECURITY ───────────────────────────────────────────
alter table locations              enable row level security;
alter table menu_categories        enable row level security;
alter table menu_items             enable row level security;
alter table events                 enable row level security;
alter table leads                  enable row level security;
alter table newsletter_subscribers enable row level security;

-- Public read of active/published content (anon).
create policy "public read active locations" on locations
  for select using (is_active);
create policy "public read active categories" on menu_categories
  for select using (is_active);
create policy "public read available items" on menu_items
  for select using (true);
create policy "public read published events" on events
  for select using (is_published);

-- Authenticated staff (admin) may read everything + write content tables.
create policy "auth read locations"  on locations
  for select to authenticated using (true);
create policy "auth write locations"  on locations
  for all to authenticated using (true) with check (true);
create policy "auth all categories"  on menu_categories
  for all to authenticated using (true) with check (true);
create policy "auth all items"       on menu_items
  for all to authenticated using (true) with check (true);
create policy "auth all events"      on events
  for all to authenticated using (true) with check (true);
create policy "auth read leads"      on leads
  for all to authenticated using (true) with check (true);
create policy "auth read subs"       on newsletter_subscribers
  for all to authenticated using (true) with check (true);

-- NOTE: leads + newsletter_subscribers have NO anon policy. Public form
-- submissions are inserted server-side with the service role (bypasses RLS),
-- keeping lead data unreadable from the browser.

-- ─── STORAGE BUCKETS ──────────────────────────────────────────────
insert into storage.buckets (id, name, public)
  values ('resumes', 'resumes', false)
  on conflict (id) do nothing;
insert into storage.buckets (id, name, public)
  values ('event-images', 'event-images', true)
  on conflict (id) do nothing;

-- Public read of event images.
create policy "public read event images" on storage.objects
  for select using (bucket_id = 'event-images');
