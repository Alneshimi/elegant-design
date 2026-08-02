import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
  }>;
}) {

  const t = await getTranslations();

  const { category } = await searchParams;
  
const products = await prisma.product.findMany({
  where: {
    isActive: true,

    ...(category
      ? {
          categoryId: category,
        }
      : {}),
  },

  include: {
    category: true,
    media: true,
  },

  orderBy: {
    createdAt: "desc",
  },
});

  return (
    <main className="min-h-screen bg-gray-100 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-bold mb-3">
          {t("ourProducts")}
        </h1>

        <p className="text-gray-600 mb-10">
          {t("ourProductsDescription")}
        </p>

        {products.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center">
            {t("noProducts")}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}