import { emitEvent } from "../listeners";
import { ChangeField, StockLevel } from "../dto/stock-level";
import { FailedFind } from "../exceptions/stock-level/failed-find";
import { IStockLevelService } from "../contracts/services/stock-level.service";
import { FailedGetException } from "../exceptions/stock-level/failed-get.excpetion";
import { IStockLevelRepository } from "../contracts/repositories/stock-level.repository";
import { FailedUpdateException } from "../exceptions/stock-level/failed-update.exception";
import { FailedDecreaseExcpetion } from "../exceptions/stock-level/failed-decrease.exception";

export class StockLevelService implements IStockLevelService {
    constructor(private stockLevelRep: IStockLevelRepository) {}
    
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
