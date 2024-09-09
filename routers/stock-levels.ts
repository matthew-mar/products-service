import { FastifyInstance } from "fastify";
import { paginate } from "../controllers/stock-level/details";
import { stockLevelCreateOptions } from "../schemas/stock-level/create.schema";
import { stockLevelChangeOptions } from "../schemas/stock-level/change.schema";
import { create, decrease, increase } from "../controllers/stock-level/mutations";
import { stockLevelPaginateFilterOptions } from "../schemas/stock-level/paginate-filter.schema";

export const router = async (app: FastifyInstance, options: any, done: any) => {
    app.post("/stock-levels", {schema: stockLevelCreateOptions.schema}, create);
    app.patch("/stock-levels/:id/increase", {schema: stockLevelChangeOptions.schema}, increase);
    app.patch("/stock-levels/:id/decrease", {schema: stockLevelChangeOptions.schema}, decrease);
    app.get("/stock-levels", {schema: stockLevelPaginateFilterOptions.schema}, paginate);
    done();
}
