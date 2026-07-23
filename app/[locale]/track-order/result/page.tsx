import { prisma } from "@/lib/prisma";

export default async function TrackResultPage({
  searchParams,
}: {
  searchParams: Promise<{
    orderNumber?: string;
  }>;
}) {
  const params =
    await searchParams;

  const order =
    params.orderNumber
      ? await prisma.order.findUnique({
          where: {
            orderNumber:
              params.orderNumber,
          },
          include: {
            product: true,
          },
        })
      : null;
const statusLabels = {
  PENDING: "Pending Review",
  ACCEPTED: "Accepted",
  IN_PRODUCTION: "In Production",
  READY: "Ready for Pickup",
  DELIVERED: "Delivered",
  REJECTED: "Order Rejected",
};
  const steps = [
  "PENDING",
  "ACCEPTED",
  "IN_PRODUCTION",
  "READY",
  "DELIVERED",
];

const currentStep =
  order
    ? steps.indexOf(order.status)
    : -1;

const orderProductName =
  order?.product?.nameEn ||
  order?.product?.nameAr ||
  "Unknown product";
    
return (
    <main className="min-h-screen flex items-center justify-center px-6">

      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Order Status
        </h1>

        {!order ? (
          <p className="text-center text-red-600">
            Order not found.
          </p>
        ) : (
          <div className="space-y-4">

            <div>
              <p className="text-gray-500">
                Order Number
              </p>

              <p className="font-bold">
                {order.orderNumber}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Customer
              </p>

              <p>
                {order.customerName}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Product
              </p>

              <p>
                {orderProductName}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Status
              </p>

              <p className="text-2xl font-bold">
                {
  statusLabels[
    order.status
  ]
}
              </p>
            </div>
<div className="pt-6">
  <p className="text-gray-500 mb-4">
    Progress
  </p>

  <div className="space-y-3">

    {steps.map(
      (step, index) => (
        <div
          key={step}
          className="flex items-center gap-3"
        >
          <div className="text-xl">
            {index <=
            currentStep
              ? "✅"
              : "⬜"}
          </div>

          <p>
            {
              statusLabels[
                step as keyof typeof statusLabels
              ]
            }
          </p>
        </div>
      )
    )}

  </div>
</div>
          </div>
        )}

      </div>

    </main>
  );
}