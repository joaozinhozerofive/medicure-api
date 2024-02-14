/*
  Warnings:

  - You are about to drop the column `number` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `patients` table. All the data in the column will be lost.
  - Added the required column `residenceCode` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `residenceCode` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "number",
ADD COLUMN     "residenceCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "number",
ADD COLUMN     "residenceCode" TEXT NOT NULL;
