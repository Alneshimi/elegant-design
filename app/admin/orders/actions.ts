"use server";

import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
  PENDING: ["ACCEPTED", "REJECTED"],
  ACCEPTED: ["IN_PRODUCTION", "REJECTED"],
  IN_PRODUCTION: ["READY"],
  READY: ["DELIVERED"],
  DELIVERED: [],
  REJECTED: [],
};

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
) {
  const order = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  if (!order) {
    throw new Error("Order not found.");
  }

  if (order.status === status) {
    return;
  }

  if (
    !allowedTransitions[order.status].includes(status)
  ) {
    throw new Error("Invalid status transition.");
  }

  await prisma.order.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });

  revalidatePath("/admin/orders");
}