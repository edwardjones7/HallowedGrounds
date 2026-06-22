import type { Metadata } from "next";
import Link from "next/link";
import { getServerClient } from "@/lib/supabase/server";
import { signOut } from "./actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/menu", label: "Menus" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/leads", label: "Inbox" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await getServerClient();
  const {
    data: { user },
  } = supabase
    ? await supabase.auth.getUser()
    : { data: { user: null } };

  // The login page renders its own minimal shell.
  if (!user) {
    return <div className="min-h-screen bg-ink text-parchment">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-ink text-parchment">
      <aside className="flex w-56 shrink-0 flex-col border-r border-brass/15 bg-ink-soft p-6">
        <Link href="/admin" className="font-display text-xl text-brass">
          Hallowed Grounds
        </Link>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-parchment/40">
          Admin
        </p>
        <nav className="mt-10 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded px-3 py-2 text-sm text-parchment/75 transition-colors hover:bg-brass/10 hover:text-brass"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-6">
          <p className="truncate text-xs text-parchment/40">{user.email}</p>
          <form action={signOut}>
            <button className="mt-2 text-xs uppercase tracking-[0.15em] text-parchment/60 hover:text-brass">
              Sign out
            </button>
          </form>
          <Link
            href="/"
            className="mt-3 block text-xs text-parchment/40 hover:text-brass"
          >
            ← View site
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-x-hidden p-8 md:p-12">{children}</main>
    </div>
  );
}
