import { Paginator } from "../../dto/paginator";
import { StockLevel } from "../../dto/stock-level";

export type StockLevelPaginationResponseSchema = Paginator<StockLevel>;

export class StockLevelPaginationResponse {
    constructor(
        private stockLevels: Iterable<StockLevel>,
        private page: number,
        private onPage: number,
        private totalPages: number
    ) {}

    public get json(): StockLevelPaginationResponseSchema {
        return {
            items: this.stockLevels,
            page: this.page,
            onPage: this.onPage,
            totalPages: this.totalPages,
            previous: this.page > 1 ? this.page - 1 : null,
            next: this.page < this.totalPages ? this.page + 1 : null,
        };
    }
}
