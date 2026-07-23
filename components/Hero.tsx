"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section className="relative h-screen">
      <Image
        src="/images/hero/hero.jpg"
        fill
        priority
        alt="Elegant Design Bahrain"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
        <h1 className="mb-6 max-w-5xl text-4xl font-bold md:text-6xl lg:text-7xl">
          {t("heroTitle")}
        </h1>

        <p className="mb-8 max-w-3xl px-2 text-lg md:text-xl lg:text-2xl">
          {t("heroSubtitle")}
        </p>

        <Link
          href={`/${locale}/products`}
          className="inline-flex items-center rounded-full bg-yellow-500 px-8 py-4 text-lg font-semibold text-black transition duration-300 hover:scale-105 hover:bg-yellow-400"
        >
          {t("shopCollection")}
        </Link>

        <div className="absolute bottom-10 animate-bounce text-3xl">
          ↓
        </div>
      </div>
    </section>
  );
}