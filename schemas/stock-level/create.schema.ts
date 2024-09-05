import { RouteShorthandOptions } from "fastify";

export const stockLevelCreateOptions: RouteShorthandOptions = {
    schema: {
        body: {
            type: "object",
            required: [
                "shopId",
                "plu",
            ],
            properties: {
                shopId: {
                    type: "integer",
                    minimum: 1,
                },
                plu: {
                    type: "integer",
                    minimum: 1,
                },
                shelvesAmount: {
                    type: "integer",
                    minimum: 0,
                },
                ordersAmount: {
                    type: "integer",
                    minimum: 0,
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
        },
    },
};

export const stockLevelChangeOptions: RouteShorthandOptions = {
    schema: {
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
        },
    },
};
