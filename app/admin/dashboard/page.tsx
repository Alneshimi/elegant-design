import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";

export default async function Dashboard() {
  const session =
    await getServerSession(
      authConfig
    );

  const productCount =
    await prisma.product.count();

  const orderCount =
    await prisma.order.count();

  const categoryCount =
    await prisma.category.count();

  const mediaCount =
    await prisma.productMedia.count();

  return (
    <div>

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome,
            {" "}
            {session?.user?.name}
          </p>
        </div>

        <LogoutButton />

      </div>

      <div className="grid md:grid-cols-4 gap-6 mt-10">

        <Card
          title="Products"
          value={productCount}
        />

        <Card
          title="Orders"
          value={orderCount}
        />

        <Card
          title="Categories"
          value={categoryCount}
        />

        <Card
          title="Media"
          value={mediaCount}
        />

      </div>

    </div>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-gray-500">
        {title}
      </h2>

      <p className="text-5xl font-bold mt-4">
        {value}
      </p>
    </div>
  );
}