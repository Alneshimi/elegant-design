"use client";

import { useTranslations } from "next-intl";

export default function WhyChooseUs() {
  const t = useTranslations();

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">
            {t("whyChooseUs")}
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border p-8 text-center shadow-sm transition hover:shadow-lg">
            <div className="mb-4 text-5xl">⭐</div>
            <h3 className="mb-3 text-2xl font-semibold">
              {t("qualityTitle")}
            </h3>
            <p className="text-gray-600">
              {t("qualityDescription")}
            </p>
          </div>

          <div className="rounded-2xl border p-8 text-center shadow-sm transition hover:shadow-lg">
            <div className="mb-4 text-5xl">🎨</div>
            <h3 className="mb-3 text-2xl font-semibold">
              {t("customTitle")}
            </h3>
            <p className="text-gray-600">
              {t("customDescription")}
            </p>
          </div>

          <div className="rounded-2xl border p-8 text-center shadow-sm transition hover:shadow-lg">
            <div className="mb-4 text-5xl">🚚</div>
            <h3 className="mb-3 text-2xl font-semibold">
              {t("deliveryTitle")}
            </h3>
            <p className="text-gray-600">
              {t("deliveryDescription")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}