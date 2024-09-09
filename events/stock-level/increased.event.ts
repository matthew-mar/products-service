import { ChangeField } from "../../dto/stock-level";

export type StockLevelIncreasedData = {
    id: number;
    field: ChangeField;
    plu: number;
    shopId: number;
}
