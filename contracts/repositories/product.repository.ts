import { Product } from "../../dto/product";

export interface IProductRepository {
    createByDTO(product: Product): Promise<Product>;
}
