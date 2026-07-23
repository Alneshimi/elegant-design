/*
  Warnings:

  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nameEn]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Category_name_key";

-- AlterTable
ALTER TABLE "public"."Category" DROP COLUMN "name",
ADD COLUMN     "nameAr" TEXT,
ADD COLUMN     "nameEn" TEXT;

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "descriptionAr" TEXT,
ADD COLUMN     "descriptionEn" TEXT,
ADD COLUMN     "nameAr" TEXT,
ADD COLUMN     "nameEn" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Category_nameEn_key" ON "public"."Category"("nameEn");
