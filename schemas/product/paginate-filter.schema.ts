import { RouteShorthandOptions } from "fastify";

export const productPaginateFilterOptions: RouteShorthandOptions = {
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
                names: {
                    type: "array",
                    items: {
                        type: "string",
                    },
                },
                plus: {
                    type: "array",
                    items: {
                        type: "integer",
                    },
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
                                plu: {
                                    type: "integer",
                                },
                                name: {
                                    type: "string",
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
            },
        },
    },
};
