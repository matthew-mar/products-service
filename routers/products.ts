import { FastifyInstance } from "fastify";
import { create } from "../controllers/product/mutations";
import { paginate } from "../controllers/product/details";
import { productCreateOptions } from "../schemas/product/create.schema";
import { productPaginateFilterOptions } from "../schemas/product/paginate-filter.schema";

export const router = async (app: FastifyInstance, options: any, done: any) => {
    app.post("/products", {schema: productCreateOptions.schema}, create);
    app.get("/products", {schema: productPaginateFilterOptions.schema}, paginate);
    done();
}
