import { Product } from "../dto/product";
import { emitEvent } from "../listeners";
import { IProductService } from "../contracts/services/product.service";
import { IProductRepository } from "../contracts/repositories/product.repository";

export class ProductService implements IProductService {
    constructor(private rep: IProductRepository) {}

    public async createByDTO(product: Product): Promise<Product> {
        const newProduct = await this.rep.createByDTO(product);
        
        if (newProduct.plu) {
            emitEvent("product.created", {
                plu: newProduct.plu,
            });
        }

        return newProduct;        
    }
}
