import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {deleteProduct,toggleProductStatus,} from "./actions";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      media: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>

      {/* Header */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-4xl font-bold">
            Products
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all products.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="bg-black text-white px-6 py-3 rounded-xl hover:bg-yellow-600 transition"
        >
          + Add Product
        </Link>

      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow mt-8 overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100 border-b">

            <tr>

              <th className="p-5 text-left">
                Product
              </th>

              <th className="p-5 text-left">
                Category
              </th>

              <th className="p-5 text-left">
                Price
              </th>

              <th className="p-5 text-left">
                Slug
              </th>

              <th className="p-5 text-left">
                Media
              </th>

              <th className="p-5 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {products.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="p-10 text-center text-gray-500"
                >
                  No products found.
                </td>

              </tr>

            ) : (

              products.map((product) => {
                const productName =
                  product.nameEn ||
                  product.nameAr ||
                  "Untitled product";
                const categoryName =
                  product.category.nameEn ||
                  product.category.nameAr ||
                  "Untitled category";

                return (

                <tr
                  key={product.id}
                  className="border-b hover:bg-gray-50"
                >

                  {/* Product Name */}
                  <td className="p-5 font-medium">
                    {productName}
                  </td>

                  {/* Category */}
                  <td className="p-5">
                    {categoryName}
                  </td>

                  {/* Price */}
                  <td className="p-5">
                    {product.startingPrice} BHD
                  </td>

                  {/* Slug */}
                  <td className="p-5 text-gray-500">
                    {product.slug}
                  </td>

                  {/* Media Count */}
                  <td className="p-5">
                    {product.media.length}
                  </td>

                  {/* Actions */}
                  <td className="p-5">

                    <div className="flex gap-4">

                      <Link
                        href={`/admin/products/${product.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>

                      <Link
                        href={`/products/${product.slug}`}
                        target="_blank" 
                        className="text-green-600 hover:underline"
                      >
                        Preview
                      </Link>
{product.media.map((item) => (
  <div key={item.id}>
    {item.type === "IMAGE" ? (
      <img
        src={item.url}
        alt={productName}
        className="rounded-xl"
      />
    ) : (
      <video
        src={item.url}
        controls
        className="rounded-xl"
      />
    )}
  </div>
))}
                    </div>
<div className="flex gap-4 items-center">

  <form
    action={toggleProductStatus.bind(
      null,
      product.id
    )}
  >
    <button
      type="submit"
      className="text-orange-600 hover:underline"
    >
      {product.isActive ? "Hide" : "Show"}
    </button>
  </form>

  <form
    action={deleteProduct.bind(
      null,
      product.id
    )}
  >
    <button
      type="submit"
      className="text-red-600 hover:underline"
    >
      Delete
    </button>
  </form>

</div>
                  </td>

                </tr>

              );
              })

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}