"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

type Category = {
  id: string;
  nameEn: string;
  nameAr: string;
  _count: {
    products: number;
  };
};

export default function FeaturedCategories({
  categories,
}: {
  categories: Category[];
}) {
  const t = useTranslations();
  const locale = useLocale();

  if (categories.length === 0) return null;

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold">{t("categories")}</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${locale}/products?category=${category.id}`}
              className="rounded-2xl border bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="mb-2 text-xl font-semibold">
                {locale === "ar" ? category.nameAr : category.nameEn}
              </h3>

              <p className="text-gray-500">
                {category._count.products} {t("products")}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}