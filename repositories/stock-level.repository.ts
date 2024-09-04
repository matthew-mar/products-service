import { StockLevel } from "../dto/stock-level";
import { BaseRepository } from "./base.repository";
import { IStockLevelRepository } from "../contracts/repositories/stock-level.repository";

export class StockLevelRepository extends BaseRepository implements IStockLevelRepository {
    public async createByDTO(stockLevel: StockLevel): Promise<StockLevel> {
        return await this.prisma.stockLevel.create({
            data: {...stockLevel},
        });
    }
    
}
