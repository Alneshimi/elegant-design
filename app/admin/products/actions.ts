"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import cloudinary from "@/lib/cloudinary";
import streamifier from "streamifier";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export async function deleteProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      media: true,
    },
  });

  if (!product) return;

  for (const media of product.media) {
    if (!media.publicId) continue;

    try {
      await cloudinary.uploader.destroy(media.publicId, {
        resource_type:
          media.type === "VIDEO"
            ? "video"
            : "image",
      });
    } catch (error) {
      console.error(error);
    }
  }

 // Remove the product reference from orders
await prisma.order.updateMany({
  where: {
    productId: id,
  },
  data: {
    productId: undefined,
  },
});

// Delete the product
await prisma.product.delete({
  where: {
    id,
  },
});
  redirect("/admin/products");
}
export async function toggleProductStatus(id: string) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) return;

  await prisma.product.update({
    where: {
      id,
    },
    data: {
      isActive: !product.isActive,
    },
  });

  redirect("/admin/products");
}

export async function deleteProductMedia(
  mediaId: string
) {
  const media =
    await prisma.productMedia.findUnique({
      where: {
        id: mediaId,
      },
    });

  if (!media) return;

  if (media.publicId) {
    await cloudinary.uploader.destroy(
      media.publicId,
      {
        resource_type:
          media.type === "VIDEO"
            ? "video"
            : "image",
      }
    );
  }

  await prisma.productMedia.delete({
    where: {
      id: mediaId,
    },
  });
}

async function uploadToCloudinary(
  file: File
) {
  const bytes =
    await file.arrayBuffer();

  const buffer =
    Buffer.from(bytes);

  return new Promise<{
    secure_url: string;
    public_id: string;
  }>((resolve, reject) => {
    const stream =
      cloudinary.uploader.upload_stream(
        {
          folder:
            "elegant-design/products",
        },
        (error, result) => {
          if (error || !result)
            return reject(error);

          resolve({
            secure_url:
              result.secure_url,
            public_id:
              result.public_id,
          });
        }
      );

    streamifier
      .createReadStream(buffer)
      .pipe(stream);
  });
}

export async function createProduct(
  formData: FormData
) {
  const nameEn =
    formData.get("nameEn") as string;

  const nameAr =
    formData.get("nameAr") as string;

  const code =
    formData.get("code") as string;

  const price = Number(
    formData.get("price")
  );

  const descriptionEn =
    formData.get(
      "descriptionEn"
    ) as string;

  const descriptionAr =
    formData.get(
      "descriptionAr"
    ) as string;

  const categoryId =
    formData.get(
      "categoryId"
    ) as string;

  const images =
    formData.getAll(
      "images"
    ) as File[];

  const uploadedVideos =
    JSON.parse(
      (formData.get(
        "uploadedVideos"
      ) as string) || "[]"
    );

  const baseSlug =
    slugify(nameEn);

  const existingProduct =
    await prisma.product.findFirst({
      where: {
        slug: baseSlug,
      },
    });

  const slug =
    existingProduct
      ? `${baseSlug}-${Date.now()}`
      : baseSlug;

const product = await prisma.product.create({
  data: {
    nameEn,
    nameAr,
    code,
    slug,
    descriptionEn,
    descriptionAr,
    startingPrice: price,
    categoryId,
  },
});
  for (const image of images) {
    if (!image.size) continue;

    const uploaded =
      await uploadToCloudinary(
        image
      );

    await prisma.productMedia.create({
      data: {
        type: "IMAGE",
        url:
          uploaded.secure_url,
        publicId:
          uploaded.public_id,
        productId: product.id,
      },
    });
  }

  for (const video of uploadedVideos) {
    await prisma.productMedia.create({
      data: {
        type: "VIDEO",
        url: video.url,
        publicId:
          video.publicId,
        productId: product.id,
      },
    });
  }

  redirect("/admin/products");
}
export async function updateProduct(
  id: string,
  formData: FormData
) {
  const uploadedVideos = JSON.parse(
    (formData.get("uploadedVideos") as string) || "[]"
  );

  const images = formData.getAll(
    "images"
  ) as File[];

  const nameEn =
    formData.get("nameEn") as string;

  const nameAr =
    formData.get("nameAr") as string;

  const code =
    formData.get("code") as string;

  const price = Number(
    formData.get("price")
  );

  const descriptionEn =
    formData.get(
      "descriptionEn"
    ) as string;

  const descriptionAr =
    formData.get(
      "descriptionAr"
    ) as string;

  const categoryId =
    formData.get(
      "categoryId"
    ) as string;

  const baseSlug =
    slugify(nameEn);

  const existingProduct =
    await prisma.product.findFirst({
      where: {
        slug: baseSlug,
        NOT: {
          id,
        },
      },
    });

  const slug =
    existingProduct
      ? `${baseSlug}-${Date.now()}`
      : baseSlug;

  await prisma.product.update({
  where: {
    id,
  },
  data: {
    nameEn,
    nameAr,
    code,
    slug,
    descriptionEn,
    descriptionAr,
    startingPrice: price,
    categoryId,
  },
});

  // Upload new images
  for (const image of images) {
    if (!image.size) continue;

    const uploaded =
      await uploadToCloudinary(
        image
      );

    await prisma.productMedia.create({
      data: {
        type: "IMAGE",
        url:
          uploaded.secure_url,
        publicId:
          uploaded.public_id,
        productId: id,
      },
    });
  }

  // Upload new videos
  for (const video of uploadedVideos) {
    await prisma.productMedia.create({
      data: {
        type: "VIDEO",
        url: video.url,
        publicId:
          video.publicId,
        productId: id,
      },
    });
  }

  redirect("/admin/products");
}