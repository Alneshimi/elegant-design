"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();

  const switchLocale = locale === "en" ? "ar" : "en";

  const newPath = pathname.replace(
    `/${locale}`,
    `/${switchLocale}`
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href={`/${locale}`}
          className="text-2xl font-bold"
        >
          Elegant Design
        </Link>

        <div className="flex items-center gap-6">
          <Link href={`/${locale}`}>
            {t("home")}
          </Link>

          <Link href={`/${locale}/products`}>
            {t("products")}
          </Link>

          <a
            href="https://instagram.com/elegant_design.bh"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("contact")}
          </a>

          <Link
            href={`/${locale}/track-order`}
            className="hover:text-gray-500"
          >
            {t("trackOrder")}
          </Link>

          <Link
            href={newPath}
            className="rounded-lg border px-3 py-1 font-semibold hover:bg-gray-100 transition"
          >
            {locale === "en" ? "العربية" : "English"}
          </Link>
        </div>
      </div>
    </nav>
  );
}