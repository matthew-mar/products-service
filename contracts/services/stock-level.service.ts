import { StockLevelFilter } from "../../dto/stock-leve-filter";
import { StockLevel, ChangeField } from "../../dto/stock-level";

export interface IStockLevelService {
    createByDTO(stockLevel: StockLevel): Promise<StockLevel>;

    incrementByFieldAndId(id: number, field: ChangeField): Promise<StockLevel>;

    decrementByFieldAndId(id: number, field: ChangeField): Promise<StockLevel>;

    getById(id: number): Promise<StockLevel>;

    paginateWithFilters(
        page: number,
        onPage: number,
        filter: StockLevelFilter
    ): Promise<Iterable<StockLevel>>;

    countWithFilters(filter: StockLevelFilter): Promise<number>;
}
