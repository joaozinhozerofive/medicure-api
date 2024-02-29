/*
  Warnings:

  - Added the required column `dateSelected` to the `hourly` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hourly" ADD COLUMN     "dateSelected" TEXT NOT NULL;
