import { StockLevel } from "../../dto/stock-level";

export type StockLevelCreateResponseSchema = StockLevel;

export class StockLevelCreateResponse {
    constructor(private stockLevel: StockLevel) {}

    public get json(): StockLevelCreateResponseSchema {
        return this.stockLevel;
    }
}
