"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createCategory(formData: FormData) {
  const nameEn = (formData.get("nameEn") as string)?.trim();
  const nameAr = (formData.get("nameAr") as string)?.trim();

  if (!nameEn) {
    throw new Error("English name is required.");
  }

  const existing = await prisma.category.findFirst({
    where: {
      nameEn,
    },
  });

  if (existing) {
    throw new Error("A category with this English name already exists.");
  }

  await prisma.category.create({
    data: {
      nameEn,
      nameAr,
    },
  });

  redirect("/admin/categories");
}

export async function updateCategory(
  id: string,
  formData: FormData
) {
  const nameEn = (formData.get("nameEn") as string)?.trim();
  const nameAr = (formData.get("nameAr") as string)?.trim();

  if (!nameEn) {
    throw new Error("English name is required.");
  }

  const existing = await prisma.category.findFirst({
    where: {
      nameEn,
      NOT: {
        id,
      },
    },
  });

  if (existing) {
    throw new Error("A category with this English name already exists.");
  }

  await prisma.category.update({
    where: {
      id,
    },
    data: {
      nameEn,
      nameAr,
    },
  });

  redirect("/admin/categories");
}

export async function deleteCategory(id: string) {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  });

  if (!category) {
    return;
  }

  if (category._count.products > 0) {
    throw new Error(
      "Cannot delete a category that contains products."
    );
  }

  await prisma.category.delete({
    where: {
      id,
    },
  });

  redirect("/admin/categories");
}