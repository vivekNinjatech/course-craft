/*
  Warnings:

  - You are about to drop the column `userId` on the `Payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "DataCategory_description_key";

-- AlterTable
ALTER TABLE "Download" ALTER COLUMN "downloadDate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "downloadCount" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderId" TEXT NOT NULL,
ALTER COLUMN "orderDate" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "userId",
ALTER COLUMN "paymentDate" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderId_key" ON "Order"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_orderId_key" ON "Payment"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "DataItem" ADD CONSTRAINT "DataItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "DataCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_dataItemId_fkey" FOREIGN KEY ("dataItemId") REFERENCES "DataItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_dataItemId_fkey" FOREIGN KEY ("dataItemId") REFERENCES "DataItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Download" ADD CONSTRAINT "Download_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Download" ADD CONSTRAINT "Download_dataItemId_fkey" FOREIGN KEY ("dataItemId") REFERENCES "DataItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
