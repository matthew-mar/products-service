/*
  Warnings:

  - A unique constraint covering the columns `[plu]` on the table `StockLevel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StockLevel_plu_key" ON "StockLevel"("plu");
