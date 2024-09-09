import { StockLevelFilter } from "../../dto/stock-leve-filter";
import { ChangeField, StockLevel } from "../../dto/stock-level";

export interface IStockLevelRepository {
    createByDTO(stockLevel: StockLevel): Promise<StockLevel>;

    incrementByFieldAndId(id: number, field: ChangeField): Promise<StockLevel>;

    decrementByFieldAndId(id: number, field: ChangeField): Promise<StockLevel>;

    getById(id: number): Promise<StockLevel>;

    paginateWithFilters(
        skip: number,
        take: number,
        filter: StockLevelFilter
    ): Promise<Iterable<StockLevel>>;

    countWithFilters(filter: StockLevelFilter): Promise<number>;
}
