-- AlterTable
ALTER TABLE "public"."ProductMedia" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "publicId" TEXT;
