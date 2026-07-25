import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import {
  updateProduct,
  deleteProductMedia,
} from "../actions";
import VideoUploadHandler from "@/components/VideoUploadHandler";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({
  params,
}: Props) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      media: true,
    },
  });

  const categories = await prisma.category.findMany({
    orderBy: {
      nameEn: "asc",
    },
  });

  if (!product) {
    notFound();
  }

  const update = updateProduct.bind(null, id);

  return (
    <div>
      <h1 className="text-4xl font-bold">
        Edit Product
      </h1>

      <form
        id="productForm"
        action={update}
        className="mt-10 space-y-6 max-w-2xl"
      >
        {/* English Name */}
        <input
          name="nameEn"
          defaultValue={product.nameEn}
          placeholder="Product Name (English)"
          className="w-full border p-4 rounded-xl"
          required
        />

        {/* Arabic Name */}
        <input
          name="nameAr"
          defaultValue={product.nameAr}
          placeholder="اسم المنتج (العربية)"
          dir="rtl"
          className="w-full border p-4 rounded-xl"
          required
        />

        {/* Product Code */}
        <input
          name="code"
          defaultValue={product.code}
          placeholder="Product Code"
          className="w-full border p-4 rounded-xl"
          required
        />

        {/* Starting Price */}
        <input
          name="price"
          type="number"
          step="0.001"
          defaultValue={product.startingPrice}
          placeholder="Starting Price"
          className="w-full border p-4 rounded-xl"
          required
        />

        {/* English Description */}
        <textarea
          name="descriptionEn"
          rows={6}
          defaultValue={product.descriptionEn ?? ""}
          placeholder="Description (English)"
          className="w-full border p-4 rounded-xl"
        />

        {/* Arabic Description */}
        <textarea
          name="descriptionAr"
          rows={6}
         defaultValue={product.descriptionAr ?? ""}
          placeholder="الوصف (العربية)"
          dir="rtl"
          className="w-full border p-4 rounded-xl"
        />

        {/* Category */}
        <select
          name="categoryId"
          defaultValue={product.categoryId}
          className="w-full border p-4 rounded-xl"
        >
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.nameEn} / {category.nameAr}
            </option>
          ))}
        </select>

        {/* Upload Images */}
        <div>
          <label className="block mb-2 font-semibold">
            Upload Images
          </label>

          <input
            name="images"
            type="file"
            multiple
            accept="image/*"
            className="w-full border p-4 rounded-xl"
            form="productForm"
          />
        </div>

        {/* Upload Videos */}
        <div>
          <label className="block mb-2 font-semibold">
            Upload Videos
          </label>

          <input
            id="videos"
            type="file"
            multiple
            accept="video/*"
            className="w-full border p-4 rounded-xl"
          />
        </div>

        <input
          type="hidden"
          name="uploadedVideos"
          id="uploadedVideos"
        />

        <div>
          <h2 className="font-semibold mb-4">
            Current Media
          </h2>

          <div className="grid grid-cols-3 gap-4">
            {product.media.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl p-2 relative"
              >
                <button
                  formAction={deleteProductMedia.bind(
                    null,
                    item.id
                  )}
                  type="submit"
                  className="absolute top-2 right-2 bg-red-600 text-white w-8 h-8 rounded-full"
                >
                  ×
                </button>

                {item.type === "IMAGE" ? (
                  <img
                    src={item.url}
                    className="rounded-xl w-full h-40 object-cover"
                    alt={product.nameEn}
                  />
                ) : (
                  <video
                    src={item.url}
                    controls
                    className="rounded-xl w-full h-40 object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-black text-white px-8 py-4 rounded-xl hover:bg-yellow-600 transition"
        >
          Save Changes
        </button>
      </form>

      <VideoUploadHandler />
    </div>
  );
}