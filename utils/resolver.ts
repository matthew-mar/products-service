import { resolve } from "../provider";
import { IProductService } from "../contracts/services/product.service";
import { IProductRepository } from "../contracts/repositories/product.repository";

export class Resolver {
    public static get productRepository(): IProductRepository {
        return resolve("productRepository") as IProductRepository;
    }

    public static get productService(): IProductService {
        return resolve("productService") as IProductService;
    }
}
