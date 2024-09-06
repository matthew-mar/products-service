export type StockLevelFilter = {
    plus?: Array<number>;
    shopIds?: Array<number>;
    shelvesAmount?: {
        from: number;
        to: number;
    };
    ordersAmount?: {
        from: number;
        to: number;
    };
}
