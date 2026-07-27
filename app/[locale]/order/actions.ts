"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { transporter } from "@/lib/mail";

export async function createOrder(
  formData: FormData
) {
  const customerName =
    formData.get(
      "customerName"
    ) as string;

  const phone =
    formData.get(
      "phone"
    ) as string;

  const instagram =
    formData.get(
      "instagram"
    ) as string;

  const email =
    formData.get(
      "email"
    ) as string;

  const notes =
    formData.get(
      "notes"
    ) as string;

  const productId =
    formData.get(
      "productId"
    ) as string;

  const size =
    formData.get(
      "size"
    ) as string;

  const color =
    formData.get(
      "color"
    ) as string;

  const quantity = Number(
    formData.get(
      "quantity"
    ) || 1
  );
const product = await prisma.product.findUnique({
  where: {
    id: productId,
  },
});

if (!product) {
  throw new Error("Product not found.");
}
 const order = await prisma.order.create({
  data: {
    orderNumber: `ED-${Date.now()}`,

    customerName,
    phone,
    instagram,
    email,
    notes,
    size,
    color,
    quantity,

    productId,

    productName: product.nameEn,
    productCode: product.code,
  },
});

try {
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: "alialneshimi3@gmail.com",
    subject: `New Order ${order.orderNumber}`,
    html: `
      <h2>New Order Received</h2>

      <p><strong>Order Number:</strong> ${order.orderNumber}</p>

      <p><strong>Customer:</strong> ${customerName}</p>

      <p><strong>Phone:</strong> ${phone}</p>

      <p><strong>Email:</strong> ${email || "-"}</p>

      <p><strong>Instagram:</strong> ${instagram || "-"}</p>

      <hr>

      <p><strong>Product:</strong> ${
        product?.nameEn ?? product?.nameAr ?? "Unknown Product"
      }</p>

      <p><strong>Size:</strong> ${size || "-"}</p>

      <p><strong>Color:</strong> ${color || "-"}</p>

      <p><strong>Quantity:</strong> ${quantity}</p>

      <p><strong>Notes:</strong></p>

      <p>${notes || "-"}</p>
    `,
  });
} catch (error) {
  console.error(error);
}

  redirect(
  `/order/success?order=${order.orderNumber}`
);
}