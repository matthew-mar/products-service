import { BaseException } from "../base.exception";

export class FailedGetException extends BaseException {
    private id: number;

    constructor(id: number, internalMessage?: string) {
        super(undefined, internalMessage);
        this.id = id;
    }

    public get info(): string {
        return `failed get stock-level by id ${this.id} due to: ${this.internalMessage}`;
    }
}
