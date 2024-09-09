import { Product } from "../dto/product";
import { emitEvent } from "../listeners";
import { Resolver } from "../utils/resolver";
import { ProductFilter } from "../dto/product-filter";
import { CacheMaker } from "../utils/cache/product/cache-maker";
import { IProductService } from "../contracts/services/product.service";
import { IProductRepository } from "../contracts/repositories/product.repository";

export class ProductService implements IProductService {
    constructor(private rep: IProductRepository) {}
    
    public async countWithFilters(filter: ProductFilter): Promise<number> {
        let cacheKey = CacheMaker.countKey(filter);
        let cached = await Resolver.cacheService.get(cacheKey);
        if (cached) {
            return Number(cached);
        }

        let count = await this.rep.countWithFilters(filter);
        Resolver.cacheService.save(cacheKey, count);
        return count;
    }
    
    public async paginateWithFilters(
        page: number,
        onPage: number,
        filter: ProductFilter
    ): Promise<Iterable<Product>> {
        let cacheKey = CacheMaker.paginateCacheKey(page, onPage, filter);
        let cached = await Resolver.cacheService.get(cacheKey)
        if (cached) {
            return JSON.parse(cached);
        }

        let products = await this.rep.paginateWithFilters(
            (page - 1) * onPage,
            onPage,
            filter
        );
        Resolver.cacheService.save(cacheKey, JSON.stringify(products));
        return products;
    }

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
