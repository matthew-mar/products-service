export type StockLevelCreateBody = {
    Body: {
        shopId: number;
        plu: number;
        shelvesAmount: number;
        ordersAmount: number;
    },
};
