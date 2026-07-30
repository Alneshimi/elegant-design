import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function ProductPage({
  params,
}: Props) {
  const { locale, slug } = await params;

  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      category: true,
      media: true,
    },
  });

  if (!product) {
    notFound();
  }

  const t = await getTranslations();

  const productName =
    locale === "ar"
      ? product.nameAr || product.nameEn
      : product.nameEn || product.nameAr;

  const productDescription =
    locale === "ar"
      ? product.descriptionAr || product.descriptionEn
      : product.descriptionEn || product.descriptionAr;

  const categoryName =
    locale === "ar"
      ? product.category.nameAr || product.category.nameEn
      : product.category.nameEn || product.category.nameAr;

  return (
    <main className="min-h-screen bg-gray-100 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">

          <div>
            {product.media.length === 0 ? (
              <div className="bg-white rounded-xl h-[500px] flex items-center justify-center">
                <p className="text-gray-400">
                  {t("noImages")}
                </p>
              </div>
            ) : (
              product.media.map((media) => (
                <div
                  key={media.id}
                  className="mb-6"
                >
                  {media.type === "IMAGE" ? (
                    <Image
                      src={media.url}
                      alt={productName || "Product image"}
                      width={800}
                      height={600}
                      className="rounded-xl w-full h-auto"
                    />
                  ) : (
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      className="rounded-xl w-full"
                    >
                      <source
                        src={media.url}
                        type="video/mp4"
                      />

                      {t("videoNotSupported")}
                    </video>
                  )}
                </div>
              ))
            )}
          </div>

          <div>
            <p className="text-gray-500">
              {categoryName}
            </p>

            <h1 className="text-5xl font-bold mt-2">
              {productName}
            </h1>

            <p className="text-yellow-600 text-3xl mt-6 font-semibold">
              {t("startingFrom")} {product.startingPrice} BHD
            </p>

            <p className="mt-8 text-gray-700 leading-8">
              {productDescription}
            </p>

            <Link
              href={`/${locale}/order/${product.slug}`}
              className="inline-block mt-10 bg-black text-white px-10 py-4 rounded-xl hover:bg-yellow-600 transition"
            >
              {t("requestOrder")}
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}