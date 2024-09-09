import { Product } from "../dto/product";
import { BaseRepository } from "./base.repository";
import { ProductFilter } from "../dto/product-filter";
import { IProductRepository } from "../contracts/repositories/product.repository";

export class ProductRepository extends BaseRepository implements IProductRepository {
    public async countWithFilters(filter: ProductFilter): Promise<number> {
        return await this.prisma.product.count({
            where: this.filterQuery(filter),
        });
    }

    public async paginateWithFilters(
        skip: number,
        take: number,
        filter: ProductFilter
    ): Promise<Iterable<Product>> {
        return await this.prisma.product.findMany({
            where: this.filterQuery(filter),
            skip: skip,
            take: take,
        });
    }
    
    public async createByDTO(product: Product): Promise<Product> {
        return await this.prisma.product.create({
            data: {...product}
        });
    }

    private filterQuery(filter: ProductFilter): { [key: string]: any } {
        let includeFilters: { [key: string]: any } = {};

        if (filter.names) {
            includeFilters["name"] = {
                in: filter.names,
            };
        }
        if (filter.plus) {
            includeFilters["plu"] = {
                in: filter.plus,
            };
        }

        return includeFilters;
    }
}
