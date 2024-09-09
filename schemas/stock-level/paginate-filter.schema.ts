import { RouteShorthandOptions } from "fastify";

export const stockLevelPaginateFilterOptions: RouteShorthandOptions = {
    schema: {
        querystring: {
            type: "object",
            properties: {
                page: {
                    type: "integer",
                    minimum: 1,
                    default: 1,
                },
                onPage: {
                    type: "integer",
                    minimum: 1,
                    default: 3,
                    maximum: 50,
                },
                plus: {
                    type: "array",
                    items: {
                        type: "integer",
                    },
                },
                shopIds: {
                    type: "array",
                    items: {
                        type: "integer",
                    },
                },
                "ordersAmount.from": {
                    type: "integer",
                    default: 1,
                },
                "ordersAmount.to": {
                    type: "integer",
                    default: 100,
                },
                "shelvesAmount.from": {
                    type: "integer",
                    default: 1,
                },
                "shelvesAmount.to": {
                    type: "integer",
                    default: 100,
                },
            },
        },
        response: {
            200: {
                type: "object",
                properties: {
                    items: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                id: {
                                    type: "integer",
                                },
                                plu: {
                                    type: "integer",
                                },
                                shopId: {
                                    type: "integer",
                                },
                                ordersAmount: {
                                    type: "integer",
                                },
                                shelvesAmount: {
                                    type: "integer",
                                },
                            },
                        },
                    },
                    page: {
                        type: "integer",
                    },
                    totalPages: {
                        type: "integer",
                    },
                    onPage: {
                        type: "integer",
                    },
                    previous: {
                        type: "number",
                        nullable: true,
                    },
                    next: {
                        type: "number",
                        nullable: true,
                    },
                },
            }
        }
    },
}
