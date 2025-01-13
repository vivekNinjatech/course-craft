/*
  Warnings:

  - You are about to drop the column `downloadDate` on the `Download` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Download" DROP COLUMN "downloadDate",
ADD COLUMN     "lastDownloadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
