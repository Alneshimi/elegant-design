"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <footer className="bg-black text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-6">
          <Link href={`/${locale}`}>
            {t("home")}
          </Link>

          <Link href={`/${locale}/products`}>
            {t("products")}
          </Link>

          <Link href="/admin/dashboard">
            {t("admin")}
          </Link>
        </div>
      </div>
    </footer>
  );
}