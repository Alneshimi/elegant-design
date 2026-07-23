import { prisma } from "@/lib/prisma";
import {
  createCategory,
  deleteCategory,
} from "./actions";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          Categories
        </h1>
      </div>

      {/* Create Category */}

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          New Category
        </h2>

        <form action={createCategory} className="space-y-4">
          <input
            type="text"
            name="nameEn"
            placeholder="English Name"
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="nameAr"
            placeholder="Arabic Name"
            className="w-full border rounded-lg p-3"
          />

          <button
            className="bg-black text-white px-5 py-2 rounded-lg"
          >
            Create Category
          </button>
        </form>
      </div>

      {/* Categories */}

      <div className="bg-white rounded-xl shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">
                English
              </th>

              <th className="text-left p-4">
                Arabic
              </th>

              <th className="text-center p-4">
                Products
              </th>

              <th className="text-right p-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-8 text-gray-500"
                >
                  No categories found.
                </td>
              </tr>
            )}

            {categories.map((category) => (
              <tr
                key={category.id}
                className="border-b"
              >
                <td className="p-4">
                  {category.nameEn}
                </td>

                <td className="p-4">
                  {category.nameAr || "-"}
                </td>

                <td className="text-center p-4">
                  {category._count.products}
                </td>

                <td className="p-4">
                  <div className="flex justify-end">
                    <form action={deleteCategory.bind(null, category.id)}>
  <button
    type="submit"
    className="rounded-md bg-red-50 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-100"
  >
    Delete
  </button>
</form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}