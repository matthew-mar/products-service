import { RouteShorthandOptions } from "fastify";

export const stockLevelChangeOptions: RouteShorthandOptions = {
    schema: {
        params: {
            id: {
                type: "integer",
            },
        },
        body: {
            type: "object",
            required: ["changeField"],
            properties: {
                changeField: {
                    type: "string",
                    enum: ["shelves", "orders"],
                },
            },
        },
        response: {
            200: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                    },
                    shopId: {
                        type: "integer",
                    },
                    plu: {
                        type: "integer",
                    },
                    shelvesAmount: {
                        type: "integer",
                    },
                    ordersAmount: {
                        type: "integer",
                    },
                },
            },
            404: {
                type: "object",
                properties: {
                    error: {
                        type: "string",
                    },
                    detail: {
                        type: "string",
                    },
                },
            },
        },
    },
};
