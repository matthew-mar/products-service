export class FailedUpdateException extends Error {
    public internalMessage?: string;

    constructor(message?: string, internalMessage?: string) {
        super(message);
        this.internalMessage = internalMessage;
    }
}
