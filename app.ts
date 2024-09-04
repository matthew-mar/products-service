import Fastify from "fastify";
import { fastifyAwilixPlugin } from '@fastify/awilix'
import { router as productsRouter } from "./routers/products";

const app = Fastify({
    logger: true
});

app.register(fastifyAwilixPlugin, { 
    disposeOnClose: true, 
    disposeOnResponse: true,
    strictBooleanEnforced: true
})

app.register(productsRouter);

export { app };
