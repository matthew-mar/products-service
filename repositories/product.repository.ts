import { Product } from "../dto/product";
import { PrismaClient } from "@prisma/client";
import { IProductRepository } from "../contracts/repositories/product.repository";

export class ProductRepository implements IProductRepository {
    constructor(private prisma: PrismaClient) {}

    public async createByDTO(product: Product): Promise<Product> {
        return await this.prisma.product.create({
            data: {...product}
        });
    }
}
