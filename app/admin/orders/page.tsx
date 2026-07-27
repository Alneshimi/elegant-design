import { prisma } from "@/lib/prisma";
import { updateOrderStatus } from "./actions";
import {
  statusLabels,
  statusColors,
  statusOptions,
} from "./status";

export default async function OrdersPage() {
  const orders =
    await prisma.order.findMany({
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <main className="space-y-6">

      <h1 className="text-4xl font-bold">
        Orders
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Order
              </th>

              <th className="p-4 text-left">
                Customer
              </th>

              <th className="p-4 text-left">
                Product
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="p-8 text-center text-gray-500"
                >
                  No orders found.
                </td>
              </tr>
            )}

            {orders.map((order) => {

              const productName =
  order.product?.nameEn ||
  order.product?.nameAr ||
  order.productName
  "Deleted product";


              return (

                <tr
                  key={order.id}
                  className="border-t"
                >

                  <td className="p-4 font-medium">
                    {order.orderNumber}
                  </td>

                  <td className="p-4">
                    {order.customerName}
                  </td>

                  <td className="p-4">
                    {productName}
                  </td>

                  <td className="p-4">

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${statusColors[order.status]}`}
                    >
                      {statusLabels[order.status]}
                    </span>

                  </td>

                  <td className="p-4">

                    <div className="flex flex-wrap gap-2">

                      {statusOptions[
                        order.status
                      ].map((status) => (

                        <form
                          key={status}
                          action={async () => {
                            "use server";

                            await updateOrderStatus(
                              order.id,
                              status
                            );
                          }}
                        >

                          <button
                            className="rounded-lg bg-black px-3 py-2 text-white hover:bg-gray-800"
                          >
                            {statusLabels[
                              status
                            ]}
                          </button>

                        </form>

                      ))}

                    </div>

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

    </main>
  );
}