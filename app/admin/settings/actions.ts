"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function changePassword(
  formData: FormData
) {
  const currentPassword =
    formData.get(
      "currentPassword"
    ) as string;

  const newPassword =
    formData.get(
      "newPassword"
    ) as string;

  const confirmPassword =
    formData.get(
      "confirmPassword"
    ) as string;

  if (
    newPassword !==
    confirmPassword
  ) {
    throw new Error(
      "Passwords do not match"
    );
  }

  const session =
    await getServerSession(
      authConfig
    );

  if (!session?.user?.email) {
    throw new Error(
      "Not authenticated"
    );
  }

  const admin =
    await prisma.adminUser.findUnique({
      where: {
        email:
          session.user.email,
      },
    });

  if (!admin) {
    throw new Error(
      "Admin not found"
    );
  }

  const valid =
    await bcrypt.compare(
      currentPassword,
      admin.password
    );

  if (!valid) {
    throw new Error(
      "Current password is incorrect"
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      newPassword,
      10
    );

  await prisma.adminUser.update({
    where: {
      id: admin.id,
    },
    data: {
      password:
        hashedPassword,
    },
  });

  redirect(
  "/admin/settings?success=password-updated"
);
}