/*
  Warnings:

  - Made the column `nameAr` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nameEn` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `instagram` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Category" ALTER COLUMN "nameAr" SET NOT NULL,
ALTER COLUMN "nameEn" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Order" ALTER COLUMN "instagram" SET NOT NULL;
