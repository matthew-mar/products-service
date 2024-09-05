import { StockLevel } from "../../dto/stock-level";

export type StockLevelResponseSchema = StockLevel;

export class StockLevelCreateResponse {
    constructor(private stockLevel: StockLevel) {}

    public get json(): StockLevelResponseSchema {
        return this.stockLevel;
    }
}
