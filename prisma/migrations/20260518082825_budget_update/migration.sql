/*
  Warnings:

  - You are about to drop the column `title` on the `Budget` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tripId]` on the table `Budget` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "title";

-- CreateIndex
CREATE UNIQUE INDEX "Budget_tripId_key" ON "Budget"("tripId");
