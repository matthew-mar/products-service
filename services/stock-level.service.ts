import { emitEvent } from "../listeners";
import { ChangeField, StockLevel } from "../dto/stock-level";
import { IStockLevelService } from "../contracts/services/stock-level.service";
import { IStockLevelRepository } from "../contracts/repositories/stock-level.repository";

export class StockLevelService implements IStockLevelService {
    constructor(private stockLevelRep: IStockLevelRepository) {}
    
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
