import { BaseException } from "../base.exception";

export class FailedFind extends BaseException {
    private id: number;

    constructor(id: number, internalMessage?: string) {
        super(undefined, internalMessage);
        this.id = id;
    }

    public get info(): string {
        return `failed find stock-level by id ${this.id}`;
    }
}
