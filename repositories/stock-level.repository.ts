import { BaseRepository } from "./base.repository";
import { ChangeField, StockLevel } from "../dto/stock-level";
import { IStockLevelRepository } from "../contracts/repositories/stock-level.repository";

export class StockLevelRepository extends BaseRepository implements IStockLevelRepository {
    public async incrementByFieldAndId(id: number, field: ChangeField): Promise<StockLevel> {
        const stockLevel = await this.prisma.stockLevel.update({
            where: {id: id},
            data: field == ChangeField.shelvesAmount ? {
                shelvesAmount: {
                    increment: 1,
                },
            } : {
                ordersAmount: {
                    increment: 1,
                },
            },
        });
        return stockLevel;
    }

    public async createByDTO(stockLevel: StockLevel): Promise<StockLevel> {
        return await this.prisma.stockLevel.create({
            data: {...stockLevel},
        });
    }
}
