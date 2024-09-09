import { Product } from "../../dto/product";
import { ProductFilter } from "../../dto/product-filter";

export interface IProductRepository {
    createByDTO(product: Product): Promise<Product>;

    paginateWithFilters(
        skip: number, 
        take: number,
        filter: ProductFilter
    ): Promise<Iterable<Product>>;

    countWithFilters(filter: ProductFilter): Promise<number>;
}
