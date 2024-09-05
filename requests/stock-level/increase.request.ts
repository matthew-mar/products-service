import { FastifyRequest } from 'fastify';
import { ChangeField } from "../../dto/stock-level"

export type StockLevelChangeBody = {
    changeField: ChangeField;
}

export type ChangeSchema = {
    Body: StockLevelChangeBody;
    Params: {
        id: number;
    };
}
