import { ChangeField, StockLevel } from "../../dto/stock-level";

export interface IStockLevelRepository {
    createByDTO(stockLevel: StockLevel): Promise<StockLevel>;

    incrementByFieldAndId(id: number, field: ChangeField): Promise<StockLevel>;

    decrementByFieldAndId(id: number, field: ChangeField): Promise<StockLevel>;

    getById(id: number): Promise<StockLevel>;
}
