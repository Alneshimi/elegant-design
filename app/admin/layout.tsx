import Link from "next/link";
import {
  getServerSession,
} from "next-auth";
import { redirect } from "next/navigation";
import { authConfig } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session =
    await getServerSession(
      authConfig
    );

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex">

      <aside className="sticky top-0 h-screen w-64 bg-black text-white p-6">

        <h1 className="text-2xl font-bold mb-10">
          Elegant Design
        </h1>

        <nav className="space-y-3">

          <Link
            href="/admin/dashboard"
            className="block"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/products"
            className="block"
          >
            Products
          </Link>

          <Link
            href="/admin/categories"
            className="block"
          >
            Categories
          </Link>

          <Link
            href="/admin/orders"
            className="block"
          >
            Orders
          </Link>

          <Link
            href="/admin/media"
            className="block"
          >
            Media
          </Link>

          <Link
            href="/admin/settings"
            className="block"
          >
            Settings
          </Link>

        </nav>

      </aside>

      <main className="flex-1 p-10">
        {children}
      </main>

    </div>
  );
}