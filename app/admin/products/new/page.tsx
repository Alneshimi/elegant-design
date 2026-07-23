import { prisma } from "@/lib/prisma";
import { createProduct } from "../actions";
import VideoUploadHandler from "@/components/VideoUploadHandler";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      nameEn: "asc",
    },
  });

  return (
    <div>
      <h1 className="text-4xl font-bold">
        Add Product
      </h1>

      <form
        action={createProduct}
        id="productForm"
        className="mt-10 space-y-6 max-w-2xl"
      >
        {/* English Name */}
        <input
          name="nameEn"
          placeholder="Product Name (English)"
          className="w-full border p-4 rounded-xl"
          required
        />

        {/* Arabic Name */}
        <input
          name="nameAr"
          placeholder="اسم المنتج (العربية)"
          dir="rtl"
          className="w-full border p-4 rounded-xl"
          required
        />

        {/* Product Code */}
        <input
          name="code"
          placeholder="Product Code"
          className="w-full border p-4 rounded-xl"
          required
        />

        {/* Starting Price */}
        <input
          name="price"
          placeholder="Starting Price"
          type="number"
          step="0.001"
          className="w-full border p-4 rounded-xl"
          required
        />

        {/* English Description */}
        <textarea
          name="descriptionEn"
          placeholder="Description (English)"
          rows={6}
          className="w-full border p-4 rounded-xl"
        />

        {/* Arabic Description */}
        <textarea
          name="descriptionAr"
          placeholder="الوصف (العربية)"
          dir="rtl"
          rows={6}
          className="w-full border p-4 rounded-xl"
        />

        {/* Category */}
        <select
          name="categoryId"
          className="w-full border p-4 rounded-xl"
          required
        >
          <option value="">
            Select Category
          </option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.nameEn} / {category.nameAr}
            </option>
          ))}
        </select>

        {/* Images */}
        <div>
          <label className="block font-semibold mb-2">
            Product Images
          </label>

          <input
            name="images"
            type="file"
            multiple
            accept="image/*"
            className="w-full border p-4 rounded-xl"
          />

          <input
            type="hidden"
            name="uploadedVideos"
            id="uploadedVideos"
          />
        </div>

        {/* Videos */}
        <div>
          <label className="block font-semibold mb-2">
            Product Videos
          </label>

          <input
            id="videos"
            type="file"
            multiple
            accept="video/*"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-8 py-4 rounded-xl hover:bg-yellow-600 transition"
        >
          Save Product
        </button>
      </form>

      <VideoUploadHandler />
    </div>
  );
}