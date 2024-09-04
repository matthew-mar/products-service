/*
  Warnings:

  - You are about to drop the `Shop` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StockLevel" DROP CONSTRAINT "StockLevel_shopId_fkey";

-- DropTable
DROP TABLE "Shop";
