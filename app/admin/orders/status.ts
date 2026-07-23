import { OrderStatus } from "@prisma/client";

export const statusOptions: Record<
  OrderStatus,
  OrderStatus[]
> = {
  PENDING: ["ACCEPTED", "REJECTED"],
  ACCEPTED: ["IN_PRODUCTION", "REJECTED"],
  IN_PRODUCTION: ["READY"],
  READY: ["DELIVERED"],
  DELIVERED: [],
  REJECTED: [],
};

export const statusLabels: Record<
  OrderStatus,
  string
> = {
  PENDING: "Pending",
  ACCEPTED: "Accepted",
  IN_PRODUCTION: "In Production",
  READY: "Ready",
  DELIVERED: "Delivered",
  REJECTED: "Rejected",
};

export const statusColors: Record<
  OrderStatus,
  string
> = {
  PENDING:
    "bg-gray-100 text-gray-700",
  ACCEPTED:
    "bg-green-100 text-green-700",
  IN_PRODUCTION:
    "bg-blue-100 text-blue-700",
  READY:
    "bg-yellow-100 text-yellow-800",
  DELIVERED:
    "bg-purple-100 text-purple-700",
  REJECTED:
    "bg-red-100 text-red-700",
};