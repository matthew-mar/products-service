
import dotnev from "dotenv";
import { Redis } from "ioredis";
import { asFunction, Lifetime } from "awilix";
import { diContainer } from "@fastify/awilix";
import { PrismaClient } from "@prisma/client";
import { CacheService } from "./services/cache.service";
import { ProductService } from "./services/product.service";
import { StockLevelService } from "./services/stock-level.service";
import { ICacheService } from "./contracts/services/cache.service";
import { ProductRepository } from "./repositories/product.repository";
import { IProductService } from "./contracts/services/product.service";
import { StockLevelRepository } from "./repositories/stock-level.repository";
import { IStockLevelService } from "./contracts/services/stock-level.service";
import { IProductRepository } from "./contracts/repositories/product.repository";
import { IStockLevelRepository } from "./contracts/repositories/stock-level.repository";

dotnev.config();

export type Dependency =  (
    "productRepository" | 
    "productService" | 
    "stockLevelRepository" |
    "stockLevelService" |
    "cacheService"
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
    ),

    cacheService: asFunction((): ICacheService => {
        return new CacheService(new Redis(6379, String(process.env.REDIS_HOST)));
    }, {
        lifetime: Lifetime.SINGLETON,
    }),
}

diContainer.register(containerProvider);

export const resolve = (dependency: Dependency) => {
    return diContainer.resolve(dependency);
}
