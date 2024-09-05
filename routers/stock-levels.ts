import { FastifyInstance } from "fastify";
import { create, decrease, increase } from "../controllers/stock-level/mutations";
import { stockLevelChangeOptions, stockLevelCreateOptions } from "../schemas/stock-level/create.schema";

export const router = async (app: FastifyInstance, options: any, done: any) => {
    app.post("/stock-levels", {schema: stockLevelCreateOptions.schema}, create);
    app.patch("/stock-levels/:id/increase", {schema: stockLevelChangeOptions.schema}, increase);
    app.patch("/stock-levels/:id/decrease", {schema: stockLevelChangeOptions.schema}, decrease);
    done();
}
