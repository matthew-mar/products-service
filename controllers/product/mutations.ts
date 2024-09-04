import { Resolver } from "../../utils/resolver";
import { FastifyRequest } from "fastify/types/request";
import { ProductCreateBody } from "../../requests/product/create.request";
import { CreateProductResponse, CreateResponseSchema } from "../../responses/product/create.response";

export const create = async (request: FastifyRequest<ProductCreateBody>): Promise<CreateResponseSchema> => {
    let newProduct = await Resolver.productService.createByDTO({
        name: request.body.name
    });
    return new CreateProductResponse(newProduct).json;
};
