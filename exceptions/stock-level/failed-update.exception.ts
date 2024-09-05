import { BaseException } from "../base.exception";

export class FailedUpdateException extends BaseException {
    public internalMessage?: string;

    constructor(message?: string, internalMessage?: string) {
        super(message);
        this.internalMessage = internalMessage;
    }

    public get info(): string {
        return this.message;
    }
}
