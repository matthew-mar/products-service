export type ProductPaginateFilterSchema = {
    Querystring: {
        page: number,
        onPage: number,
        names: Array<string>,
        plus: Array<number>,
    },
};
