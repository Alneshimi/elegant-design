/*
  Warnings:

  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - Made the column `descriptionAr` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `descriptionEn` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nameAr` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nameEn` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "description",
DROP COLUMN "name",
ALTER COLUMN "descriptionAr" SET NOT NULL,
ALTER COLUMN "descriptionEn" SET NOT NULL,
ALTER COLUMN "nameAr" SET NOT NULL,
ALTER COLUMN "nameEn" SET NOT NULL;
