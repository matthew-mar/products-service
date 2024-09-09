import { BaseRepository } from "./base.repository";
import { StockLevelFilter } from "../dto/stock-leve-filter";
import { ChangeField, StockLevel } from "../dto/stock-level";
import { FailedFind } from "../exceptions/stock-level/failed-find";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { IStockLevelRepository } from "../contracts/repositories/stock-level.repository";
import { FailedUpdateException } from "../exceptions/stock-level/failed-update.exception";

export class StockLevelRepository extends BaseRepository implements IStockLevelRepository {
    public async countWithFilters(filter: StockLevelFilter): Promise<number> {
        return await this.prisma.stockLevel.count({
            where: this.filterQuery(filter),
        });
    }

    public async paginateWithFilters(
        skip: number,
        take: number,
        filter: StockLevelFilter
    ): Promise<Iterable<StockLevel>> {
        return await this.prisma.stockLevel.findMany({
            where: this.filterQuery(filter),
            skip: skip,
            take: take,
        });
    }

    public async getById(id: number): Promise<StockLevel> {
        try {
            return await this.prisma.stockLevel.findUniqueOrThrow({
                where: {
                    id: id,
                }
            });
        } catch (error) {
            let message: string | undefined;
            if (error instanceof PrismaClientKnownRequestError) {
                message = error.message;    
            }
            throw new FailedFind(id, message);
        }
    }

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
            if (error instanceof PrismaClientKnownRequestError) {
                console.error(error.message);
            }
            throw new FailedUpdateException(`failed decrease ${field}`);
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

    private filterQuery(filter: StockLevelFilter): { [key: string]: any } {
        let includeFilters: { [key: string]: any } = {};

        if (filter.plus) {
            includeFilters["plu"] = {
                in: filter.plus,
            };
        }
        if (filter.shopIds) {
            includeFilters["shopId"] = {
                in: filter.shopIds,
            };
        }
        if (filter.ordersAmount) {
            includeFilters["ordersAmount"] = {
                gte: filter.ordersAmount.from,
                lte: filter.ordersAmount.to,
            };
        }
        if (filter.shelvesAmount) {
            includeFilters["shelvesAmount"] = {
                gte: filter.shelvesAmount.from,
                lte: filter.shelvesAmount.to,
            };
        }

        console.error(includeFilters);

        return includeFilters;
    }
}
