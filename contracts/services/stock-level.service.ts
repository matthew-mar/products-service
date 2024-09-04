import { StockLevel } from "../../dto/stock-level";

export interface IStockLevelService {
    createByDTO(stockLevel: StockLevel): Promise<StockLevel>;
}

// expo interface IStockLevelService {
//     createByDTO(stockLevel: StockLevel)
// }
