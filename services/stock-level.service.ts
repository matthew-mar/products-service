import { emitEvent } from "../listeners";
import { StockLevelFilter } from "../dto/stock-leve-filter";
import { ChangeField, StockLevel } from "../dto/stock-level";
import { FailedFind } from "../exceptions/stock-level/failed-find";
import { IStockLevelService } from "../contracts/services/stock-level.service";
import { FailedGetException } from "../exceptions/stock-level/failed-get.excpetion";
import { IStockLevelRepository } from "../contracts/repositories/stock-level.repository";
import { FailedUpdateException } from "../exceptions/stock-level/failed-update.exception";
import { FailedDecreaseExcpetion } from "../exceptions/stock-level/failed-decrease.exception";
import { Resolver } from "../utils/resolver";
import { CacheMaker } from "../utils/cache/stock-level/cache-maker";

export class StockLevelService implements IStockLevelService {
    constructor(private stockLevelRep: IStockLevelRepository) {}
    
    public async countWithFilters(filter: StockLevelFilter): Promise<number> {
        let cacheKey = CacheMaker.countKey(filter);
        let cached = await Resolver.cacheService.get(cacheKey);
        if (cached) {
            return Number(cached);
        }

        let count = await this.stockLevelRep.countWithFilters(filter);
        Resolver.cacheService.save(cacheKey, cached);
        return count;
    }
    
    public async paginateWithFilters(
        page: number,
        onPage: number,
        filter: StockLevelFilter
    ): Promise<Iterable<StockLevel>> {
        let cacheKey = CacheMaker.paginateCacheKey(page, onPage, filter);
        let cached = await Resolver.cacheService.get(cacheKey);

        if (cached) {
            return JSON.parse(cached);
        }

        let stockLevels = await this.stockLevelRep.paginateWithFilters(
            (page - 1) * onPage,
            onPage,
            filter
        );
        Resolver.cacheService.save(cacheKey, JSON.stringify(stockLevels));
        return stockLevels;
    }
    
    public async getById(id: number): Promise<StockLevel> {
        try {
            return await this.stockLevelRep.getById(id);
        } catch (error) {
            console.error(error);
            let message: string | undefined;
            if (error instanceof FailedFind) {
                message = error.info;
            }
            throw new FailedGetException(id, message);
        }
    }
    
    public async decrementByFieldAndId(id: number, field: ChangeField): Promise<StockLevel> {
        try {
            let stockLevel = await this.stockLevelRep.decrementByFieldAndId(id, field);
            
            if (stockLevel.id) {
                emitEvent("stock-level.decreased", {
                    id: stockLevel.id,
                    field: field,
                });
            }
    
            return stockLevel;
        } catch (error) {
            let errorMessage: string | undefined;
            if (error instanceof FailedUpdateException) {
                errorMessage = error.message;
            }
            throw new FailedDecreaseExcpetion(id, field);
        }

    }
    
    public async incrementByFieldAndId(id: number, field: ChangeField): Promise<StockLevel> {
        let stockLevel = await this.stockLevelRep.incrementByFieldAndId(id, field);

        if (stockLevel.id) {
            emitEvent("stock-level.increased", {
                id: stockLevel.id,
                field: field,
            });
        }

        return stockLevel;
    }
    
    public async createByDTO(stockLevel: StockLevel): Promise<StockLevel> {
        let newStockLevel = await this.stockLevelRep.createByDTO(stockLevel);

        if (newStockLevel.id) {
            emitEvent("stock-level.created", {
                id: newStockLevel.id,
            });
        }

        return newStockLevel;
    }
}
