import Fastify from "fastify";
import { fastifyAwilixPlugin } from '@fastify/awilix'
import { router as productsRouter } from "./routers/products";
import { router as stockLevelRouter } from "./routers/stock-levels";

const app = Fastify({
    logger: true
});

app.register(fastifyAwilixPlugin, { 
    disposeOnClose: true, 
    disposeOnResponse: true,
    strictBooleanEnforced: true
})
app.register(productsRouter);
app.register(stockLevelRouter);

export { app };
