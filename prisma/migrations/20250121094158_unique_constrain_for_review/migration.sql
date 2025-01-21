/*
  Warnings:

  - A unique constraint covering the columns `[userId,dataItemId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_dataItemId_key" ON "Review"("userId", "dataItemId");
