import { Resolver } from "../../utils/resolver";
import { FastifyReply, FastifyRequest } from "fastify";
import { StockLevelFilter } from "../../dto/stock-leve-filter";
import { SotckLevelPaginateFilterSchema } from "../../requests/stock-level/paginate-filter.request";
import { StockLevelPaginationResponse, StockLevelPaginationResponseSchema } from "../../responses/stock-level/pagination.response";

export const paginate = async (
    request: FastifyRequest<SotckLevelPaginateFilterSchema>,
    reply: FastifyReply
): Promise<StockLevelPaginationResponseSchema> => {
    let page = request.query.page;
    let onPage = request.query.onPage;
    let filters: StockLevelFilter = {
        plus: request.query.plus ?? null,
        shopIds: request.query.shopIds ?? null,
        shelvesAmount: {
            from: request.query["shelvesAmount.from"],
            to: request.query["shelvesAmount.to"],
        },
        ordersAmount: {
            from: request.query["ordersAmount.from"],
            to: request.query["ordersAmount.to"],
        },
    };

    let totalCount = await Resolver.stockLevelService.countWithFilters(filters);
    let pagesCount = Math.ceil(totalCount / onPage);
    if (page > pagesCount) {
        reply.status(400).send({
            error: "failed get stock-levels",
            detail: `page ${page} can't be greater then total pages count: ${pagesCount}`,
        });
    }

    let stockLevels = await Resolver.stockLevelService.paginateWithFilters(
        page,
        onPage,
        filters
    );

    return new StockLevelPaginationResponse(
        stockLevels,
        page,
        onPage,
        pagesCount
    ).json;
}
