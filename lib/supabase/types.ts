// Row types for the Supabase schema (see supabase/migrations/0001_init.sql).
// Hand-maintained — keep in sync with the migration.

export type LocationRow = {
  id: string;
  slug: string;
  name: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
};

export type MenuCategoryRow = {
  id: string;
  location_id: string;
  slug: string;
  title: string;
  note: string | null;
  kind: "drink" | "food";
  sort_order: number;
  is_active: boolean;
  created_at: string;
};

export type MenuItemRow = {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: number | null;
  tags: string[];
  is_available: boolean;
  is_sold_out: boolean;
  sort_order: number;
  created_at: string;
};

export type EventRow = {
  id: string;
  location_id: string | null;
  title: string;
  slug: string;
  description: string | null;
  starts_at: string;
  ends_at: string | null;
  image_url: string | null;
  ticket_url: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
};

export type LeadType = "catering" | "tray" | "careers" | "contact";
export type LeadStatus = "new" | "read" | "archived";

export type LeadRow = {
  id: string;
  type: LeadType;
  source: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  location_slug: string | null;
  payload: Record<string, unknown>;
  resume_path: string | null;
  status: LeadStatus;
  created_at: string;
};

export type NewsletterSubscriberRow = {
  id: string;
  email: string;
  phone: string | null;
  tags: string[];
  source: string | null;
  is_active: boolean;
  created_at: string;
};
