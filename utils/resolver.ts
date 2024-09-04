import { resolve } from "../provider";
import { IProductService } from "../contracts/services/product.service";
import { IStockLevelService } from "../contracts/services/stock-level.service";
import { IProductRepository } from "../contracts/repositories/product.repository";
import { IStockLevelRepository } from "../contracts/repositories/stock-level.repository";

export class Resolver {
    public static get productRepository(): IProductRepository {
        return resolve("productRepository") as IProductRepository;
    }

    public static get productService(): IProductService {
        return resolve("productService") as IProductService;
    }

    public static get stockLevelRepository(): IStockLevelRepository {
        return resolve("stockLevelRepository") as IStockLevelRepository;
    }

    public static get stockLevelService(): IStockLevelService {
        return resolve("stockLevelService") as IStockLevelService;
    }
}
