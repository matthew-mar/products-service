import { FastifyRequest } from "fastify"
import { Resolver } from "../../utils/resolver"
import { StockLevelCreateBody } from "../../requests/stock-level/create.request"
import { StockLevelCreateResponse, StockLevelCreateResponseSchema } from "../../responses/stock-level/create.response"

export const create = async (request: FastifyRequest<StockLevelCreateBody>): Promise<StockLevelCreateResponseSchema> => {
    let newStockLevel = await Resolver.stockLevelService.createByDTO({
        shopId: request.body.shopId,
        plu: request.body.plu,
        shelvesAmount: request.body.shelvesAmount,
        ordersAmount: request.body.ordersAmount,
    });
    return new StockLevelCreateResponse(newStockLevel).json;
}
