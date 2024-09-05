import { Resolver } from "../../utils/resolver"
import { FastifyReply, FastifyRequest } from "fastify"
import { StockLevelCreateBody } from "../../requests/stock-level/create.request"
import { ChangeSchema, StockLevelChangeBody } from "../../requests/stock-level/increase.request"
import { FailedDecreaseExcpetion } from "../../exceptions/internal/stock-level/failed-decrease.exception"
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

export const increase = async (request: FastifyRequest<{
    Body: StockLevelChangeBody,
    Params: {
        id: number;
    }
}>): Promise<StockLevelCreateResponseSchema> => {
    const { id } = request.params;
    let updated = await Resolver.stockLevelService.incrementByFieldAndId(Number(id), request.body.changeField);
    return new StockLevelCreateResponse(updated).json;
}

export const decrease = async (request: FastifyRequest<ChangeSchema>, reply: FastifyReply): Promise<StockLevelCreateResponseSchema | void> => {
    const { id } = request.params;
    try {
        let updated = await Resolver.stockLevelService.decrementByFieldAndId(
            Number(id),
            request.body.changeField
        );
        return new StockLevelCreateResponse(updated).json;
    } catch (error) {
        if (error instanceof FailedDecreaseExcpetion) {
            console.error(error.message);
            reply.status(400).send({
                "error": error.message,
            });
        }
    }
}
