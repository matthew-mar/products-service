import { FastifyInstance } from "fastify";
import { create } from "../controllers/stock-level/mutations";
import { stockLevelCreateOptions } from "../schemas/stock-level/create.schema";

export const router = async (app: FastifyInstance, options: any, done: any) => {
    app.post("/stock-levels", {schema: stockLevelCreateOptions.schema}, create);
    done();
}
