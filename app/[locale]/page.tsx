import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyChooseUs from "@/components/WhyChooseUs";
import { prisma } from "@/lib/prisma";

export default async function HomePage({
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
}) {
  await params;

  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
    orderBy: {
      nameEn: "asc",
    },
  });

  return (
    <main>
      <Hero />
      <FeaturedCategories categories={categories} />
      <FeaturedProducts />
      <WhyChooseUs />
    </main>
  );
}