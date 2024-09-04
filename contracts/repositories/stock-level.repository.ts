import { StockLevel } from "../../dto/stock-level";

export interface IStockLevelRepository {
    createByDTO(stockLevel: StockLevel): Promise<StockLevel>;
}
