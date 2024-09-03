-- CreateTable
CREATE TABLE "Product" (
    "plu" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("plu")
);

-- CreateTable
CREATE TABLE "Shop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockLevel" (
    "id" SERIAL NOT NULL,
    "shopId" INTEGER NOT NULL,
    "plu" INTEGER NOT NULL,
    "shelvesAmount" INTEGER NOT NULL DEFAULT 0,
    "ordersAmount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "StockLevel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StockLevel" ADD CONSTRAINT "StockLevel_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockLevel" ADD CONSTRAINT "StockLevel_plu_fkey" FOREIGN KEY ("plu") REFERENCES "Product"("plu") ON DELETE RESTRICT ON UPDATE CASCADE;
