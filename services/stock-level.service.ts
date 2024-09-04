import { emitEvent } from "../listeners";
import { StockLevel } from "../dto/stock-level";
import { IStockLevelService } from "../contracts/services/stock-level.service";
import { IStockLevelRepository } from "../contracts/repositories/stock-level.repository";

export class StockLevelService implements IStockLevelService {
    constructor(private stockLevelRep: IStockLevelRepository) {}
    
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
