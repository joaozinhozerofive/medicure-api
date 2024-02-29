/*
  Warnings:

  - You are about to drop the column `available` on the `hourly` table. All the data in the column will be lost.
  - You are about to drop the column `dateSelected` on the `hourly` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "hourly" DROP COLUMN "available",
DROP COLUMN "dateSelected";
