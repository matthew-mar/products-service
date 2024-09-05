import { StockLevel, ChangeField } from "../../dto/stock-level";

export interface IStockLevelService {
    createByDTO(stockLevel: StockLevel): Promise<StockLevel>;

    incrementByFieldAndId(id: number, field: ChangeField): Promise<StockLevel>;

    decrementByFieldAndId(id: number, field: ChangeField): Promise<StockLevel>;
}
