import Link from "next/link";

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{
    order?: string;
  }>;
}) {
  const params =
    await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center px-6">

      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-lg w-full">

        <div className="text-6xl mb-6">
          ✅
        </div>

        <h1 className="text-4xl font-bold mb-4">
          Order Submitted Successfully
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your order.
          Our team will review it and
          contact you soon.
        </p>

        <div className="bg-gray-100 rounded-xl p-6 mb-8">
          <p className="text-sm text-gray-500 mb-2">
            Order Number
          </p>
<Link
  href={`/track-order/result?orderNumber=${params.order}`}
  className="inline-block border border-black px-6 py-3 rounded-lg mr-4"
>
  Track This Order
</Link>

          <p className="text-2xl font-bold">
            {params.order}
          </p>
        </div>

        <Link
          href="/products"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg"
        >
          Back to Products
        </Link>

      </div>

    </main>
  );
}