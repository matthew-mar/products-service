/*
  Warnings:

  - A unique constraint covering the columns `[shopId,plu]` on the table `StockLevel` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "StockLevel_plu_key";

-- CreateIndex
CREATE UNIQUE INDEX "StockLevel_shopId_plu_key" ON "StockLevel"("shopId", "plu");
