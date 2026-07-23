import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export default async function TrackOrderPage({
  params,
}: Props) {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full">

        <h1 className="text-4xl font-bold mb-6 text-center">
          {t("trackYourOrder")}
        </h1>

        <form
          action={`/${locale}/track-order/result`}
          className="space-y-6"
        >
          <div>
            <label className="block mb-2">
              {t("orderNumber")}
            </label>

            <input
              name="orderNumber"
              placeholder={t("orderNumberPlaceholder")}
              className="w-full border p-3 rounded-lg"
            />
          </div>

          <button
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            {t("trackOrder")}
          </button>
        </form>

      </div>
    </main>
  );
}