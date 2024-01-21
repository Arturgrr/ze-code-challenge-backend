/*
  Warnings:

  - You are about to drop the column `addressId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `coverageAreaId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CoverageArea` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverageArea` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userId_fkey";

-- DropForeignKey
ALTER TABLE "CoverageArea" DROP CONSTRAINT "CoverageArea_partnerId_fkey";

-- DropIndex
DROP INDEX "User_addressId_key";

-- DropIndex
DROP INDEX "User_coverageAreaId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "addressId",
DROP COLUMN "coverageAreaId",
ADD COLUMN     "address" JSONB NOT NULL,
ADD COLUMN     "coverageArea" JSONB NOT NULL;

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "CoverageArea";
