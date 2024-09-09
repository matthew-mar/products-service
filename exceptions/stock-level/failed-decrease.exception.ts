import { BaseException } from "../base.exception";
import { ChangeField } from "../../dto/stock-level";

export class FailedDecreaseExcpetion extends BaseException {
    constructor(
        private id: number, 
        private field: ChangeField,
        message?: string, 
        internalMessage?: string
    ) {
        super(message, internalMessage);
    }

    public get info(): string {
        return `failed decrease ${this.field} stock-level ${this.id}`;
    }
}
