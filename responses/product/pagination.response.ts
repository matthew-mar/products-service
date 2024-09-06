import { Product } from "../../dto/product";
import { Paginator } from "../../dto/paginator";

export type ProductPaginationResponseSchema = Paginator<Product>;

export class ProductPaginatonResponse {
    constructor(
        private products: Iterable<Product>,
        private page: number,
        private onPage: number,
        private totalPages: number
    ) {}

    public get json(): ProductPaginationResponseSchema {
        return {
            items: this.products,
            page: this.page,
            onPage: this.onPage,
            totalPages: this.totalPages,
            previous: this.page > 1 ? this.page - 1 : null,
            next: this.page < this.totalPages ? this.page + 1 : null,
        };
    }
}
