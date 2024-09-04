export type StockLevel = {
    id?: number;
    shopId: number;
    plu: number;
    shelvesAmount: number;
    ordersAmount: number;
};

export enum ChangeField {
    shelvesAmount = "shelves",
    ordersAmount = "orders",
};
