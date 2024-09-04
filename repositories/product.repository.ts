import { Product } from "../dto/product";
import { BaseRepository } from "./base.repository";
import { IProductRepository } from "../contracts/repositories/product.repository";

export class ProductRepository extends BaseRepository implements IProductRepository {
    public async createByDTO(product: Product): Promise<Product> {
        return await this.prisma.product.create({
            data: {...product}
        });
    }
}
