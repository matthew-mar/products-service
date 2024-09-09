import { RouteShorthandOptions } from "fastify";

export const productCreateOptions: RouteShorthandOptions = {
    schema: {
        body: {
            type: "object",
            required: ["name"],
            properties: {
                name: {
                    type: "string",
                    maxLength: 30,
                },
            },
        },
        response: {
            200: {
                type: "object",
                properties: {
                    plu: {
                        type: "integer",
                    },
                    name: {
                        type: "string",
                    },
                },
            },
        },
    }
};
