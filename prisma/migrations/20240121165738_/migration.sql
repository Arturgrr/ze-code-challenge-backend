/*
  Warnings:

  - The primary key for the `CoverageArea` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `CoverageArea` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[partnerId]` on the table `CoverageArea` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[addressId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[coverageAreaId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `partnerId` to the `CoverageArea` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverageAreaId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CoverageArea" DROP CONSTRAINT "CoverageArea_userId_fkey";

-- AlterTable
ALTER TABLE "CoverageArea" DROP CONSTRAINT "CoverageArea_pkey",
DROP COLUMN "userId",
ADD COLUMN     "partnerId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "CoverageArea_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CoverageArea_id_seq";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "addressId" TEXT NOT NULL,
ADD COLUMN     "coverageAreaId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Address_userId_key" ON "Address"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CoverageArea_partnerId_key" ON "CoverageArea"("partnerId");

-- CreateIndex
CREATE UNIQUE INDEX "User_addressId_key" ON "User"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "User_coverageAreaId_key" ON "User"("coverageAreaId");

-- AddForeignKey
ALTER TABLE "CoverageArea" ADD CONSTRAINT "CoverageArea_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
