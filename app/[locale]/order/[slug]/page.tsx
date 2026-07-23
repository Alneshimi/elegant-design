import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { createOrder } from "../actions";
import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function OrderPage({
  params,
}: Props) {
  const { locale, slug } = await params;

  const t = await getTranslations();

  const product =
    await prisma.product.findUnique({
      where: {
        slug,
      },
      include: {
        media: true,
      },
    });

  if (!product) {
    notFound();
  }

  const productName =
    locale === "ar"
      ? product.nameAr || product.nameEn
      : product.nameEn || product.nameAr;

  return (
    <main className="min-h-screen bg-gray-100 pt-32 pb-20">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-4xl font-bold">
          {t("customizeOrder")}
        </h1>

        <p className="mt-2 text-gray-600">
          {productName}
        </p>

        <p className="text-yellow-600 font-bold text-xl mt-2">
          {t("startingFrom")} {product.startingPrice} BHD
        </p>

        <form
          action={createOrder}
          className="mt-10 space-y-6"
        >
          <input
            type="hidden"
            name="productId"
            value={product.id}
          />

          <input
            name="customerName"
            className="w-full border rounded-lg p-3"
            placeholder={t("fullName")}
            required
          />

          <input
            name="phone"
            className="w-full border rounded-lg p-3"
            placeholder={t("phoneNumber")}
            required
          />

          <input
            name="instagram"
            className="w-full border rounded-lg p-3"
            placeholder={t("instagram")}
          />

          <input
            name="email"
            className="w-full border rounded-lg p-3"
            placeholder={t("emailOptional")}
          />

          <input
            name="quantity"
            type="number"
            min={1}
            defaultValue={1}
            className="w-full border rounded-lg p-3"
            placeholder={t("quantity")}
          />

          <input
            name="size"
            className="w-full border rounded-lg p-3"
            placeholder={t("size")}
          />

          <input
            name="color"
            className="w-full border rounded-lg p-3"
            placeholder={t("color")}
          />

          <textarea
            name="notes"
            className="w-full border rounded-lg p-3"
            rows={5}
            placeholder={t("designDescription")}
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-xl hover:bg-yellow-600 transition"
          >
            {t("submitRequest")}
          </button>
        </form>

      </div>
    </main>
  );
}