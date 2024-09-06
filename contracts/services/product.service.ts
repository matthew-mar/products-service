import { Product } from "../../dto/product";
import { ProductFilter } from "../../dto/product-filter";

export interface IProductService {
    createByDTO(product: Product): Promise<Product>;

    paginateWithFilters(
        page: number,
        onPage: number,
        filter: ProductFilter
    ): Promise<Iterable<Product>>;

    countWithFilters(filter: ProductFilter): Promise<number>;
}
