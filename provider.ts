
import { asFunction, Lifetime } from "awilix";
import { diContainer } from "@fastify/awilix";
import { PrismaClient } from "@prisma/client";
import { ProductService } from "./services/product.service";
import { ProductRepository } from "./repositories/product.repository";
import { IProductService } from "./contracts/services/product.service";
import { IProductRepository } from "./contracts/repositories/product.repository";
import { IStockLevelRepository } from "./contracts/repositories/stock-level.repository";
import { StockLevelRepository } from "./repositories/stock-level.repository";
import { IStockLevelService } from "./contracts/services/stock-level.service";
import { StockLevelService } from "./services/stock-level.service";

export type Dependency =  (
    "productRepository" | 
    "productService" | 
    "stockLevelRepository" |
    "stockLevelService"
)

const containerProvider = {
    productRepository: asFunction((): IProductRepository => {
        return new ProductRepository(new PrismaClient());
    }),

    productService: asFunction(
        (): IProductService => {
            return new ProductService(resolve("productRepository") as IProductRepository);
        },
        {
            lifetime: Lifetime.SINGLETON
        }
    ),

    stockLevelRepository: asFunction((): IStockLevelRepository => {
        return new StockLevelRepository(new PrismaClient());
    }),

    stockLevelService: asFunction(
        (): IStockLevelService => {
            return new StockLevelService(resolve("stockLevelRepository") as IStockLevelRepository);
        },
        {
            lifetime: Lifetime.SINGLETON
        }
    )
}

diContainer.register(containerProvider);

export const resolve = (dependency: Dependency) => {
    return diContainer.resolve(dependency);
}
