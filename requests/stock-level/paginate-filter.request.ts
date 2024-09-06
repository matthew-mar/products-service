export type SotckLevelPaginateFilterSchema = {
    Querystring: {
        page: number,
        onPage: number,
        plus: Array<number>,
        shopIds: Array<number>,
        "shelvesAmount.from": number;
        "shelvesAmount.to": number;
        "ordersAmount.from": number;
        "ordersAmount.to": number;
    },
};
