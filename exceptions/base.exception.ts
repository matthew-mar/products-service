export abstract class BaseException extends Error {
    public internalMessage?: string;

    constructor(message?: string, internalMessage?: string) {
        super(message);
        this.internalMessage = internalMessage;
    }

    public abstract get info(): string;
}

