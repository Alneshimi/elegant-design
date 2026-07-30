"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

interface ProductMedia {
  type?: string;
  url?: string;
}

interface ProductCardProduct {
  code?: string;
  media?: ProductMedia[];
  nameAr?: string | null;
  nameEn?: string | null;
  slug?: string;
  startingPrice?: number | string;
}

interface ProductCardProps {
  product: ProductCardProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations();
  const locale = useLocale();

  const image = product.media?.find((media) => media.type === "IMAGE");

  const productName =
    locale === "ar"
      ? product.nameAr || product.nameEn || "Untitled product"
      : product.nameEn || product.nameAr || "Untitled product";

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
      <Image
        src={image?.url || "/images/products/product1.jpg"}
        alt={productName}
        width={500}
        height={500}
        className="w-full h-72 object-cover"
      />

      <div className="p-5">
        <p className="text-sm text-gray-500">{product.code}</p>

        <h2 className="text-xl font-semibold mt-2">{productName}</h2>

        <p className="text-yellow-600 font-bold text-lg mt-3">
          {t("startingFrom")} {product.startingPrice} BHD
        </p>

        <Link href={`/${locale}/products/${product.slug}`}>
          <button className="mt-5 w-full bg-black text-white py-3 rounded-lg hover:bg-yellow-600 transition">
            {t("viewDetails")}
          </button>
        </Link>
      </div>
    </div>
  );
}