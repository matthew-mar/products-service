import { BaseRepository } from "./base.repository";
import { ChangeField, StockLevel } from "../dto/stock-level";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { IStockLevelRepository } from "../contracts/repositories/stock-level.repository";
import { FailedUpdateException } from "../exceptions/internal/stock-level/failed-update.exception";

export class StockLevelRepository extends BaseRepository implements IStockLevelRepository {
    public async decrementByFieldAndId(id: number, field: ChangeField): Promise<StockLevel> {
        let toFind = field == ChangeField.shelvesAmount
            ? {
                shelvesAmount: {
                    gt: 0,
                },
            } : {
                ordersAmount: {
                    gt: 0,
                },
            };

        try {
            const stockLevel = await this.prisma.stockLevel.update({
                where: {id: id, ...toFind},
                data: field == ChangeField.shelvesAmount ? {
                    shelvesAmount: {
                        decrement: 1,
                    },
                } : {
                    ordersAmount: {
                        decrement: 1,
                    },
                },
            });
            return stockLevel;
        } catch (error) {
            let internalMessage: string | undefined;
            if (error instanceof PrismaClientKnownRequestError) {
                internalMessage = error.message;
            }
            throw new FailedUpdateException(
                `failed decrease field ${field} for stock-level ${id}`,
                internalMessage
            );
        }
    }

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
