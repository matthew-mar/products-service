import { Product } from "../../dto/product";

export interface IProductService {
    createByDTO(product: Product): Promise<Product>;
}
