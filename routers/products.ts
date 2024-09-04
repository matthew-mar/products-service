import { FastifyInstance, FastifySchema } from "fastify";
import { create } from "../controllers/product/mutations";
import { productCreateOptions } from "../schemas/product/create.schema";

export const router = async (app: FastifyInstance, options: any, done: any) => {
    app.post("/products", {schema: productCreateOptions.schema}, create);
    done();
}
