/*
  Warnings:

  - A unique constraint covering the columns `[userId,dataItemId]` on the table `Download` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Download_userId_dataItemId_key" ON "Download"("userId", "dataItemId");
