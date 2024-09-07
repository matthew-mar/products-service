import * as crypto from 'crypto';
import { ProductFilter } from '../../../dto/product-filter';
import { StockLevelFilter } from '../../../dto/stock-leve-filter';

export class CacheMaker {
    public static paginateCacheKey(
        page: number,
        onPage: number,
        filter: StockLevelFilter
    ): string {
        let cacheString = `page:${page};onPage:${onPage};filters:${JSON.stringify(filter)}`;
        return CacheMaker.md5(cacheString);
    }

    public static countKey(filter: StockLevelFilter): string {
        let cacheString = `filters:${JSON.stringify(filter)}`;
        return CacheMaker.md5(cacheString);
    }

    private static md5(key: string): string {
        return crypto.createHash("md5").update(key).digest("hex");
    }
}
