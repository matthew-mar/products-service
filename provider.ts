
import { asFunction, Lifetime } from "awilix";
import { diContainer } from "@fastify/awilix";
import { PrismaClient } from "@prisma/client";
import { ProductService } from "./services/product.service";
import { ProductRepository } from "./repositories/product.repository";
import { IProductService } from "./contracts/services/product.service";
import { IProductRepository } from "./contracts/repositories/product.repository";

export type Dependency =  (
    "productRepository" | 
    "productService" | 
    "eventEmitter"
)

const containerProvider = {
    productRepository: asFunction((): IProductRepository => {
        return new ProductRepository(new PrismaClient());
    }),

    productService: asFunction(
        (): IProductService => {
            return new ProductService(resolve("productRepository") as IProductRepository)
        },
        {
            lifetime: Lifetime.SINGLETON
        }
    ),
}

diContainer.register(containerProvider);

export const resolve = (dependency: Dependency) => {
    return diContainer.resolve(dependency);
}
