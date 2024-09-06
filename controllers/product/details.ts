import { Resolver } from "../../utils/resolver";
import { FastifyReply, FastifyRequest } from "fastify";
import { ProductPaginateFilterSchema } from "../../requests/product/paginate-filter.request";
import { ProductPaginationResponseSchema, ProductPaginatonResponse } from "../../responses/product/pagination.response";

export const paginate = async (
    request: FastifyRequest<ProductPaginateFilterSchema>,
    reply: FastifyReply
): Promise<ProductPaginationResponseSchema> => {
    let page = request.query.page;
    let onPage = request.query.onPage;
    let filters = {
        names: request.query.names ?? null,
        plus: request.query.plus ?? null,
    }

    let totalCount = await Resolver.productService.countWithFilters(filters);
    let pagesCount = Math.ceil(totalCount / onPage);
    if (page > pagesCount) {
        reply.status(400).send({
            error: "failed get products",
            detail: `page ${page} can't be greater then total pages count: ${pagesCount}`,
        });
    }

    let products = await Resolver.productService.paginateWithFilters(
        page,
        onPage,
        filters
    );

    return new ProductPaginatonResponse(products, page, onPage, pagesCount).json;
}
