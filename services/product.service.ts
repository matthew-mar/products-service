import { Product } from "../dto/product";
import { emitEvent } from "../listeners";
import { ProductFilter } from "../dto/product-filter";
import { IProductService } from "../contracts/services/product.service";
import { IProductRepository } from "../contracts/repositories/product.repository";

export class ProductService implements IProductService {
    constructor(private rep: IProductRepository) {}
    
    public async countWithFilters(filter: ProductFilter): Promise<number> {  // TODO: cache
        return await this.rep.countWithFilters(filter);
    }
    
    public async paginateWithFilters(  // TODO: cache
        page: number,
        onPage: number,
        filter: ProductFilter
    ): Promise<Iterable<Product>> {
        return await this.rep.paginateWithFilters(
            (page - 1) * onPage,
            onPage,
            filter
        );
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
