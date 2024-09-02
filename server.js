import Fastify from "fastify";

const fastify = Fastify({
    logger: true
});

fastify.get("/", async (request, reply) => {
    return {
        "message": "test",
        "status": 200,
    }
});

fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`Server listening at ${address}`);
});
