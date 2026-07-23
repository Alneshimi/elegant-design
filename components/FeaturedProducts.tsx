import ProductCard from "./ProductCard";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";

export default async function FeaturedProducts() {
  const t = await getTranslations();

  let products = await prisma.product.findMany({
    where: {
      isFeatured: true,
      isActive: true,
    },
    include: {
      media: true,
    },
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });

  if (products.length === 0) {
    products = await prisma.product.findMany({
      where: {
        isActive: true,
      },
      include: {
        media: true,
      },
      take: 4,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold">
            {t("featuredProducts")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}