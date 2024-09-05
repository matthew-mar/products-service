import { ChangeField, StockLevel } from "../../dto/stock-level";

export type ChangeResponseSchema = {
    shelvesAmount?: number;
    ordersAmount?: number;
}

export class StockLevelChangeResponse {
    constructor(private stockLevel: StockLevel, private field: ChangeField) {}

    public get json(): ChangeResponseSchema {
        return this.field == ChangeField.ordersAmount
            ? {
                ordersAmount: this.stockLevel.ordersAmount,
            } : {
                shelvesAmount: this.stockLevel.shelvesAmount,
            };
    }
}
