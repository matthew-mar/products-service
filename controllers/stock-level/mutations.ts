import { Resolver } from "../../utils/resolver"
import { FastifyReply, FastifyRequest } from "fastify"
import { ChangeSchema } from "../../requests/stock-level/increase.request"
import { StockLevelCreateBody } from "../../requests/stock-level/create.request"
import { FailedGetException } from "../../exceptions/stock-level/failed-get.excpetion"
import { FailedDecreaseExcpetion } from "../../exceptions/stock-level/failed-decrease.exception"
import { ChangeResponseSchema, StockLevelChangeResponse } from "../../responses/stock-level/change.response"
import { StockLevelCreateResponse, StockLevelResponseSchema } from "../../responses/stock-level/create.response"

export const create = async (request: FastifyRequest<StockLevelCreateBody>): Promise<StockLevelResponseSchema> => {
    let newStockLevel = await Resolver.stockLevelService.createByDTO({
        shopId: request.body.shopId,
        plu: request.body.plu,
        shelvesAmount: request.body.shelvesAmount,
        ordersAmount: request.body.ordersAmount,
    });
    return new StockLevelCreateResponse(newStockLevel).json;
}

export const increase = async (
    request: FastifyRequest<ChangeSchema>,
    reply: FastifyReply
): Promise<ChangeResponseSchema> => {
    let id = request.params.id;
    checkExistance(id, reply);
    let updated = await Resolver.stockLevelService.incrementByFieldAndId(
        id,
        request.body.changeField
    );    
    return new StockLevelChangeResponse(updated, request.body.changeField).json;
}

export const decrease = async (
    request: FastifyRequest<ChangeSchema>,
    reply: FastifyReply
): Promise<ChangeResponseSchema | void> => {
    let id = request.params.id;
    checkExistance(id, reply);

    try {
        let updated = await Resolver.stockLevelService.decrementByFieldAndId(
            id,
            request.body.changeField
        );
        return new StockLevelChangeResponse(updated, request.body.changeField).json;
    } catch (error) {
        if (error instanceof FailedDecreaseExcpetion) {
            console.error(error.message);
            reply.status(400).send({
                error: "failed decrease stock-level",
                detai: error.info,
            });
        }
    }
}

const checkExistance = async (id: number, reply: FastifyReply): Promise<void> => {
    try {
        let _ = await Resolver.stockLevelService.getById(id);
    } catch (error) {
        console.error(error);
        if (error instanceof FailedGetException) {
            reply.status(404).send({
                error: "stock-level not found",
                detail: error.info,
            });
        }
    }
}
